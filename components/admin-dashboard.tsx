"use client"

import { useEffect, useState } from "react"
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import type { AnalyticsStats } from "@/lib/analytics-types"

const EVENT_LABELS: Record<string, string> = {
  pageview: "Page views",
  section_view: "Section views",
  cta_click: "CTA clicks",
  contact_modal_open: "Contact modal",
  email_click: "Email clicks",
  phone_click: "Phone clicks",
  social_click: "Social clicks",
  nav_click: "Nav clicks",
}

export function AdminDashboard() {
  const [stats, setStats] = useState<AnalyticsStats | null>(null)
  const [error, setError] = useState("")

  async function load() {
    const res = await fetch("/api/admin/stats")
    if (!res.ok) {
      setError("Could not load analytics.")
      return
    }
    setStats((await res.json()) as AnalyticsStats)
  }

  useEffect(() => {
    load()
    const id = setInterval(load, 30000)
    return () => clearInterval(id)
  }, [])

  async function logout() {
    await fetch("/api/admin/login", { method: "DELETE" })
    window.location.href = "/admin/login"
  }

  if (error) return <p className="admin-error">{error}</p>
  if (!stats) return <p className="admin-muted">Loading analytics…</p>

  const chartData = stats.byDay.map((d) => ({
    ...d,
    label: d.date.slice(5),
  }))

  const typeRows = Object.entries(stats.byType).sort((a, b) => b[1] - a[1])

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <div>
          <h1>Visitor & engagement dashboard</h1>
          <p className="admin-muted">
            Storage: {stats.storage}
            {!stats.configured && " — configure Upstash Redis on Vercel for production tracking."}
          </p>
        </div>
        <div className="admin-header-actions">
          <button type="button" className="admin-btn-secondary" onClick={load}>
            Refresh
          </button>
          <button type="button" className="admin-btn-secondary" onClick={logout}>
            Sign out
          </button>
          <a href="/" className="admin-btn-primary">
            View site
          </a>
        </div>
      </header>

      {!stats.configured && (
        <div className="admin-notice">
          <strong>Production setup:</strong> Add a free{" "}
          <a href="https://upstash.com" target="_blank" rel="noopener noreferrer">
            Upstash Redis
          </a>{" "}
          database and set <code>UPSTASH_REDIS_REST_URL</code> and{" "}
          <code>UPSTASH_REDIS_REST_TOKEN</code> in Vercel → Settings → Environment Variables.
          Also set <code>ADMIN_PASSWORD</code> for dashboard access.
          {stats.diagnostics && (
            <div style={{ marginTop: "12px", fontSize: "12px", borderTop: "1px solid rgba(0,0,0,0.08)", paddingTop: "10px" }}>
              <div style={{ fontWeight: "bold", marginBottom: "4px" }}>Server-side Environment Variables (Diagnostics):</div>
              <ul style={{ margin: "4px 0 0 16px", padding: 0, listStyleType: "disc" }}>
                <li>
                  <code>UPSTASH_REDIS_REST_URL</code>:{" "}
                  <span style={{ color: stats.diagnostics.redisUrl === "Missing" ? "#ef4444" : "#22c55e", fontWeight: "bold" }}>
                    {stats.diagnostics.redisUrl}
                  </span>
                </li>
                <li>
                  <code>UPSTASH_REDIS_REST_TOKEN</code>:{" "}
                  <span style={{ color: stats.diagnostics.redisToken === "Missing" ? "#ef4444" : "#22c55e", fontWeight: "bold" }}>
                    {stats.diagnostics.redisToken}
                  </span>
                </li>
              </ul>
              {(stats.diagnostics.redisUrl === "Missing" || stats.diagnostics.redisToken === "Missing") && (
                <div style={{ marginTop: "8px", fontSize: "11px", color: "#666" }}>
                  💡 <strong>Tip:</strong> If you already added these in Vercel, make sure you <strong>redeploy</strong> your project in Vercel so the changes take effect.
                </div>
              )}
            </div>
          )}
        </div>
      )}

      <div className="admin-metrics">
        <div className="admin-metric-card">
          <span className="admin-metric-val">{stats.pageviews}</span>
          <span className="admin-metric-label">Page views</span>
        </div>
        <div className="admin-metric-card">
          <span className="admin-metric-val">{stats.uniqueSessions}</span>
          <span className="admin-metric-label">Unique sessions</span>
        </div>
        <div className="admin-metric-card">
          <span className="admin-metric-val">{stats.engagements}</span>
          <span className="admin-metric-label">Engagements</span>
        </div>
        <div className="admin-metric-card">
          <span className="admin-metric-val">{stats.totalEvents}</span>
          <span className="admin-metric-label">Total events</span>
        </div>
      </div>

      {chartData.length > 0 && (
        <section className="admin-panel">
          <h2>Activity (last 14 days)</h2>
          <div className="admin-chart">
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2ddd4" />
                <XAxis dataKey="label" tick={{ fontSize: 12 }} />
                <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="pageviews" name="Page views" fill="#0f5c4e" radius={[4, 4, 0, 0]} />
                <Bar dataKey="engagements" name="Engagements" fill="#b8943a" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>
      )}

      <div className="admin-grid">
        <section className="admin-panel">
          <h2>Events by type</h2>
          <ul className="admin-list">
            {typeRows.map(([type, count]) => (
              <li key={type}>
                <span>{EVENT_LABELS[type] ?? type}</span>
                <strong>{count}</strong>
              </li>
            ))}
          </ul>
        </section>

        <section className="admin-panel">
          <h2>Recent activity</h2>
          <ul className="admin-recent">
            {stats.recent.length === 0 && (
              <li className="admin-muted">No events recorded yet. Visit the homepage to generate data.</li>
            )}
            {stats.recent.map((e) => (
              <li key={e.id}>
                <span className="admin-recent-type">{EVENT_LABELS[e.type] ?? e.type}</span>
                <span className="admin-recent-meta">
                  {e.label ? `${e.label} · ` : ""}
                  {new Date(e.timestamp).toLocaleString()}
                </span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section className="admin-panel admin-panel-links">
        <h2>Also on Vercel</h2>
        <p className="admin-muted">
          Enable <strong>Web Analytics</strong> in your Vercel project for additional traffic insights
          (audience, top pages, referrers).
        </p>
        <a
          href="https://vercel.com/umarfaaruk/strategicarc-website/analytics"
          target="_blank"
          rel="noopener noreferrer"
          className="admin-btn-primary"
        >
          Open Vercel Analytics →
        </a>
      </section>
    </div>
  )
}
