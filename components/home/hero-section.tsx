'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function HeroSection() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Image de fond */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(/images/fond.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Overlay ombre 60% */}
        <div className="absolute inset-0 bg-black/60 z-10" />
      </div>

      {/* Contenu texte */}
      <div className="relative z-20 text-center text-white px-4 max-w-3xl">
        {/* Label ODD */}
        <div className="text-sm md:text-base font-semibold text-green-300 mb-4 tracking-wider">
          ODD 11 - VILLES DURABLES
        </div>

        {/* Titre principal */}
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          Parakou Propre, Bénin Responsable
        </h1>

        {/* Sous-titre */}
        <p className="text-lg md:text-xl text-gray-200 mb-8">
          Signaler • Collecter • Transformer
        </p>

        {/* Boutons CTA */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/signaler">
            <Button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg text-lg font-semibold">
              Je Signale
            </Button>
          </Link>
          <Button className="bg-white/20 hover:bg-white/30 text-white border-2 border-white px-8 py-3 rounded-lg text-lg font-semibold">
            Je Collecte
          </Button>
        </div>
      </div>
    </section>
  )
}