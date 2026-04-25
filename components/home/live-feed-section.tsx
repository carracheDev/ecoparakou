"use client"

import { useEffect, useState } from "react"
import {
  CheckCircle2,
  Truck,
  UserPlus,
  AlertTriangle,
  Users,
  MapPin,
} from "lucide-react"

type IconKey = "check" | "truck" | "user" | "warning" | "worker"

interface FeedItem {
  id: number
  message: string
  iconKey: IconKey
  location: string
  time: string
  badge: string
  badgeColor: "green" | "yellow" | "blue"
}

const iconMap: Record<IconKey, React.ReactNode> = {
  check: <CheckCircle2 size={24} className="text-green-600" />,
  truck: <Truck size={24} className="text-blue-600" />,
  user: <UserPlus size={24} className="text-blue-600" />,
  warning: <AlertTriangle size={24} className="text-yellow-600" />,
  worker: <Users size={24} className="text-green-600" />,
}

const initialFeed: FeedItem[] = [
  {
    id: 1,
    message: "Intervention terminée",
    iconKey: "check",
    location: "Madina",
    time: "2 min",
    badge: "Terminé",
    badgeColor: "green",
  },
  {
    id: 2,
    message: "Collecte planifiée",
    iconKey: "truck",
    location: "Centre-ville",
    time: "5 min",
    badge: "Planifié",
    badgeColor: "blue",
  },
  {
    id: 3,
    message: "Nouveau citoyen engagé",
    iconKey: "user",
    location: "Banikanni",
    time: "8 min",
    badge: "+1 membre",
    badgeColor: "blue",
  },
  {
    id: 4,
    message: "Zone signalée en attente",
    iconKey: "warning",
    location: "Kpébié",
    time: "12 min",
    badge: "En attente",
    badgeColor: "yellow",
  },
]

const badgeStyles = {
  green: "bg-green-100 text-green-700",
  yellow: "bg-yellow-100 text-yellow-700",
  blue: "bg-blue-100 text-blue-700",
}

export function LiveFeedSection() {
  const [feed, setFeed] = useState(initialFeed)

  useEffect(() => {
    const interval = setInterval(() => {
      const random = initialFeed[Math.floor(Math.random() * initialFeed.length)]

      setFeed((prev) => [{ ...random, id: Date.now() }, ...prev.slice(0, 5)])
    }, 7000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="py-28 bg-gray-50">

      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}

        <div className="text-center mb-16">

          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 text-xs font-semibold px-4 py-1 rounded-full mb-4">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            EN DIRECT
          </div>

          <h2 className="text-4xl font-bold text-gray-900 mb-3">
            Activité récente à <span className="text-green-700">Parakou</span>
          </h2>

          <p className="text-gray-500 max-w-lg mx-auto">
            Suivez en temps réel les signalements et interventions dans votre ville.
          </p>

        </div>

        {/* Grid */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {feed.map((item) => (

            <div
              key={item.id}
              className="bg-white p-7 rounded-3xl border border-gray-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >

              <div className="flex gap-5">

                {/* Icon */}

                <div className="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center">
                  {iconMap[item.iconKey]}
                </div>

                {/* Content */}

                <div className="flex-1">

                  <div className="flex justify-between items-start mb-2">

                    <h3 className="font-semibold text-lg text-gray-900">
                      {item.message}
                    </h3>

                    <span className="text-xs text-gray-400">
                      {item.time}
                    </span>

                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">

                    <MapPin size={14} />

                    {item.location}

                  </div>

                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full ${badgeStyles[item.badgeColor]}`}
                  >
                    {item.badge}
                  </span>

                </div>

              </div>

            </div>

          ))}

        </div>

        {/* Button */}

        <div className="text-center mt-14">

          <button className="px-6 py-3 rounded-xl bg-green-700 text-white font-medium hover:bg-green-800 transition">
            Voir toute l'activité
          </button>

        </div>

      </div>

    </section>
  )
}