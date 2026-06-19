import { mkdir, readFile, writeFile } from "fs/promises"
import path from "path"
import type { AnalyticsEvent, AnalyticsStats } from "./analytics-types"

const DATA_DIR = path.join(process.cwd(), "data")
const DATA_FILE = path.join(DATA_DIR, "analytics-events.json")
const MAX_EVENTS = 5000

async function readFileEvents(): Promise<AnalyticsEvent[]> {
  try {
    const raw = await readFile(DATA_FILE, "utf-8")
    return JSON.parse(raw) as AnalyticsEvent[]
  } catch {
    return []
  }
}

async function writeFileEvents(events: AnalyticsEvent[]) {
  await mkdir(DATA_DIR, { recursive: true })
  await writeFile(DATA_FILE, JSON.stringify(events.slice(-MAX_EVENTS), null, 2), "utf-8")
}

function getRedis() {
  let url = process.env.UPSTASH_REDIS_REST_URL?.trim()
  let token = process.env.UPSTASH_REDIS_REST_TOKEN?.trim()
  if (!url || !token) return null

  // Strip quotes if they were added in the env settings
  if (url.startsWith('"') && url.endsWith('"')) url = url.slice(1, -1)
  if (token.startsWith('"') && token.endsWith('"')) token = token.slice(1, -1)
  if (url.startsWith("'") && url.endsWith("'")) url = url.slice(1, -1)
  if (token.startsWith("'") && token.endsWith("'")) token = token.slice(1, -1)

  return { url, token }
}

async function redisFetch(command: (string | number)[]) {
  const redis = getRedis()
  if (!redis) return null
  
  try {
    const res = await fetch(redis.url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${redis.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(command),
    })

    if (!res.ok) {
      const errorText = await res.text()
      console.error(`[analytics-store] Upstash Redis request failed with status ${res.status}: ${errorText}`)
      return null
    }

    const data = (await res.json()) as { result: unknown; error?: string }
    if (data.error) {
      console.error(`[analytics-store] Upstash Redis returned error: ${data.error}`)
      return null
    }
    return data.result
  } catch (err: any) {
    console.error("[analytics-store] Upstash Redis connection error:", err?.message || err)
    return null
  }
}

export function isAnalyticsConfigured() {
  return Boolean(getRedis()) || process.env.NODE_ENV === "development"
}

export async function recordAnalyticsEvent(
  event: Omit<AnalyticsEvent, "id" | "timestamp">
): Promise<void> {
  const full: AnalyticsEvent = {
    ...event,
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    timestamp: Date.now(),
  }

  const redis = getRedis()
  if (redis) {
    await redisFetch(["LPUSH", "sa:events", JSON.stringify(full)])
    await redisFetch(["LTRIM", "sa:events", 0, MAX_EVENTS - 1])
    const day = new Date().toISOString().slice(0, 10)
    await redisFetch(["HINCRBY", `sa:day:${day}`, full.type, 1])
    await redisFetch(["PFADD", `sa:sessions:${day}`, full.sessionId])
    return
  }

  if (process.env.NODE_ENV === "development") {
    const events = await readFileEvents()
    events.push(full)
    await writeFileEvents(events)
  }
}

function aggregateStats(events: AnalyticsEvent[]): AnalyticsStats {
  const pageviews = events.filter((e) => e.type === "pageview").length
  const sessions = new Set(events.map((e) => e.sessionId))
  const engagementTypes = new Set<AnalyticsEvent["type"]>([
    "cta_click",
    "contact_modal_open",
    "email_click",
    "phone_click",
    "social_click",
    "nav_click",
  ])
  const engagements = events.filter((e) => engagementTypes.has(e.type)).length

  const byType: Record<string, number> = {}
  for (const e of events) {
    byType[e.type] = (byType[e.type] ?? 0) + 1
  }

  const dayMap = new Map<string, { pageviews: number; engagements: number }>()
  for (const e of events) {
    const date = new Date(e.timestamp).toISOString().slice(0, 10)
    const row = dayMap.get(date) ?? { pageviews: 0, engagements: 0 }
    if (e.type === "pageview") row.pageviews++
    if (engagementTypes.has(e.type)) row.engagements++
    dayMap.set(date, row)
  }

  const byDay = [...dayMap.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .slice(-14)
    .map(([date, v]) => ({ date, ...v }))

  return {
    configured: isAnalyticsConfigured(),
    storage: getRedis() ? "redis" : events.length ? "file" : "none",
    totalEvents: events.length,
    pageviews,
    uniqueSessions: sessions.size,
    engagements,
    byType,
    byDay,
    recent: [...events].reverse().slice(0, 40),
  }
}

export async function getAnalyticsStats(): Promise<AnalyticsStats> {
  const redis = getRedis()
  if (redis) {
    const raw = await redisFetch(["LRANGE", "sa:events", 0, MAX_EVENTS - 1])
    const events: AnalyticsEvent[] = []
    if (Array.isArray(raw)) {
      for (const item of raw) {
        if (typeof item === "string") {
          try {
            events.push(JSON.parse(item) as AnalyticsEvent)
          } catch {
            /* skip */
          }
        }
      }
    }
    return aggregateStats(events)
  }

  if (process.env.NODE_ENV === "development") {
    const events = await readFileEvents()
    return aggregateStats(events)
  }

  return {
    configured: false,
    storage: "none",
    totalEvents: 0,
    pageviews: 0,
    uniqueSessions: 0,
    engagements: 0,
    byType: {},
    byDay: [],
    recent: [],
  }
}
