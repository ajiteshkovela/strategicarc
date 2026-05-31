"use client"

import { useEffect, useRef, type ReactNode } from "react"

export function SiteEffects({ children }: { children: ReactNode }) {
  const glowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const glow = glowRef.current
    if (!glow) return

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReduced) {
      glow.style.display = "none"
      return
    }

    let x = 0
    let y = 0
    let targetX = 0
    let targetY = 0
    let raf = 0

    const onMove = (e: MouseEvent) => {
      targetX = e.clientX
      targetY = e.clientY
    }

    const tick = () => {
      x += (targetX - x) * 0.12
      y += (targetY - y) * 0.12
      glow.style.transform = `translate(${x - 200}px, ${y - 200}px)`
      raf = requestAnimationFrame(tick)
    }

    window.addEventListener("mousemove", onMove, { passive: true })
    raf = requestAnimationFrame(tick)

    const reveal = () => {
      document.querySelectorAll(".reveal-on-scroll").forEach((el) => {
        const rect = el.getBoundingClientRect()
        if (rect.top < window.innerHeight * 0.92) {
          el.classList.add("is-visible")
        }
      })
    }
    reveal()
    window.addEventListener("scroll", reveal, { passive: true })

    return () => {
      window.removeEventListener("mousemove", onMove)
      window.removeEventListener("scroll", reveal)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <div ref={glowRef} className="cursor-glow" aria-hidden="true" />
      {children}
    </>
  )
}
