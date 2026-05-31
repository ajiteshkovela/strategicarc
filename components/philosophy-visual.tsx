import Image from "next/image"
import { SITE } from "@/lib/site-config"

const pillars = [
  { label: "Finance", desc: "Clarity in every number" },
  { label: "Compliance", desc: "Proactive, never reactive" },
  { label: "Strategy", desc: "Decisions with context" },
]

export function PhilosophyVisual() {
  return (
    <div className="philosophy-visual" aria-hidden="true">
      <div className="philosophy-visual-glow" />
      <div className="philosophy-visual-card">
        <div className="philosophy-visual-logo">
          <Image
            src={SITE.logo.src}
            alt=""
            width={320}
            height={172}
            className="philosophy-logo-img"
          />
        </div>
        <ul className="philosophy-pillars">
          {pillars.map((p) => (
            <li key={p.label}>
              <span className="pillar-dot" />
              <div>
                <strong>{p.label}</strong>
                <span>{p.desc}</span>
              </div>
            </li>
          ))}
        </ul>
        <div className="philosophy-visual-accent">
          <span>Done right.</span>
          <span>Done once.</span>
        </div>
      </div>
    </div>
  )
}
