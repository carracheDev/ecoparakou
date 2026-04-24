import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { HeroSection } from '@/components/home/hero-section'
import { LiveFeedSection } from '@/components/home/live-feed-section'
import { HowItWorksSection } from '@/components/home/how-it-works-section'
import { ActiveMissionsSection } from '@/components/home/active-missions-section'
import { FundingSection } from '@/components/home/funding-section'
import { StatsSection } from '@/components/home/stats-section'
import { PartnersSection } from '@/components/home/partners-section'
import { CtaSection } from '@/components/home/cta-section'

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main>
        <HeroSection />
        <LiveFeedSection />
        <HowItWorksSection />
        <ActiveMissionsSection />
        <FundingSection />
        <StatsSection />
        <PartnersSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  )
}
