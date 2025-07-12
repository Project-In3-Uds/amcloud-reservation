import { DashboardLayout,  } from "../components/dashboard-layout"
import { HeroSection } from "../components/hero-section"
import { FeaturesSection } from "../components/features-section"
import { CameroonDestinations } from "../components/cameroon-destinations"
import { CTASection } from "../components/cta-section"
import { Footer } from "../components/footer"
import { AgencyVerificationService } from "@/lib/agency-verification"


export default function HomePage() {
  return (

    <><DashboardLayout>
      <HeroSection />
      <FeaturesSection /><CameroonDestinations /><CTASection /><Footer /></DashboardLayout></>


  )
}
