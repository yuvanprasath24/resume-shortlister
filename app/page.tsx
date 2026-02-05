import { LandingHeader } from "@/components/landing/header"
import { HeroSection } from "@/components/landing/hero"
import { FeaturesSection } from "@/components/landing/features"
import { HowItWorksSection } from "@/components/landing/how-it-works"
import { StatsSection } from "@/components/landing/stats"
import { AboutSection } from "@/components/landing/about"
import { CTASection } from "@/components/landing/cta"
import { Footer } from "@/components/landing/footer"

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <LandingHeader />
      <main className="flex-1">
        <HeroSection />
        <StatsSection />
        <FeaturesSection />
        <HowItWorksSection />
        <AboutSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
