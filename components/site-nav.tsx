"use client"

import { useEffect, useState } from "react"

const navLinks = [
  { label: "Our Approach", href: "#approach" },
  { label: "Services", href: "#services" },
  { label: "Philosophy", href: "#philosophy" },
  { label: "Contact", href: "#contact" },
]

export function SiteNav() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const close = () => setOpen(false)
    window.addEventListener("hashchange", close)
    return () => window.removeEventListener("hashchange", close)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  return (
    <nav>
      <a href="#" className="nav-logo" onClick={() => setOpen(false)}>
        Strategic<span>Arc</span>
      </a>

      <button
        type="button"
        className="nav-toggle"
        aria-expanded={open}
        aria-controls="site-nav-menu"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="nav-toggle-bar" />
        <span className="nav-toggle-bar" />
        <span className="nav-toggle-bar" />
      </button>

      <div id="site-nav-menu" className={`nav-links${open ? " nav-links-open" : ""}`}>
        {navLinks.map((link) => (
          <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
            {link.label}
          </a>
        ))}
        <a href="#cta" className="nav-cta" onClick={() => setOpen(false)}>
          Book a Session
        </a>
      </div>

      {open && (
        <button
          type="button"
          className="nav-backdrop"
          aria-label="Close menu"
          onClick={() => setOpen(false)}
        />
      )}
    </nav>
  )
}
