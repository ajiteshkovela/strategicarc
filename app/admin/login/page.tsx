"use client"

import { useSearchParams } from "next/navigation"
import { FormEvent, useEffect, useState } from "react"

function AdminLoginForm() {
  const params = useSearchParams()
  const [password, setPassword] = useState("")
  const [configured, setConfigured] = useState<boolean | null>(null)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetch("/api/admin/login")
      .then((res) => res.json())
      .then((data: { configured?: boolean }) => setConfigured(Boolean(data.configured)))
      .catch(() => setConfigured(false))

    if (params.get("error") === "config") {
      setError("ADMIN_PASSWORD is not available on the server yet.")
    }
  }, [params])

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError("")
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    })
    setLoading(false)
    const data = (await res.json()) as { error?: string; message?: string }
    if (!res.ok) {
      if (data.error === "not_configured") {
        setConfigured(false)
        setError(data.message ?? "ADMIN_PASSWORD is not set on the server.")
      } else {
        setError(data.message ?? "Login failed.")
      }
      return
    }
    window.location.href = "/admin"
  }

  if (configured === null) {
    return (
      <div className="admin-login">
        <div className="admin-login-card">
          <p className="admin-muted">Checking admin configuration…</p>
        </div>
      </div>
    )
  }

  if (!configured) {
    return (
      <div className="admin-login">
        <div className="admin-login-card admin-setup-card">
          <h1>Admin setup required</h1>
          <p className="admin-muted">
            The analytics dashboard needs <code>ADMIN_PASSWORD</code> on the server before you can sign in.
          </p>
          <ol className="admin-setup-steps">
            <li>
              Open <strong>Vercel</strong> → your project → <strong>Settings</strong> →{" "}
              <strong>Environment Variables</strong>
            </li>
            <li>
              Add <code>ADMIN_PASSWORD</code> with a strong password (enable <strong>Production</strong>)
            </li>
            <li>
              Click <strong>Redeploy</strong> on the latest deployment so the variable is loaded
            </li>
            <li>
              For local dev, create <code>.env.local</code> with{" "}
              <code>ADMIN_PASSWORD=your-password</code> and restart <code>npm run dev</code>
            </li>
          </ol>
          <button type="button" className="admin-btn-primary" onClick={() => window.location.reload()}>
            I&apos;ve added it — refresh
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="admin-login">
      <form className="admin-login-card" onSubmit={onSubmit}>
        <h1>Analytics dashboard</h1>
        <p>Sign in to view visitor and engagement data for StrategicArc.</p>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          required
        />
        {error && <p className="admin-error">{error}</p>}
        <button type="submit" disabled={loading}>
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  )
}

export default function AdminLoginPage() {
  return <AdminLoginForm />
}
