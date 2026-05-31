"use client"

import { useCallback, useEffect, useState } from "react"
import { trackEngagement } from "@/components/engagement-tracker"
import { SITE } from "@/lib/site-config"

type ContactModalProps = {
  open: boolean
  onClose: () => void
}

function ContactModal({ open, onClose }: ContactModalProps) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="modal-root" role="dialog" aria-modal="true" aria-labelledby="contact-modal-title">
      <button type="button" className="modal-backdrop" aria-label="Close" onClick={onClose} />
      <div className="modal-panel">
        <button type="button" className="modal-close" aria-label="Close" onClick={onClose}>
          ×
        </button>
        <h3 id="contact-modal-title">Contact StrategicArc</h3>
        <p className="modal-sub">Choose how you&apos;d like to reach us — we&apos;ll respond promptly.</p>
        <div className="modal-actions">
          <a
            href={`mailto:${SITE.contact.email}`}
            className="modal-option btn-animated"
            data-track="email_click"
            data-track-label="contact_modal"
            onClick={onClose}
          >
            <span className="modal-option-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </span>
            <span>
              <strong>Email</strong>
              <small>{SITE.contact.email}</small>
            </span>
          </a>
          <a
            href={SITE.contact.phoneHref}
            className="modal-option btn-animated"
            data-track="phone_click"
            data-track-label="contact_modal"
            onClick={onClose}
          >
            <span className="modal-option-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
              </svg>
            </span>
            <span>
              <strong>Phone</strong>
              <small>{SITE.contact.phone}</small>
            </span>
          </a>
        </div>
      </div>
    </div>
  )
}

export function ContactUsButton({
  className = "btn-light btn-animated",
}: {
  className?: string
}) {
  const [open, setOpen] = useState(false)
  const close = useCallback(() => setOpen(false), [])

  return (
    <>
      <button
        type="button"
        className={className}
        data-track="cta_click"
        data-track-label="Contact Us"
        onClick={() => {
          trackEngagement("contact_modal_open", "cta_section")
          setOpen(true)
        }}
      >
        Contact Us
      </button>
      <ContactModal open={open} onClose={close} />
    </>
  )
}
