import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { MissionsList } from '@/components/missions/missions-list'
import MapWrapper from '@/components/map-wrapper'

export const metadata = {
  title: 'Missions - EcoParakou',
  description: 'Découvrez les missions de nettoyage disponibles à Parakou et contribuez à la propreté de votre ville.',
}

export default function MissionsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow max-w-7xl mx-auto w-full px-6 py-10 space-y-10">
        {/* Carte interactive */}
        <section>
          <div className="mb-4">
            <h2 className="text-2xl font-bold text-primary">
              🗺️ Carte des signalements en temps réel
            </h2>
            <p className="text-muted-foreground">
              Visualisez toutes les zones signalées à Parakou
            </p>
          </div>
          <MapWrapper />
        </section>

        {/* Liste des missions */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-on-surface mb-3">
            Missions de nettoyage disponibles
          </h1>
          <p className="text-lg text-on-surface-variant max-w-2xl">
            Contribuez à la propreté de Parakou en rejoignant les missions de collecte et de gestion des déchets en cours dans vos quartiers.
          </p>
        </div>
        <MissionsList />
      </main>
      <Footer />
    </div>
  )
}