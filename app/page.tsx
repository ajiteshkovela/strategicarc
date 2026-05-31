import { EngagementTracker } from "@/components/engagement-tracker"
import { SiteEffects } from "@/components/site-effects"
import { StrategicArcSite } from "@/components/strategicarc-site"

export default function Home() {
  return (
    <SiteEffects>
      <EngagementTracker />
      <StrategicArcSite />
    </SiteEffects>
  )
}
