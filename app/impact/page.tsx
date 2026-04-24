import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ImpactHero } from "@/components/impact/impact-hero"
import { ImpactStats } from "@/components/impact/impact-stats"
import { ImpactCards } from "@/components/impact/impact-cards"
import { ImpactTable } from "@/components/impact/impact-table"
import { ImpactCta } from "@/components/impact/impact-cta"

export const metadata = {
  title: "Notre Impact | Alphonsine",
  description: "Découvrez l'impact environnemental, social, sanitaire et économique de notre plateforme de gestion des déchets.",
}

export default function ImpactPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <ImpactHero />
        <ImpactStats />
        <ImpactCards />
        <ImpactTable />
        <ImpactCta />
      </main>
      <Footer />
    </div>
  )
}
