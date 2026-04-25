import { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { SignalForm } from '@/components/signaler/signal-form'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Signaler une Zone Sale | EcoParakou',
  description: 'Reportez les zones sales à Parakou avec photo et localisation. Votre signalement aide nos équipes à nettoyer efficacement votre quartier.',
  keywords: ['signalement', 'pollution', 'Parakou', 'nettoyer', 'environnement'],
  openGraph: {
    title: 'Signaler une Zone Sale',
    description: 'Participez à l\'amélioration de votre environnement',
    type: 'website',
    url: 'https://ecoparakou.com/signaler',
  },
}

export default function SignalerPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="max-w-7xl mx-auto px-6 py-10 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Content: Instruction & Identity */}
          <div className="lg:col-span-5 space-y-6">
            <header>
              <h1 className="text-4xl font-bold text-primary mb-3">Signaler une zone sale</h1>
              <p className="text-lg text-on-surface-variant">
                Contribuez à la propreté de Parakou. Votre signalement permet à nos équipes d&apos;intervenir rapidement et de maintenir notre environnement sain.
              </p>
            </header>
            <div className="hidden lg:block rounded-xl overflow-hidden shadow-sm border border-outline-variant bg-surface-container-low">
              <Image 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCt0ddGhE-EnpkHChky9sqgg9ZzKoBTLS7aktWuyANoq286V6E3IqDb0MlrerWebpb1KSBN3h3udxvIameuXhhBvRNSHzT4hTa6yVxGc4o4_UzKYt-z-vbmWBcyHyHR5p8SfucwhpNVKbeNHICNRH9CWzpgtnoSQV_ApaER__ws9vKbmQPY4g6U75DFdlGW2Rgb127ZdIlyBgrFbYrz4cPqsWYh-XKznzP1G2d1o2EOq1w5WOozVGtHxIlybC5ly04qcGpyLGgp2ik"
                alt="Engagement citoyen pour l'environnement"
                width={600}
                height={256}
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-primary mb-2">Engagement Citoyen</h3>
                <p className="text-sm text-on-surface-variant">Chaque signalement est une étape vers une ville plus durable.</p>
              </div>
            </div>
          </div>

          {/* Right Content: Signal Form */}
          <div className="lg:col-span-7">
            <SignalForm />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
