// components/missions/missions-list.tsx
"use client"

import { useState, useMemo, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const STATUS_FILTERS = ["Tous", "DISPONIBLE", "EN_COURS", "TERMINEE"]

const SORT_OPTIONS = [
  { label: "Plus récent", value: "recent" },
  { label: "Distance", value: "distance" },
  { label: "Bénévoles", value: "volunteers" },
]

const mapStatutToStatus = (statut: string) => {
  const map: { [key: string]: string } = {
    DISPONIBLE: "En attente",
    EN_COURS: "En cours",
    TERMINEE: "Terminé",
  }
  return map[statut] || statut
}

const mapGraviteToConfig = (gravite: string) => {
  const map: { [key: string]: any } = {
    LEGER: { color: 'bg-green-100 text-green-800', label: '🟢 Léger', icon: 'check_circle', iconColor: 'text-green-600', statusColor: 'bg-green-100 text-green-700 border-green-200', statusDot: 'bg-green-500' },
    MODERE: { color: 'bg-orange-100 text-orange-800', label: '🟠 Modéré', icon: 'pending', iconColor: 'text-orange-600', statusColor: 'bg-yellow-100 text-yellow-700 border-yellow-200', statusDot: 'bg-yellow-400' },
    CRITIQUE: { color: 'bg-red-100 text-red-800', label: '🔴 Critique - Urgent !', icon: 'priority_high', iconColor: 'text-red-600', statusColor: 'bg-red-100 text-red-700 border-red-200', statusDot: 'bg-red-500' },
  }
  return map[gravite] || map.LEGER
}

export function MissionsList() {
  const [missions, setMissions] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeFilter, setActiveFilter] = useState("Tous")
  const [sortBy, setSortBy] = useState("recent")
  const [showSort, setShowSort] = useState(false)

  useEffect(() => {
    const fetchMissions = async () => {
      try {
        const res = await fetch('/api/missions')
        const data = await res.json()
        setMissions(data)
      } catch (error) {
        console.error('Erreur lors du chargement des missions:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchMissions()
  }, [])

  const filtered = useMemo(() => {
    let result = missions.map((mission: any) => ({
      id: mission.id,
      title: mission.titre,
      location: mission.signalement?.adresse || "Non précisée",
      status: mapStatutToStatus(mission.statut),
      ...mapGraviteToConfig(mission.signalement?.gravite || 'LEGER'),
      tags: mission.signalement?.gravite ? [{ icon: "warning", label: mapGraviteToConfig(mission.signalement.gravite).label }] : [],
      updatedAt: mission.signalement?.createdAt ? new Date(mission.signalement.createdAt).toLocaleDateString('fr-FR') : "N/A",
      image: mission.signalement?.photoUrl || "/images/mission-1.jpg",
      volunteers: 0,
      distance: "N/A",
      statut: mission.statut,
    }))

    // Filtre recherche — title + location
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      result = result.filter(m =>
        m.title.toLowerCase().includes(q) ||
        m.location.toLowerCase().includes(q)
      )
    }

    // Filtre statut
    if (activeFilter !== "Tous") {
      result = result.filter(m => mapStatutToStatus(m.statut) === mapStatutToStatus(activeFilter))
    }

    // Tri
    if (sortBy === "recent") {
      result = [...result].sort((a: any, b: any) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    }

    return result
  }, [missions, searchQuery, activeFilter, sortBy])

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
                {missions.filter(m => filter === "Tous" || mapStatutToStatus(m.statut) === mapStatutToStatus(filter)).length}
              </span>
            )}
          </button>
        ))}

        {/* Résultats count */}
        <span className="ml-auto text-sm text-gray-400 self-center">
          {loading ? "Chargement..." : `${filtered.length} mission${filtered.length > 1 ? 's' : ''}`}
        </span>
      </div>

      {/* Loading state */}
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 bg-surface-container-low rounded-2xl">
          <span className="material-symbols-outlined text-6xl text-on-surface-variant opacity-30 mb-4 block">search_off</span>
          <p className="text-on-surface font-semibold text-lg mb-1">Aucune mission trouvée</p>
          <p className="text-on-surface-variant text-sm mb-6">Essayez avec d'autres critères de recherche</p>
          <button
            onClick={() => { setSearchQuery(''); setActiveFilter('Tous') }}
            className="text-primary text-sm font-semibold hover:underline inline-flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-base">refresh</span>
            Réinitialiser les filtres
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((mission) => (
            <div
              key={mission.id}
              className="bg-white border border-gray-200 rounded-xl overflow-hidden flex flex-col group hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
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
                <div className="absolute top-3 right-3">
                  <span className={`${mission.statusColor} text-xs font-medium px-3 py-1 rounded-full border`}>
                    {mission.status}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 flex flex-col flex-grow">
                <div className="flex items-start justify-between mb-1">
                  <h3 className="text-lg font-semibold text-on-surface">{mission.title}</h3>
                  <span className={`material-symbols-outlined ${mission.iconColor}`}>
                    {mission.icon}
                  </span>
                </div>

                <div className="flex items-center gap-1 text-on-surface-variant mb-4">
                  <span className="material-symbols-outlined text-base">location_on</span>
                  <span className="text-sm">{mission.location}</span>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-6">
                  {mission.tags.map((tag) => (
                    <span
                      key={tag.label}
                      className="flex items-center gap-1 bg-surface-container px-2.5 py-1 rounded-lg text-xs font-medium text-on-surface-variant"
                    >
                      {tag.label}
                    </span>
                  ))}
                </div>

                <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-xs font-medium text-on-surface-variant">{mission.updatedAt}</span>
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
      )}
    </>
  )
}