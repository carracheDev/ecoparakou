import Link from 'next/link'
import Image from 'next/image'

const missions = [
  {
    id: 1,
    title: "Quartier Ladji-Farani",
    location: "Zone Nord-Est, Parakou",
    status: "En attente",
    statusColor: "bg-red-100 text-red-800 border-red-200",
    icon: "priority_high",
    iconColor: "text-red-700",
    tags: ["Plastique", "Urgent"],
    updatedAt: "Il y a 2h",
    image: "/images/mission-1.jpg",
  },
  {
    id: 2,
    title: "Quartier Banikanni",
    location: "Zone Marché, Parakou",
    status: "En cours",
    statusColor: "bg-yellow-100 text-yellow-800 border-yellow-200",
    icon: "pending",
    iconColor: "text-secondary",
    tags: ["Organique"],
    updatedAt: "Il y a 5h",
    image: "/images/mission--marché.jpg",
  },
  {
    id: 3,
    title: "Quartier Albarika",
    location: "Zone Universitaire, Parakou",
    status: "Terminé",
    statusColor: "bg-primary-fixed text-on-primary-fixed-variant border-primary-fixed-dim",
    icon: "check_circle",
    iconColor: "text-primary",
    tags: ["Mixte"],
    updatedAt: "Terminé hier",
    image: "/images/mission-2.jpg",
  },
]

export function ActiveMissionsSection() {
  return (
    <section className="py-20 bg-surface-container-low">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between mb-8 flex-wrap gap-3">
          <div>
            <span className="inline-block bg-yellow-50 text-secondary text-xs font-bold px-3.5 py-1 rounded-full tracking-wider mb-2">
              EN COURS
            </span>
            <h2 className="text-3xl font-semibold text-primary">Missions actives</h2>
          </div>
          <Link
            href="/missions"
            className="border border-primary text-primary px-4 py-2 rounded-lg text-sm font-semibold hover:bg-primary hover:text-white transition-colors"
          >
            Voir toutes les missions
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {missions.map((mission) => (
            <div
              key={mission.id}
              className="bg-white border border-gray-200 rounded-xl overflow-hidden flex flex-col group hover:shadow-lg transition-all duration-300"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={mission.image}
                  alt={mission.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3">
                  <span className={`${mission.statusColor} text-xs font-medium px-3 py-1 rounded-full border`}>
                    {mission.status}
                  </span>
                </div>
              </div>
              <div className="p-4 flex flex-col flex-grow">
                <div className="flex items-start justify-between mb-1">
                  <h3 className="text-xl font-semibold text-on-surface">{mission.title}</h3>
                  <span className={`material-symbols-outlined ${mission.iconColor}`}>{mission.icon}</span>
                </div>
                <div className="flex items-center gap-1 text-on-surface-variant mb-4">
                  <span className="material-symbols-outlined text-base">location_on</span>
                  <span className="text-sm">{mission.location}</span>
                </div>
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {mission.tags.map((tag) => (
                    <span
                      key={tag}
                      className="flex items-center gap-1 bg-surface-container px-2.5 py-1 rounded-lg text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-xs font-medium text-outline">{mission.updatedAt}</span>
                  <Link
                    href={`/missions/${mission.id}`}
                    className="bg-secondary-container text-on-secondary-container font-semibold text-sm px-4 py-1.5 rounded-lg hover:brightness-95 transition-all active:scale-95"
                  >
                    Voir détail
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}