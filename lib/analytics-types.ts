export type AnalyticsEventType =
  | "pageview"
  | "section_view"
  | "cta_click"
  | "contact_modal_open"
  | "email_click"
  | "phone_click"
  | "social_click"
  | "nav_click"

export type AnalyticsEvent = {
  id: string
  type: AnalyticsEventType
  path: string
  label?: string
  sessionId: string
  timestamp: number
}

export type AnalyticsStats = {
  configured: boolean
  storage: "redis" | "file" | "none"
  totalEvents: number
  pageviews: number
  uniqueSessions: number
  engagements: number
  byType: Record<string, number>
  byDay: { date: string; pageviews: number; engagements: number }[]
  recent: AnalyticsEvent[]
  diagnostics?: {
    redisUrl: string
    redisToken: string
  }
}
