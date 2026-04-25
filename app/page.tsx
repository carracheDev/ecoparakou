import { Metadata } from 'next'
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

export const metadata: Metadata = {
  title: 'EcoParakou - Gestion des Déchets Communautaire à Parakou',
  description: 'Rejoignez le mouvement citoyen pour transformer Parakou en ville propre et durable. Signalez les zones sales, participez aux missions de nettoyage et gagnez des récompenses.',
  keywords: ['Parakou', 'environnement', 'nettoyage urbain', 'Bénin', 'gestion déchets', 'bénévolat', 'écologie'],
  alternates: {
    canonical: 'https://ecoparakou.com',
  },
  openGraph: {
    type: 'website',
    locale: 'fr_BJ',
    url: 'https://ecoparakou.com',
    siteName: 'EcoParakou',
    title: 'EcoParakou - Ensemble pour une ville propre',
    description: 'Plateforme citoyenne pour la gestion des déchets et la transformation environnementale de Parakou',
    images: [
      {
        url: 'https://ecoparakou.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'EcoParakou - Accueil',
      },
    ],
  },
}

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
