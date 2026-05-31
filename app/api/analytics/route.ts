import { NextResponse } from "next/server"
import type { AnalyticsEventType } from "@/lib/analytics-types"
import { isAnalyticsConfigured, recordAnalyticsEvent } from "@/lib/analytics-store"

const ALLOWED: AnalyticsEventType[] = [
  "pageview",
  "section_view",
  "cta_click",
  "contact_modal_open",
  "email_click",
  "phone_click",
  "social_click",
  "nav_click",
]

export async function POST(request: Request) {
  if (!isAnalyticsConfigured()) {
    return NextResponse.json({ ok: false, reason: "analytics_not_configured" }, { status: 503 })
  }

  try {
    const body = (await request.json()) as {
      type?: string
      path?: string
      label?: string
      sessionId?: string
    }

    if (!body.type || !ALLOWED.includes(body.type as AnalyticsEventType)) {
      return NextResponse.json({ ok: false, reason: "invalid_type" }, { status: 400 })
    }

    if (!body.sessionId || typeof body.sessionId !== "string") {
      return NextResponse.json({ ok: false, reason: "invalid_session" }, { status: 400 })
    }

    await recordAnalyticsEvent({
      type: body.type as AnalyticsEventType,
      path: body.path ?? "/",
      label: body.label,
      sessionId: body.sessionId,
    })

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ ok: false, reason: "server_error" }, { status: 500 })
  }
}
