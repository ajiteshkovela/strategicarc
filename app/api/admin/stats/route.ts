import { NextResponse } from "next/server"
import { getAnalyticsStats } from "@/lib/analytics-store"
import { isAdminConfigured, verifyRequestSession } from "@/lib/admin-auth"

export async function GET(request: Request) {
  if (!isAdminConfigured()) {
    return NextResponse.json(
      { error: "not_configured", message: "ADMIN_PASSWORD is not set on the server." },
      { status: 503 }
    )
  }

  if (!verifyRequestSession(request)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 })
  }

  const stats = await getAnalyticsStats()
  return NextResponse.json(stats)
}
