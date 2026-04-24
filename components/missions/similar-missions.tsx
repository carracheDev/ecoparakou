import Image from 'next/image'
import Link from 'next/link'

const similarMissions = [
  {
    id: 4,
    title: "Marché Arzèkè",
    subtitle: "Collecte d'organiques",
    status: "En cours",
    statusColor: "bg-secondary-container text-on-secondary-container",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDOfbTcsBb7gYCh6vzK9qLaX5PlKR7WnPe6yE1IErIZSqmB2Fyfvu3_Kkh7BWC-IQ1Xi_61_HtEM-iDHeaweXNnhzG2ARFn6CYVDDn_JtAKsXovtoMtjce3c8He6rK3qcjtBsYmHaTZpSAfHo51QiZKE6W_v9pHpQgL5oN1rMLhcnmmLtUsC5YCf7C2NZIwxBI_sKL_Sgv6OGAarFsRpZv9pqevVKsvwAAdUH0vojfRUr9tfvXr95yZJKZLbiroZn_OR_qgBDLdtkU",
  },
  {
    id: 5,
    title: "Place Hubert Maga",
    subtitle: "Papiers et cartons",
    status: "En attente",
    statusColor: "bg-error-container text-on-error-container",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB4BePwmRklThHnN4iwVrT1hN5Op2vABsWKWlmCp2q_GVxnqe9EkChSik_DW3etzaQDnh8AS_-A1p_k2myVKptTnwmcd8kNlDcKplrEtTvdyfhCsVVqO07HokEiCGW4HKGBTY0mZ90685hCT4vYkeOlxZCCvFxYxElGT_LSgaeJZQXxtIl2tsTrwYducsXXcj6b04g4ni6fZaG88UyQomvSWdFYv_QPbSQpF3NN6PrOqGPp9c6SXmMZOz07zQPCzaE996QWxN18DiU",
  },
  {
    id: 6,
    title: "Zone Industrielle",
    subtitle: "Déchets encombrants",
    status: "En attente",
    statusColor: "bg-error-container text-on-error-container",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD77tAwflMGu3ExKUz3zyDSAOOJY-tAso6HTqd-SFonuQC3BXfdoHm21Nx9naTXFpEIXqynqwZIT632YiPE7KAW8EOrr_DfgwiqlHUMbiUy702AfpCremFvIDOxsRgc3QEaz4miuRW0xyMDBxgtyhTcYaPMav_S6zQqUfSVV4PhW59zIsXKNmQDLvRZe5W3zqBIUDanTkb35IBsiAaIDeoFiDoe_ce9D6f1El0ZgjDdJei2WvxkLTS8QgWoYPvF-UE71ewEcAb4Pzs",
  },
]

export function SimilarMissions() {
  return (
    <section className="mt-16">
      <h2 className="text-2xl font-semibold text-primary mb-6">Missions à proximité</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {similarMissions.map((mission) => (
          <Link 
            key={mission.id}
            href={`/missions/${mission.id}`}
            className="bg-white border border-outline-variant rounded-xl overflow-hidden hover:shadow-lg transition-shadow block"
          >
            <Image 
              src={mission.image}
              alt={mission.title}
              width={400}
              height={160}
              className="h-40 w-full object-cover"
            />
            <div className="p-3">
              <div className="flex justify-between items-center mb-1">
                <span className={`${mission.statusColor} px-2 py-0.5 rounded text-[10px] font-bold uppercase`}>
                  {mission.status}
                </span>
              </div>
              <h4 className="font-semibold text-on-surface text-sm">{mission.title}</h4>
              <p className="text-xs text-on-surface-variant">{mission.subtitle}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
