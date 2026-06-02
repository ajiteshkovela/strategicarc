/**
 * Site-wide settings.
 *
 * Social links: update `social` below with your profile URLs.
 */
export const SITE = {
  name: "StrategicArc Consultants",
  tagline: "Your trusted financial partner, every step of the way",
  navTagline: "Built on Trust. Driven by Growth",
  contact: {
    phone: "+91 8688791603",
    phoneHref: "tel:+918688791603",
    email: "strategicarc@outlook.com",
    addressLines: [
      "2602, Stanley A, SMR Vinay Iconia Masjid Banda, Kondapur",
      "Hyderabad, Telangana - 500084 IN",
    ],
    addressFull:
      "2602, Stanley A, SMR Vinay Iconia Masjid Banda, Kondapur Hyderabad, Telangana - 500084 IN",
  },
  social: {
    linkedin: "https://www.linkedin.com/company/strategicarcconsultants/",
    // twitter: "https://x.com/strategicarc",
    instagram: "https://www.instagram.com/strategic_arc/?utm_source=ig_web_button_share_sheet",
  },
  logo: {
    src: "/strategicarc-logo.png",
    alt: "Strategic Arc Consultants",
  },
} as const
