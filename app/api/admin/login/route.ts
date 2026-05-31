import { NextResponse } from "next/server"
import {
  ADMIN_SESSION_COOKIE,
  createSessionToken,
  getAdminPassword,
  isAdminConfigured,
} from "@/lib/admin-auth"

export async function GET() {
  return NextResponse.json({
    configured: isAdminConfigured(),
  })
}

export async function POST(request: Request) {
  const password = getAdminPassword()
  if (!password) {
    return NextResponse.json(
      {
        ok: false,
        error: "not_configured",
        message:
          "ADMIN_PASSWORD is not set. Add it in Vercel → Settings → Environment Variables (Production), then redeploy.",
      },
      { status: 503 }
    )
  }

  const { password: submitted } = (await request.json()) as { password?: string }
  if (submitted !== password) {
    return NextResponse.json({ ok: false, error: "invalid_password", message: "Invalid password." }, { status: 401 })
  }

  const token = createSessionToken(password)
  const response = NextResponse.json({ ok: true })
  response.cookies.set(ADMIN_SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  })
  return response
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true })
  response.cookies.delete(ADMIN_SESSION_COOKIE)
  return response
}
