"use client"

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export function HeroSection() {
  const [stats, setStats] = useState({ zones: 0, citoyens: 0, tonnes: 0 })

  useEffect(() => {
    // Animate counters
    const duration = 2000
    const steps = 60
    const interval = duration / steps
    
    let step = 0
    const timer = setInterval(() => {
      step++
      const progress = step / steps
      setStats({
        zones: Math.floor(1200 * progress),
        citoyens: Math.floor(500 * progress),
        tonnes: Math.floor(12 * progress),
      })
      if (step >= steps) clearInterval(timer)
    }, interval)

    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative overflow-hidden bg-surface py-20 lg:py-28">
      {/* BG decoration */}
      <div className="absolute -top-20 -right-20 w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(172,244,164,0.25)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute -bottom-16 -left-16 w-[300px] h-[300px] bg-[radial-gradient(circle,rgba(253,212,0,0.15)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="z-10">
          <span className="animate-fade-up delay-100 inline-flex items-center gap-2 px-4 py-1.5 mb-6 text-sm font-semibold tracking-wider text-surface-tint bg-primary-fixed rounded-full">
            <span className="live-pulse pl-3.5">En direct</span>
            &nbsp;– Parakou agit maintenant
          </span>
          <h1 className="animate-fade-up delay-200 text-4xl md:text-5xl font-bold text-primary mb-4 leading-tight">
            Gestion des déchets<br />à{' '}
            <span className="text-surface-tint relative">
              Parakou
              <svg className="absolute -bottom-1 left-0 w-full h-1.5" viewBox="0 0 120 6" fill="none">
                <path d="M2 4 Q30 1 60 4 Q90 7 118 3" stroke="#fdd400" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
              </svg>
            </span>
          </h1>
          <p className="animate-fade-up delay-300 text-lg text-on-surface-variant mb-8 max-w-lg">
            Ensemble pour une ville propre et durable. Rejoignez le mouvement citoyen pour transformer notre environnement urbain.
          </p>

          {/* CTA */}
          <div className="animate-fade-up delay-400 flex flex-col sm:flex-row gap-3">
            <Link 
              href="/signaler" 
              className="bg-secondary-container text-on-secondary-container font-semibold px-7 py-3.5 rounded-xl flex items-center justify-center gap-2 active:scale-95 transition-transform shadow-sm hover:shadow-md"
            >
              <span className="material-symbols-outlined">report</span>
              Signaler une zone sale
            </Link>
            <Link 
              href="/missions" 
              className="border-2 border-primary text-primary font-semibold px-7 py-3.5 rounded-xl flex items-center justify-center gap-2 active:scale-95 transition-transform hover:bg-primary-fixed/20"
            >
              <span className="material-symbols-outlined">assignment</span>
              Voir les missions
            </Link>
          </div>

          {/* Mini stats inline */}
          <div className="animate-fade-up delay-500 flex gap-6 mt-8">
            <div>
              <p className="text-2xl font-bold text-primary">{stats.zones}+</p>
              <p className="text-xs text-on-surface-variant">Zones traitées</p>
            </div>
            <div className="w-px bg-outline-variant" />
            <div>
              <p className="text-2xl font-bold text-primary">{stats.citoyens}+</p>
              <p className="text-xs text-on-surface-variant">Citoyens actifs</p>
            </div>
            <div className="w-px bg-outline-variant" />
            <div>
              <p className="text-2xl font-bold text-primary">{stats.tonnes}t</p>
              <p className="text-xs text-on-surface-variant">Collectées ce mois</p>
            </div>
          </div>
        </div>

        {/* Image + badge */}
        <div className="relative animate-fade-in delay-300">
          <div className="relative rounded-3xl overflow-hidden shadow-xl border border-outline-variant">
            <Image 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBfeE1JRpGV0J3HQ2fv8HAaB-PPojrqv1ejOtbDtgqC6J_o4EVD4l7hxGSoEDPFkcbRg44FqZ0j6s0OCpxE_e4vdTBQA984BOwIn8O36INljuFk0IbFP76xV0g8Z11D9wjuCcs6jatUSs1GsMMVtuN763aq9y6BNfSbzmKBy01ne6-hzrdx4ioJAuUN6IJ7eSTjEV2LyeVRu1nJyUrCwBnLsMmbd3qpYobsqH5vzwd-4hTu6p3dMFZKFueeUVw0J7i2XAr37ZtVOng"
              alt="Écologie Urbaine à Parakou"
              width={600}
              height={460}
              className="w-full h-[460px] object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/50 to-transparent" />
            <div className="float-badge absolute bottom-6 left-6 right-6 p-4 bg-white/95 backdrop-blur-sm rounded-xl border border-white/30">
              <div className="flex items-center gap-3">
                <div className="bg-primary p-2 rounded-lg">
                  <span className="material-symbols-outlined text-primary-fixed text-lg">eco</span>
                </div>
                <div>
                  <p className="text-xs font-bold text-primary uppercase tracking-wider">Impact en temps réel</p>
                  <p className="text-sm font-semibold text-on-surface">12 tonnes collectées ce mois-ci</p>
                </div>
                <div className="ml-auto bg-green-100 px-2.5 py-1.5 rounded-lg">
                  <span className="text-sm font-bold text-primary">+18%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
