"use client"

import { useEffect, useState } from 'react'

interface FeedItem {
  id: number
  message: string
  icon: string
  location: string
  time: string
}

const initialFeed: FeedItem[] = [
  { id: 1, message: "Zone nettoyée avec succès", icon: "check_circle", location: "Banikanni", time: "Il y a 15 min" },
  { id: 2, message: "Nouveau signalement reçu", icon: "report", location: "Zongo", time: "Il y a 32 min" },
  { id: 3, message: "Mission acceptée par une équipe", icon: "group", location: "Albarika", time: "Il y a 1h" },
]

export function LiveFeedSection() {
  const [feed, setFeed] = useState<FeedItem[]>(initialFeed)

  useEffect(() => {
    const newItems = [
      "Nouvelle collecte planifiée",
      "Citoyen rejoint le mouvement",
      "Zone signalée en attente",
      "Intervention terminée",
    ]
    const icons = ["schedule", "person_add", "warning", "done_all"]
    const locations = ["Madina", "Kpébié", "Dèkè", "Centre-ville"]

    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * newItems.length)
      const newItem: FeedItem = {
        id: Date.now(),
        message: newItems[randomIndex],
        icon: icons[randomIndex],
        location: locations[Math.floor(Math.random() * locations.length)],
        time: "À l'instant",
      }
      setFeed(prev => [newItem, ...prev.slice(0, 4)])
    }, 8000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="py-12 bg-surface-container-low">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2.5">
            <div className="w-2 h-2 rounded-full bg-green-500 relative">
              <div className="absolute inset-0 rounded-full bg-green-500 animate-ping" />
            </div>
            <h2 className="text-base font-bold text-primary">Activité récente à Parakou</h2>
          </div>
          <span className="text-xs text-outline">Mis à jour à l&apos;instant</span>
        </div>
        <div className="flex flex-col gap-2.5">
          {feed.map((item, index) => (
            <div 
              key={item.id} 
              className="flex items-center gap-3 p-3 bg-white rounded-xl border border-outline-variant shadow-sm animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center">
                <span className="material-symbols-outlined text-primary text-xl">{item.icon}</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-on-surface">{item.message}</p>
                <p className="text-xs text-outline">{item.location}</p>
              </div>
              <span className="text-xs text-outline whitespace-nowrap">{item.time}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
