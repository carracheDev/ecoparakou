"use client"

import { motion } from "framer-motion"
import { Leaf, Users, Heart, TrendingUp, Target, ArrowRight } from "lucide-react"

const kpis = [
  {
    sector: "Environnement",
    icon: Leaf,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
    indicator: "Temps de réaction",
    target: "< 24 heures",
    current: "Plusieurs jours",
    progress: 85,
  },
  {
    sector: "Social",
    icon: Users,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    indicator: "Emplois créés",
    target: "50+ jeunes collecteurs",
    current: "En cours",
    progress: 60,
  },
  {
    sector: "Santé",
    icon: Heart,
    color: "text-red-500",
    bgColor: "bg-red-500/10",
    indicator: "Zones assainies",
    target: "-40% zones à risque",
    current: "Cartographie active",
    progress: 45,
  },
  {
    sector: "Économie",
    icon: TrendingUp,
    color: "text-amber-500",
    bgColor: "bg-amber-500/10",
    indicator: "Économies Mairie",
    target: "-30% coûts logistiques",
    current: "Optimisation trajets",
    progress: 55,
  },
]

export function ImpactTable() {
  return (
    <section className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
            <Target className="w-4 h-4" />
            <span className="text-sm font-medium">Indicateurs Clés (KPIs)</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Suivi de Notre Impact
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Des objectifs mesurables et un suivi transparent de notre progression
          </p>
        </motion.div>

        {/* Desktop Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="hidden md:block overflow-hidden rounded-2xl border border-border bg-background"
        >
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left py-4 px-6 font-semibold text-foreground">Secteur</th>
                <th className="text-left py-4 px-6 font-semibold text-foreground">Indicateur Clé</th>
                <th className="text-left py-4 px-6 font-semibold text-foreground">Situation Actuelle</th>
                <th className="text-left py-4 px-6 font-semibold text-foreground">Objectif Visé</th>
                <th className="text-left py-4 px-6 font-semibold text-foreground">Progression</th>
              </tr>
            </thead>
            <tbody>
              {kpis.map((kpi, index) => (
                <motion.tr
                  key={kpi.sector}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors"
                >
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl ${kpi.bgColor} flex items-center justify-center`}>
                        <kpi.icon className={`w-5 h-5 ${kpi.color}`} />
                      </div>
                      <span className="font-medium text-foreground">{kpi.sector}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-muted-foreground">{kpi.indicator}</td>
                  <td className="py-4 px-6 text-muted-foreground">{kpi.current}</td>
                  <td className="py-4 px-6">
                    <span className={`font-semibold ${kpi.color}`}>{kpi.target}</span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${kpi.progress}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: index * 0.1 }}
                          className={`h-full rounded-full bg-gradient-to-r ${
                            kpi.sector === "Environnement" ? "from-green-500 to-emerald-500" :
                            kpi.sector === "Social" ? "from-blue-500 to-indigo-500" :
                            kpi.sector === "Santé" ? "from-red-500 to-pink-500" :
                            "from-amber-500 to-orange-500"
                          }`}
                        />
                      </div>
                      <span className="text-sm font-medium text-muted-foreground w-12">
                        {kpi.progress}%
                      </span>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-4">
          {kpis.map((kpi, index) => (
            <motion.div
              key={kpi.sector}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-background rounded-2xl border border-border p-5"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-12 h-12 rounded-xl ${kpi.bgColor} flex items-center justify-center`}>
                  <kpi.icon className={`w-6 h-6 ${kpi.color}`} />
                </div>
                <div>
                  <div className="font-semibold text-foreground">{kpi.sector}</div>
                  <div className="text-sm text-muted-foreground">{kpi.indicator}</div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm mb-3">
                <span className="text-muted-foreground">{kpi.current}</span>
                <ArrowRight className="w-4 h-4 text-muted-foreground" />
                <span className={`font-semibold ${kpi.color}`}>{kpi.target}</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${kpi.progress}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    className={`h-full rounded-full bg-gradient-to-r ${
                      kpi.sector === "Environnement" ? "from-green-500 to-emerald-500" :
                      kpi.sector === "Social" ? "from-blue-500 to-indigo-500" :
                      kpi.sector === "Santé" ? "from-red-500 to-pink-500" :
                      "from-amber-500 to-orange-500"
                    }`}
                  />
                </div>
                <span className="text-sm font-medium text-muted-foreground">
                  {kpi.progress}%
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
