import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { MissionDetail } from '@/components/missions/mission-detail'
import { SimilarMissions } from '@/components/missions/similar-missions'
import Link from 'next/link'

export const metadata = {
  title: 'Détail Mission - EcoParakou',
  description: 'Consultez les détails de cette mission de nettoyage à Parakou.',
}

export default async function MissionDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="max-w-7xl mx-auto px-6 py-10">
        {/* Back Navigation */}
        <div className="mb-6">
          <Link 
            href="/missions"
            className="inline-flex items-center gap-1 text-primary font-semibold hover:underline"
          >
            <span className="material-symbols-outlined text-xl">arrow_back</span>
            Retour à la liste des missions
          </Link>
        </div>
        
        <MissionDetail id={id} />
        <SimilarMissions />
      </main>
      <Footer />
    </div>
  )
}
