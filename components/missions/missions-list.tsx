// components/missions/missions-list.tsx
"use client"

import { useState, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const allMissions = [
  {
    id: 1,
    title: "Quartier Ladji-Farani",
    location: "Zone Nord-Est, Parakou",
    status: "En attente",
    statusColor: "bg-red-100 text-red-700 border-red-200",
    statusDot: "bg-red-500",
    icon: "priority_high",
    iconColor: "text-red-600",
    tags: [{ icon: "recycling", label: "Plastique" }, { icon: "warning", label: "Urgent" }],
    updatedAt: "Mis à jour il y a 2h",
    image: "/images/mission-1.jpg",
    volunteers: 4,
    distance: "2.3 km",
  },
  {
    id: 2,
    title: "Quartier Banikanni",
    location: "Zone Marché, Parakou",
    status: "En cours",
    statusColor: "bg-yellow-100 text-yellow-700 border-yellow-200",
    statusDot: "bg-yellow-400",
    icon: "pending",
    iconColor: "text-yellow-600",
    tags: [{ icon: "compost", label: "Organique" }],
    updatedAt: "Mis à jour il y a 5h",
    image: "/images/mission--marché.jpg",
    volunteers: 12,
    distance: "1.1 km",
  },
  {
    id: 3,
    title: "Quartier Albarika",
    location: "Zone Universitaire, Parakou",
    status: "Terminé",
    statusColor: "bg-green-100 text-green-700 border-green-200",
    statusDot: "bg-green-500",
    icon: "check_circle",
    iconColor: "text-green-600",
    tags: [{ icon: "delete", label: "Mixte" }],
    updatedAt: "Terminé hier",
    image: "/images/mission-2.jpg",
    volunteers: 8,
    distance: "3.5 km",
  },
  {
    id: 4,
    title: "Zone Industrielle",
    location: "Avenue du Port, Parakou",
    status: "En attente",
    statusColor: "bg-red-100 text-red-700 border-red-200",
    statusDot: "bg-red-500",
    icon: "priority_high",
    iconColor: "text-red-600",
    tags: [{ icon: "biotech", label: "Dangereux" }],
    updatedAt: "Nouveau signalement",
    image: "/images/mission-4.jpg",
    volunteers: 0,
    distance: "5.8 km",
  },
  {
    id: 5,
    title: "Parc de l'Indépendance",
    location: "Centre-Ville, Parakou",
    status: "En cours",
    statusColor: "bg-yellow-100 text-yellow-700 border-yellow-200",
    statusDot: "bg-yellow-400",
    icon: "pending",
    iconColor: "text-yellow-600",
    tags: [{ icon: "park", label: "Espaces Verts" }],
    updatedAt: "Mis à jour il y a 1h",
    image: "/images/mission-5.jpg",
    volunteers: 6,
    distance: "0.8 km",
  },
  {
    id: 6,
    title: "Marché Central",
    location: "Place du marché, Parakou",
    status: "En attente",
    statusColor: "bg-red-100 text-red-700 border-red-200",
    statusDot: "bg-red-500",
    icon: "priority_high",
    iconColor: "text-red-600",
    tags: [{ icon: "compost", label: "Organique" }, { icon: "warning", label: "Urgent" }],
    updatedAt: "Mis à jour il y a 3h",
    image: "/images/mission--marché.jpg",
    volunteers: 2,
    distance: "1.4 km",
  },
]

const STATUS_FILTERS = ["Tous", "En attente", "En cours", "Terminé"]

const SORT_OPTIONS = [
  { label: "Plus récent", value: "recent" },
  { label: "Distance", value: "distance" },
  { label: "Bénévoles", value: "volunteers" },
]

export function MissionsList() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeFilter, setActiveFilter] = useState("Tous")
  const [sortBy, setSortBy] = useState("recent")
  const [showSort, setShowSort] = useState(false)

  const filtered = useMemo(() => {
    let result = allMissions

    // Filtre recherche — title + location
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      result = result.filter(m =>
        m.title.toLowerCase().includes(q) ||
        m.location.toLowerCase().includes(q) ||
        m.tags.some(t => t.label.toLowerCase().includes(q))
      )
    }

    // Filtre statut
    if (activeFilter !== "Tous") {
      result = result.filter(m => m.status === activeFilter)
    }

    // Tri
    if (sortBy === "distance") {
      result = [...result].sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance))
    } else if (sortBy === "volunteers") {
      result = [...result].sort((a, b) => b.volunteers - a.volunteers)
    }

    return result
  }, [searchQuery, activeFilter, sortBy])

  return (
    <>
      {/* Search + Sort bar */}
      <div className="mb-6 flex flex-wrap gap-3 items-center justify-between">
        {/* Search */}
        <div className="flex items-center gap-2 bg-white border border-gray-200 shadow-sm px-4 py-2.5 rounded-xl w-full md:w-96 focus-within:border-green-400 focus-within:ring-2 focus-within:ring-green-100 transition-all">
          <span className="material-symbols-outlined text-gray-400 text-xl">search</span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Rechercher un quartier, lieu, type..."
            className="border-none focus:ring-0 w-full text-sm bg-transparent outline-none text-gray-700 placeholder-gray-400"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="text-gray-400 hover:text-gray-600 transition-colors">
              <span className="material-symbols-outlined text-base">close</span>
            </button>
          )}
        </div>

        {/* Sort */}
        <div className="relative">
          <button
            onClick={() => setShowSort(!showSort)}
            className="flex items-center gap-2 bg-white border border-gray-200 shadow-sm px-4 py-2.5 rounded-xl text-sm font-semibold text-gray-600 hover:border-green-400 hover:text-green-700 transition-all"
          >
            <span className="material-symbols-outlined text-base">sort</span>
            Trier : {SORT_OPTIONS.find(o => o.value === sortBy)?.label}
          </button>
          {showSort && (
            <div className="absolute top-full right-0 mt-2 bg-white border border-gray-100 rounded-xl shadow-lg z-20 overflow-hidden min-w-[160px]">
              {SORT_OPTIONS.map(opt => (
                <button
                  key={opt.value}
                  onClick={() => { setSortBy(opt.value); setShowSort(false) }}
                  className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                    sortBy === opt.value
                      ? 'bg-green-50 text-green-700 font-semibold'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Status filter pills */}
      <div className="flex gap-2 mb-8 flex-wrap">
        {STATUS_FILTERS.map(filter => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold border transition-all duration-200 ${
              activeFilter === filter
                ? 'bg-green-900 text-white border-green-900 shadow-sm'
                : 'bg-white text-gray-600 border-gray-200 hover:border-green-400 hover:text-green-700'
            }`}
          >
            {filter}
            {filter !== "Tous" && (
              <span className={`ml-1.5 text-xs px-1.5 py-0.5 rounded-full ${
                activeFilter === filter ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'
              }`}>
                {allMissions.filter(m => m.status === filter).length}
              </span>
            )}
          </button>
        ))}

        {/* Résultats count */}
        <span className="ml-auto text-sm text-gray-400 self-center">
          {filtered.length} mission{filtered.length > 1 ? 's' : ''}
        </span>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <span className="material-symbols-outlined text-5xl text-gray-300 mb-4 block">search_off</span>
          <p className="text-gray-500 font-medium">Aucune mission trouvée</p>
          <p className="text-gray-400 text-sm mt-1">Essaie un autre mot-clé ou filtre</p>
          <button
            onClick={() => { setSearchQuery(''); setActiveFilter('Tous') }}
            className="mt-4 text-green-700 text-sm font-semibold hover:underline"
          >
            Réinitialiser les filtres
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((mission) => (
            <div
              key={mission.id}
              className="bg-white border border-gray-100 rounded-2xl overflow-hidden flex flex-col group hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={mission.image}
                  alt={mission.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

                {/* Status badge */}
                <div className="absolute top-3 left-3">
                  <span className={`flex items-center gap-1.5 ${mission.statusColor} text-xs font-semibold px-2.5 py-1 rounded-full border backdrop-blur-sm`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${mission.statusDot} animate-pulse`} />
                    {mission.status}
                  </span>
                </div>

                {/* Distance badge */}
                <div className="absolute top-3 right-3">
                  <span className="flex items-center gap-1 bg-black/40 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1 rounded-full">
                    <span className="material-symbols-outlined text-xs">near_me</span>
                    {mission.distance}
                  </span>
                </div>

                {/* Volunteers bottom */}
                <div className="absolute bottom-3 right-3">
                  <span className="flex items-center gap-1 bg-white/90 backdrop-blur-sm text-gray-700 text-xs font-semibold px-2.5 py-1 rounded-full">
                    <span className="material-symbols-outlined text-xs">group</span>
                    {mission.volunteers} bénévole{mission.volunteers > 1 ? 's' : ''}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 flex flex-col flex-grow">
                <div className="flex items-start justify-between mb-1">
                  <h3 className="text-base font-bold text-gray-900 leading-tight">{mission.title}</h3>
                  <span className={`material-symbols-outlined text-xl ${mission.iconColor} flex-shrink-0 ml-2`}>
                    {mission.icon}
                  </span>
                </div>

                <div className="flex items-center gap-1 text-gray-500 mb-3">
                  <span className="material-symbols-outlined text-sm">location_on</span>
                  <span className="text-xs">{mission.location}</span>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {mission.tags.map((tag) => (
                    <span
                      key={tag.label}
                      className="flex items-center gap-1 bg-gray-50 border border-gray-100 px-2.5 py-1 rounded-lg text-xs font-medium text-gray-600"
                    >
                      <span className="material-symbols-outlined text-xs">{tag.icon}</span>
                      {tag.label}
                    </span>
                  ))}
                </div>

                <div className="mt-auto pt-3 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-xs text-gray-400">{mission.updatedAt}</span>
                  <Link
                    href={`/missions/${mission.id}`}
                    className="bg-green-900 hover:bg-green-700 text-white font-semibold text-xs px-4 py-2 rounded-lg transition-all active:scale-95"
                  >
                    Voir détail →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  )
}