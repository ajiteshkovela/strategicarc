import { createHash, randomBytes, timingSafeEqual } from "crypto"
import { cookies } from "next/headers"

export const ADMIN_SESSION_COOKIE = "sa_admin_session"

export function getAdminPassword(): string | undefined {
  const value = process.env.ADMIN_PASSWORD?.trim()
  return value || undefined
}

export function isAdminConfigured(): boolean {
  return Boolean(getAdminPassword())
}

export function createSessionToken(password: string): string {
  const nonce = randomBytes(16).toString("hex")
  const sig = createHash("sha256").update(`${password}:${nonce}`).digest("hex")
  return `${nonce}.${sig}`
}

export function verifySessionToken(token: string, password: string): boolean {
  const [nonce, sig] = token.split(".")
  if (!nonce || !sig) return false
  const expected = createHash("sha256").update(`${password}:${nonce}`).digest("hex")
  if (sig.length !== expected.length) return false
  try {
    return timingSafeEqual(Buffer.from(sig), Buffer.from(expected))
  } catch {
    return false
  }
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const password = getAdminPassword()
  if (!password) return false
  const cookieStore = await cookies()
  const token = cookieStore.get(ADMIN_SESSION_COOKIE)?.value
  if (!token) return false
  return verifySessionToken(token, password)
}

export function verifyRequestSession(request: Request): boolean {
  const password = getAdminPassword()
  if (!password) return false
  const cookieHeader = request.headers.get("cookie") ?? ""
  const match = cookieHeader.match(new RegExp(`${ADMIN_SESSION_COOKIE}=([^;]+)`))
  const token = match?.[1]
  if (!token) return false
  return verifySessionToken(decodeURIComponent(token), password)
}
