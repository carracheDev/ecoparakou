"use client"

import { motion } from "framer-motion"
import { Leaf, Heart, Users, TrendingUp } from "lucide-react"

export function ImpactHero() {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/10" />
      
      {/* Floating icons */}
      <motion.div
        className="absolute top-20 left-10 text-primary/20"
        animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
      >
        <Leaf className="w-16 h-16" />
      </motion.div>
      <motion.div
        className="absolute bottom-20 right-10 text-secondary/20"
        animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
      >
        <Heart className="w-20 h-20" />
      </motion.div>
      <motion.div
        className="absolute top-40 right-20 text-accent/20"
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        <Users className="w-12 h-12" />
      </motion.div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm font-medium">Notre Impact Mesurable</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance">
            Transformer Parakou,{" "}
            <span className="text-primary">Une Mission à la Fois</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            De la gestion réactive à la gestion proactive. Découvrez comment Alphonsine 
            crée un impact positif sur l&apos;environnement, l&apos;emploi, la santé et l&apos;économie locale.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
