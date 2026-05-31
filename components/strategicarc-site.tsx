const CONTACT = {
  phone: "+91 8688791603",
  phoneHref: "tel:+918688791603",
  email: "strategicarc@outlook.com",
  address:
    "2602, Stanley A, SMR Vinay Iconia, Masjid Banda, Kondapur, Hyderabad, Telangana - 500084, India",
} as const

function CheckIcon() {
  return (
    <svg viewBox="0 0 12 12">
      <polyline points="2,6 5,9 10,3" />
    </svg>
  )
}

function InfoIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="var(--gold)"
      strokeWidth="1.75"
      style={{ flexShrink: 0 }}
    >
      <path d="M13 16H12V12H11M12 8H12.01" />
      <circle cx="12" cy="12" r="10" />
    </svg>
  )
}

const promiseItems = [
  "Compliance is handled before a notice ever arrives",
  "Real-time MIS so every decision has a number behind it",
  "A single retainer. One accountable partner. No handoffs.",
  "Strategy integrated into every engagement — not invoiced separately",
  "A limited roster ensures you always have our full attention",
]

const stripItems = [
  "Virtual CFO",
  "Direct & Indirect Taxation",
  "Transfer Pricing",
  "Audit & Assurance",
  "FEMA & Corporate Law",
  "Business Advisory",
]

const problemCards = [
  {
    title: "Reactive, not proactive",
    text: "You hear about the compliance gap after the notice arrives. By then, you're managing a crisis instead of a business.",
  },
  {
    title: "Decisions without data",
    text: "Leadership is steering with delayed financials, inconsistent reports, and no single version of the truth.",
  },
  {
    title: "No strategic ownership",
    text: "Your advisors advise. When the decision matters, nobody has skin in the outcome the way a true partner would.",
  },
  {
    title: "The coordination tax",
    text: "Time spent aligning your CA, lawyer, and finance team is time not spent running the business. We eliminate that entirely.",
  },
]

const approachCells = [
  {
    num: "01",
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" />
        <path d="M12 6V12L16 14" />
      </svg>
    ),
    title: "Proactive Compliance",
    text: "We map every statutory obligation before the year begins. Deadlines are tracked, filings are prepared in advance, and you are never surprised by a notice or penalty. Prevention is cheaper than cure — and that is our responsibility, not yours.",
  },
  {
    num: "02",
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M3 3H21V21H3V3Z" />
        <path d="M3 9H21" />
        <path d="M9 21V9" />
      </svg>
    ),
    title: "Real-Time MIS",
    text: "Decisions made on stale numbers are expensive. We build and maintain live management information systems — dashboards, reports, and analytics — so your leadership always has a clear, current financial picture before every critical decision.",
  },
  {
    num: "03",
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M2 20L7 15L12 18L17 11L22 14" />
        <path d="M2 12L7 7L12 10L17 3L22 6" />
      </svg>
    ),
    title: "Strategy in Every Engagement",
    text: "We don't compartmentalise. A tax filing tells a story about your structure. An audit uncovers an operational truth. A statutory compliance review often surfaces a planning opportunity. We connect these dots — because that is what a partner does.",
  },
  {
    num: "04",
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13" />
        <path d="M16 3.13C16.8604 3.3503 17.623 3.8507 18.1676 4.55231C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89317 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88" />
      </svg>
    ),
    title: "Single Partner Accountability",
    text: "One retainer. One relationship. One point of accountability. When something needs to get done, you don't coordinate between three advisors — you call us. We carry the full scope of your finance function with complete ownership of the outcome.",
  },
]

const services = [
  {
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M12 2L2 7L12 12L22 7L12 2Z" />
        <path d="M2 17L12 22L22 17" />
        <path d="M2 12L12 17L22 12" />
      </svg>
    ),
    title: "Virtual CFO",
    text: "Senior financial leadership on retainer — budgeting, cash flow management, investor reporting, fundraising support, and board-level advisory. The strategic finance function your business needs, without the overhead of a full-time hire.",
    tag: "Core Anchor Service",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21H16M12 17V21" />
      </svg>
    ),
    title: "Direct Taxation",
    text: "Income tax planning, filing, and advisory for corporates, partnerships, and individuals. Litigation support, advance tax management, and strategic structuring to minimise your effective tax rate — compliantly and sustainably.",
    tag: "Tax & Compliance",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M20.59 13.41L13.42 20.58C13.2343 20.766 13.0137 20.9135 12.7709 21.0141C12.5281 21.1148 12.2678 21.1666 12.005 21.1666C11.7422 21.1666 11.4819 21.1148 11.2391 21.0141C10.9963 20.9135 10.7757 20.766 10.59 20.58L2 12V2H12L20.59 10.59C20.9625 10.9647 21.1716 11.4716 21.1716 12C21.1716 12.5284 20.9625 13.0353 20.59 13.41V13.41Z" />
        <line x1="7" y1="7" x2="7.01" y2="7" />
      </svg>
    ),
    title: "Indirect Taxation (GST)",
    text: "End-to-end GST compliance — return filing, input credit reconciliation, refund claims, and departmental assessments. We handle the complexity so GST never becomes a bottleneck in your operations or cash flow.",
    tag: "Tax & Compliance",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" />
        <polyline points="14,2 14,8 20,8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10,9 9,9 8,9" />
      </svg>
    ),
    title: "Accounting & Bookkeeping",
    text: "Clean, reliable books maintained on a real-time basis. Payroll processing, bank reconciliations, vendor and receivables management, and MIS-ready financial statements prepared monthly — so you're never waiting to understand where you stand.",
    tag: "Operations",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24">
        <polyline points="9 11 12 14 22 4" />
        <path d="M21 12V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H16" />
      </svg>
    ),
    title: "Audit & Assurance",
    text: "Statutory, internal, and management audits conducted with a process-improvement mindset. We look for what can be strengthened, not just what is required to be checked. Every audit delivers a report and a roadmap.",
    tag: "Assurance",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2C14.5013 4.73835 15.9228 8.29203 16 12C15.9228 15.708 14.5013 19.2616 12 22C9.49872 19.2616 8.07725 15.708 8 12C8.07725 8.29203 9.49872 4.73835 12 2Z" />
      </svg>
    ),
    title: "Transfer Pricing",
    text: "Benchmarking studies, documentation, Form 3CEB filing, and representation in TP assessments. Particularly suited to software, IT services, and multi-jurisdiction groups where intercompany pricing requires defensible, compliant frameworks.",
    tag: "International Tax",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" />
        <polyline points="9,22 9,12 15,12 15,22" />
      </svg>
    ),
    title: "Corporate & FEMA Compliance",
    text: "Company secretarial work, ROC filings, FEMA compliance for inbound and outbound investments, ODI/FDI structuring guidance, and regulatory advisory for cross-border structures. Everything from incorporation to ongoing statutory maintenance.",
    tag: "Regulatory",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24">
        <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
      </svg>
    ),
    title: "Business Advisory",
    text: "Valuations, financial modelling, feasibility studies, restructuring analysis, and strategic decision support. When the board needs to make a decision backed by rigorous financial analysis, we build the model and walk through it with you.",
    tag: "Strategy",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M22 12H18L15 21L9 3L6 12H2" />
      </svg>
    ),
    title: "Management Reporting & MIS",
    text: "Custom dashboards, KPI tracking, variance analysis, and board-ready reporting packs — delivered on a rhythm that matches your business cycle. Never make a major decision with yesterday's information again.",
    tag: "Analytics",
  },
]

const differentiators = [
  {
    title: "We prevent, not just respond",
    text: "Most advisors engage after a problem surfaces. We work backward from every statutory calendar, flag exposures before they become liabilities, and design processes so issues don't arise in the first place.",
  },
  {
    title: "A single retainer, not a series of invoices",
    text: 'You know what you\'re paying. You know what\'s covered. There are no surprises at year end, no "that\'s a separate engagement" conversations, and no incentive for us to keep problems unsolved.',
  },
  {
    title: "Finance and strategy are the same conversation",
    text: "When we look at your P&L, we're not just preparing a statement — we're asking what it reveals about your pricing, your cost base, your growth trajectory, and your next move. That context goes into everything we do.",
  },
  {
    title: "Depth over breadth — always",
    text: "We accept fewer clients than we could. That choice is intentional. The result is that we understand your business at a level most advisors never reach — and that understanding is what creates real value.",
  },
  {
    title: "Multi-jurisdiction capability",
    text: "We work with clients across India and for cross-border structures involving the US, UK, and Singapore. Transfer pricing, FEMA, FDI — the complexity of a global footprint is handled internally, not referred out.",
  },
  {
    title: "Advisors who understand a founder's reality",
    text: "We know what it's like to build a business. Our advice is calibrated for the demands of growth — not just technical accuracy. We communicate clearly, move fast, and understand that your time has a real cost.",
  },
]

const processSteps = [
  {
    step: "1",
    title: "Diagnostic Session",
    text: "60 minutes. Complimentary. We map your current finance and compliance landscape — no charge, no obligation.",
  },
  {
    step: "2",
    title: "Diagnostic Report",
    text: "Within 5 working days, you receive a written assessment of gaps, risks, and opportunities — yours to keep regardless of next steps.",
  },
  {
    step: "3",
    title: "Engagement Design",
    text: "We propose a retainer structure and scope calibrated to your business — no standard packages, no inflated minimums.",
  },
  {
    step: "4",
    title: "Onboarding",
    text: "We take over systematically — no disruption to your operations. Within the first month, you'll see measurable change in your financial clarity.",
  },
  {
    step: "5",
    title: "Ongoing Partnership",
    text: "Regular reviews, proactive alerts, and full availability. You run your business. We ensure the financial engine never stalls.",
  },
]

const whoCards = [
  {
    badge: "Founder-led",
    title: "Growth-stage companies",
    text: "Startups and SMEs scaling from ₹5Cr to ₹100Cr+ who need financial infrastructure, investor-grade reporting, and strategic clarity to support the next phase of growth.",
  },
  {
    badge: "Multi-entity",
    title: "Established business groups",
    text: "Holding structures, family offices, and diversified business groups with multiple entities requiring consolidated reporting, intercompany structuring, and unified compliance oversight.",
  },
  {
    badge: "Cross-border",
    title: "India–global operations",
    text: "Businesses with India delivery centres, US entities, or cross-border investments navigating transfer pricing, FEMA, FDI/ODI structures, and dual-jurisdiction compliance.",
  },
]

import { SiteNav } from "@/components/site-nav"

const sessionItems = [
  "Review of your current compliance posture and open exposures",
  "Assessment of your financial reporting and MIS infrastructure",
  "Identification of tax planning and structuring opportunities",
  "Evaluation of your advisory setup — who's doing what, and what's missing",
  "A candid view on whether and how StrategicArc can add value for you",
]

export function StrategicArcSite() {
  return (
    <div className="strategicarc">
      <SiteNav />

      <section className="hero" id="top">
        <div>
          <div className="hero-eyebrow">Finance · Compliance · Strategy</div>
          <h1>
            One partner.
            <br />
            Every number.
            <br />
            <em>Your business.</em>
          </h1>
          <p className="hero-sub">
            StrategicArc Consultants is your integrated finance partner — eliminating the cost and confusion of fragmented advice.{" "}
            <strong>Finance. Compliance. Strategy. Done right. Done once.</strong>
          </p>
          <div className="hero-actions">
            <a href="#cta" className="btn-primary">
              Book a 60-min Diagnostic Session
            </a>
            <a href="#approach" className="btn-secondary">
              See how we work →
            </a>
          </div>
        </div>
        <div className="hero-right">
          <div className="hero-card-tag">
            <p>Our promise</p>
          </div>
          <div className="hero-card-main">
            <h3>What changes when you work with us</h3>
            <ul className="promise-list">
              {promiseItems.map((item) => (
                <li key={item}>
                  <div className="promise-dot" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="hero-card-float">
            <p>Complimentary, no-obligation</p>
            <strong>60-min Diagnostic Session</strong>
          </div>
        </div>
      </section>

      <div className="strip">
        {stripItems.flatMap((item, i) => [
          ...(i > 0 ? [<div key={`sep-${item}`} className="strip-sep" aria-hidden="true" />] : []),
          <div key={item} className="strip-item">
            <span>{item}</span>
          </div>,
        ])}
      </div>

      <section className="problem" id="problem">
        <div className="section-label">The problem we solve</div>
        <div className="problem-grid">
          <div>
            <div className="problem-quote">
              Most businesses run on <strong>fragmented advice</strong> — a CA for taxes, a lawyer for compliance, a consultant for strategy. Each one knows their corner. <strong>Nobody sees the whole picture.</strong>
            </div>
          </div>
          <div className="problem-cards">
            {problemCards.map((card) => (
              <div key={card.title} className="problem-card">
                <h4>{card.title}</h4>
                <p>{card.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="approach">
        <div className="section-label">How we work</div>
        <div className="section-title">
          Integration isn&apos;t a feature.
          <br />
          <em>It&apos;s the foundation.</em>
        </div>
        <div className="section-intro" style={{ marginBottom: 0 }}>
          Every engagement at StrategicArc is built on four commitments — the principles that separate a finance partner from a finance vendor.
        </div>
        <div className="approach-grid">
          {approachCells.map((cell) => (
            <div key={cell.num} className="approach-cell">
              <div className="approach-num">{cell.num}</div>
              <div className="approach-icon">{cell.icon}</div>
              <h3>{cell.title}</h3>
              <p>{cell.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="services">
        <div className="services-intro">
          <div>
            <div className="section-label">What we cover</div>
            <div className="section-title">
              Every dimension of your
              <br />
              <em>financial ecosystem.</em>
            </div>
          </div>
          <div className="section-intro">
            Our services are not a menu. They are an interconnected operating model — each practice area informs and strengthens the others. You engage StrategicArc as a whole, not in parts.
          </div>
        </div>
        <div className="services-grid">
          {services.map((service) => (
            <div key={service.title} className="service-card">
              <div className="service-card-icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
              <span className="service-tag">{service.tag}</span>
            </div>
          ))}
        </div>
        <div className="services-note">
          <InfoIcon />
          <p>
            We maintain a <strong>deliberately limited client roster</strong> to ensure every engagement receives the depth of attention it deserves. If we take on your business, we know it inside out. This is what makes a genuine partnership possible.
          </p>
        </div>
      </section>

      <section className="diff" id="differentiators">
        <div className="section-label">Why StrategicArc</div>
        <div className="section-title">
          What makes the difference
          <br />
          <em>is how we think.</em>
        </div>
        <div className="diff-grid">
          {differentiators.map((item, i) => (
            <div key={item.title} className="diff-item">
              <div className="diff-num">{String(i + 1).padStart(2, "0")}</div>
              <div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="process">
        <div className="section-label">Getting started</div>
        <div className="section-title">
          From first conversation
          <br />
          <em>to full partnership.</em>
        </div>
        <div className="process-steps">
          {processSteps.map((step) => (
            <div key={step.step} className="process-step">
              <div className="step-circle">{step.step}</div>
              <h4>{step.title}</h4>
              <p>{step.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="who">
        <div className="section-label">Who we serve</div>
        <div className="section-title" style={{ color: "#fff" }}>
          Built for businesses that
          <br />
          take finance seriously.
        </div>
        <div className="section-intro">
          StrategicArc is not a volume-first firm. We work best with clients who want a strategic partner — not just a compliance vendor.
        </div>
        <div className="who-grid">
          {whoCards.map((card) => (
            <div key={card.title} className="who-card">
              <div className="badge">{card.badge}</div>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="philosophy" className="philosophy-section">
        <div className="philosophy-layout philosophy-single">
          <div className="philosophy-text">
            <div className="section-label">Our philosophy</div>
            <div className="section-title">
              Your business.
              <br />
              <em>Our responsibility.</em>
            </div>
            <div className="philosophy-emphasis">&quot;Finance. Compliance. Strategy. Done right. Done once.&quot;</div>
            <p>
              We started StrategicArc because we saw how much value was lost in the gaps between advisors — the CA who didn&apos;t know what the CFO had decided, the compliance filing that went out before the structure was finalised, the strategic decision made without a proper financial model.
            </p>
            <p>
              Closing those gaps is not a value-add for us. It is the entire point. When you partner with StrategicArc, you are not buying a service — you are gaining a finance function. One that is always on, always aligned, and always accountable to your outcomes.
            </p>
            <p>We measure our success by your growth. When your business is simpler, clearer, and more profitable than it was when we began — that is what we are here for.</p>
          </div>
        </div>
      </section>

      <section className="cta-section" id="cta">
        <div>
          <div className="cta-label">Let&apos;s begin</div>
          <h2>
            Book your complimentary
            <br />
            Diagnostic Session
          </h2>
          <p>
            A 60-minute conversation to map your current financial and compliance landscape. We&apos;ll identify the gaps, the risks, and the opportunities — and share what we find in writing. No charge. No obligation. No sales pressure.
          </p>
          <div className="cta-actions">
            <a href={`mailto:${CONTACT.email}`} className="btn-light">
              Email us to schedule →
            </a>
            <a href={CONTACT.phoneHref} className="btn-cta-outline">
              {CONTACT.phone}
            </a>
          </div>
        </div>
        <div className="session-card">
          <h3>What the Diagnostic covers</h3>
          <ul className="session-list">
            {sessionItems.map((item) => (
              <li key={item}>
                <div className="session-check">
                  <CheckIcon />
                </div>
                {item}
              </li>
            ))}
          </ul>
          <p className="session-note">
            You will receive a written Diagnostic Report within 5 working days — yours to keep, regardless of what you decide next.
          </p>
        </div>
      </section>

      <div className="contact-bar" id="contact">
        <div className="contact-bar-inner">
          <div className="contact-bar-brand">
            <h4>StrategicArc Consultants LLP</h4>
            <p>Integrated finance, compliance, and strategy advisory</p>
          </div>
          <dl className="contact-details">
            <div className="contact-detail">
              <dt>Contact</dt>
              <dd>
                <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>
              </dd>
            </div>
            <div className="contact-detail">
              <dt>Mail</dt>
              <dd>
                <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
              </dd>
            </div>
            <div className="contact-detail contact-detail-address">
              <dt>Address</dt>
              <dd>{CONTACT.address}</dd>
            </div>
          </dl>
        </div>
      </div>

      <footer>
        <div className="footer-top">
          <div className="footer-brand">
            <h3>StrategicArc Consultants LLP</h3>
            <p>Your integrated Finance, Compliance, and Strategy partner — built for businesses that take clarity seriously.</p>
          </div>
          <div className="footer-links">
            <div className="footer-col">
              <h4>Services</h4>
              <a href="#services">Virtual CFO</a>
              <a href="#services">Direct Taxation</a>
              <a href="#services">GST & Indirect Tax</a>
              <a href="#services">Transfer Pricing</a>
              <a href="#services">Audit & Assurance</a>
              <a href="#services">Business Advisory</a>
            </div>
            <div className="footer-col">
              <h4>Company</h4>
              <a href="#approach">Our Approach</a>
              <a href="#philosophy">Philosophy</a>
              <a href="#process">How We Work</a>
              <a href="#cta">Book a Session</a>
            </div>
            <div className="footer-col">
              <h4>Contact</h4>
              <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>
              <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
              <span className="footer-address">{CONTACT.address}</span>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} StrategicArc Consultants LLP. All rights reserved.</p>
          <div className="footer-tagline">Finance. Compliance. Strategy. Done right. Done once.</div>
        </div>
      </footer>
    </div>
  )
}
