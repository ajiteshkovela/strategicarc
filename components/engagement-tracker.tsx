"use client"

import { usePathname } from "next/navigation"
import { useEffect } from "react"
import { track } from "@vercel/analytics"
import type { AnalyticsEventType } from "@/lib/analytics-types"

function getSessionId() {
  const key = "sa_session_id"
  let id = localStorage.getItem(key)
  if (!id) {
    id = `s_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`
    localStorage.setItem(key, id)
  }
  return id
}

export function trackEngagement(type: AnalyticsEventType, label?: string) {
  const sessionId = getSessionId()
  const path = typeof window !== "undefined" ? window.location.pathname : "/"

  track(type, { label: label ?? type, path })

  fetch("/api/analytics", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ type, path, label, sessionId }),
    keepalive: true,
  }).catch(() => {
    /* analytics optional */
  })
}

export function EngagementTracker() {
  const pathname = usePathname()

  useEffect(() => {
    trackEngagement("pageview", pathname)

    const sections = document.querySelectorAll<HTMLElement>("section[id]")
    const seen = new Set<string>()

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          const id = entry.target.id
          if (!id || seen.has(id)) continue
          seen.add(id)
          trackEngagement("section_view", id)
        }
      },
      { threshold: 0.35 }
    )

    sections.forEach((el) => observer.observe(el))

    const onClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest<HTMLElement>(
        "[data-track]"
      )
      if (!target) return
      const type = target.dataset.track as AnalyticsEventType | undefined
      const label = target.dataset.trackLabel
      if (type) trackEngagement(type, label)
    }

    document.addEventListener("click", onClick)
    return () => {
      observer.disconnect()
      document.removeEventListener("click", onClick)
    }
  }, [pathname])

  return null
}
