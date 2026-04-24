"use client"

import { motion } from "framer-motion"
import { Clock, Users, MapPin, Trash2 } from "lucide-react"

const stats = [
  {
    icon: Clock,
    value: "< 24h",
    label: "Temps de réaction",
    description: "Entre signalement et collecte",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: Users,
    value: "50+",
    label: "Jeunes collecteurs",
    description: "Emplois verts créés",
    color: "text-secondary",
    bgColor: "bg-secondary/10",
  },
  {
    icon: MapPin,
    value: "-40%",
    label: "Zones insalubres",
    description: "Réduction en 6 mois",
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
  {
    icon: Trash2,
    value: "100+",
    label: "Points noirs",
    description: "Cartographiés en temps réel",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
]

export function ImpactStats() {
  return (
    <section className="py-16 bg-card">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center p-6 rounded-2xl bg-background border border-border hover:border-primary/30 transition-colors"
            >
              <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl ${stat.bgColor} mb-4`}>
                <stat.icon className={`w-7 h-7 ${stat.color}`} />
              </div>
              <div className={`text-3xl md:text-4xl font-bold ${stat.color} mb-1`}>
                {stat.value}
              </div>
              <div className="font-semibold text-foreground mb-1">{stat.label}</div>
              <div className="text-sm text-muted-foreground">{stat.description}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
