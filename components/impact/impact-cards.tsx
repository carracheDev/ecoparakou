"use client"

import { motion } from "framer-motion"
import { Leaf, Users, Heart, TrendingUp, CheckCircle2 } from "lucide-react"

const impactAreas = [
  {
    id: "environnement",
    icon: Leaf,
    title: "Impact Environnemental",
    subtitle: "La Propreté",
    color: "from-green-500 to-emerald-600",
    iconBg: "bg-green-500/10",
    iconColor: "text-green-500",
    description: "Passer d'une gestion réactive à une gestion proactive des déchets pour une ville plus propre.",
    points: [
      {
        title: "Réduction des dépôts sauvages",
        detail: "Objectif de -40% de zones insalubres dès les 6 premiers mois",
      },
      {
        title: "Rapidité d'intervention",
        detail: "Passer de plusieurs jours à moins de 24h entre signalement et collecte",
      },
      {
        title: "Cartographie en temps réel",
        detail: "Première carte dynamique des points noirs de la ville pour la municipalité",
      },
    ],
  },
  {
    id: "social",
    icon: Users,
    title: "Impact Social & Emploi",
    subtitle: "La Jeunesse",
    color: "from-blue-500 to-indigo-600",
    iconBg: "bg-blue-500/10",
    iconColor: "text-blue-500",
    description: "Créer des opportunités pour les jeunes tout en valorisant un métier essentiel.",
    points: [
      {
        title: "Création d'emplois verts",
        detail: "Permettre à des dizaines de jeunes de générer un revenu via les missions de collecte",
      },
      {
        title: "Valorisation du métier",
        detail: "Transformer le 'ramasseur d'ordures' en 'Collecteur de Proximité' certifié",
      },
      {
        title: "Insertion numérique",
        detail: "Former des jeunes à l'utilisation d'outils digitaux pour une mission citoyenne",
      },
    ],
  },
  {
    id: "sante",
    icon: Heart,
    title: "Impact Civique & Sanitaire",
    subtitle: "La Santé",
    color: "from-red-500 to-pink-600",
    iconBg: "bg-red-500/10",
    iconColor: "text-red-500",
    description: "Améliorer la santé publique et engager les citoyens dans la préservation de leur environnement.",
    points: [
      {
        title: "Réduction des maladies",
        detail: "Moins d'ordures stagnantes = moins de moustiques (paludisme) et maladies hydriques",
      },
      {
        title: "Engagement citoyen",
        detail: "Transformer l'habitant passif en 'sentinelle de la ville' responsable",
      },
      {
        title: "Éducation environnementale",
        detail: "Notifications avec conseils sur le tri et la gestion des déchets à domicile",
      },
    ],
  },
  {
    id: "economie",
    icon: TrendingUp,
    title: "Impact Économique",
    subtitle: "Le Modèle Circulaire",
    color: "from-amber-500 to-orange-600",
    iconBg: "bg-amber-500/10",
    iconColor: "text-amber-500",
    description: "Un modèle économique vertueux qui profite à tous les acteurs de la chaîne.",
    points: [
      {
        title: "Gain pour la Mairie",
        detail: "Réduction des coûts logistiques grâce à l'optimisation des trajets des camions",
      },
      {
        title: "Récompenses (Incentives)",
        detail: "Injection d'argent dans l'économie locale via crédits Mobile Money",
      },
      {
        title: "Économie circulaire",
        detail: "Valorisation des déchets collectés pour créer de nouvelles ressources",
      },
    ],
  },
]

export function ImpactCards() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            4 Piliers d&apos;Impact
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Notre approche holistique crée un cercle vertueux entre environnement, 
            emploi, santé et économie locale.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {impactAreas.map((area, index) => (
            <motion.div
              key={area.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="group relative bg-card rounded-3xl border border-border overflow-hidden hover:border-primary/30 transition-all duration-300"
            >
              {/* Header gradient */}
              <div className={`h-2 bg-gradient-to-r ${area.color}`} />
              
              <div className="p-8">
                {/* Icon and title */}
                <div className="flex items-start gap-4 mb-6">
                  <div className={`flex-shrink-0 w-14 h-14 rounded-2xl ${area.iconBg} flex items-center justify-center`}>
                    <area.icon className={`w-7 h-7 ${area.iconColor}`} />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-muted-foreground mb-1">
                      {area.subtitle}
                    </div>
                    <h3 className="text-xl font-bold text-foreground">
                      {area.title}
                    </h3>
                  </div>
                </div>

                <p className="text-muted-foreground mb-6">
                  {area.description}
                </p>

                {/* Points */}
                <div className="space-y-4">
                  {area.points.map((point, pointIndex) => (
                    <motion.div
                      key={pointIndex}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.15 + pointIndex * 0.1 }}
                      className="flex gap-3"
                    >
                      <CheckCircle2 className={`w-5 h-5 ${area.iconColor} flex-shrink-0 mt-0.5`} />
                      <div>
                        <div className="font-medium text-foreground">
                          {point.title}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {point.detail}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
