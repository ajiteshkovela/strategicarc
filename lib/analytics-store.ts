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
  const url = process.env.UPSTASH_REDIS_REST_URL
  const token = process.env.UPSTASH_REDIS_REST_TOKEN
  if (!url || !token) return null
  return { url, token }
}

async function redisFetch(command: (string | number)[]) {
  const redis = getRedis()
  if (!redis) return null
  const res = await fetch(`${redis.url}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${redis.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(command),
  })
  if (!res.ok) return null
  const data = (await res.json()) as { result: unknown }
  return data.result
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
