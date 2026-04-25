"use client"

import { useEffect, useRef, useState } from 'react'

const fundingSources = [
  {
    icon: "business",
    title: "Modèle de RSE",
    description: "Les entreprises locales parrainent des zones dans le cadre de leur responsabilité sociétale, finançant les équipements de collecte.",
    percentage: 65,
    color: "from-green-500 to-green-700",
  },
  {
    icon: "account_balance",
    title: "Fonds Municipaux",
    description: "La Mairie de Parakou alloue une partie de son budget d'assainissement pour soutenir l'infrastructure du projet.",
    percentage: 25,
    color: "from-amber-400 to-amber-600",
  },
  {
    icon: "handshake",
    title: "Collaborations ONG",
    description: "Des organisations internationales nous accompagnent via des subventions dédiées au développement durable.",
    percentage: 10,
    color: "from-emerald-400 to-teal-600",
  },
]

const perks = [
  { icon: "map", label: "Visibilité sur la carte interactive" },
  { icon: "analytics", label: "Rapports d'impact trimestriels" },
  { icon: "branding_watermark", label: "Branding sur les bacs de collecte" },
]

export function FundingSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true) },
      { threshold: 0.2 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block bg-[#e8f5e9] text-[#00450d] text-[10px] font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-3">
            Financement
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0d1f0e]">
            Comment nous sommes <span className="text-[#00450d]">financés</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* LEFT — Sources de financement */}
          <div className="space-y-6">
            {fundingSources.map((source, index) => (
              <div
                key={source.title}
                className="bg-gray-50 hover:bg-green-50/50 border border-gray-100 hover:border-green-200 rounded-2xl p-6 transition-all duration-300 group"
              >
                <div className="flex gap-4 items-start">
                  {/* Icône */}
                  <div className="flex-shrink-0 w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm border border-gray-100 group-hover:border-green-200 transition-colors">
                    <span className="material-symbols-outlined text-[#00450d]">{source.icon}</span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-bold text-[#0d1f0e] text-base">{source.title}</h4>
                      <span className="text-2xl font-extrabold text-[#00450d] tabular-nums ml-2">
                        {source.percentage}%
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 leading-relaxed mb-4">{source.description}</p>

                    {/* Progress bar */}
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full bg-gradient-to-r ${source.color} transition-all duration-1000 ease-out`}
                        style={{
                          width: isVisible ? `${source.percentage}%` : '0%',
                          transitionDelay: `${index * 150}ms`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT — CTA Card */}
          <div className="relative bg-[#00450d] rounded-3xl p-8 md:p-10 overflow-hidden">

            {/* Cercles décoratifs */}
            <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-white/5 pointer-events-none" />
            <div className="absolute -bottom-12 -left-8 w-40 h-40 rounded-full bg-white/5 pointer-events-none" />

            <div className="relative z-10">
              {/* Badge */}
              <span className="inline-block bg-white/10 border border-white/20 text-green-300 text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full mb-6">
                Devenez sponsor
              </span>

              <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-3 leading-tight">
                Investir dans le futur <br />de Parakou
              </h3>
              <p className="text-green-300/80 text-sm leading-relaxed mb-8">
                Votre entreprise peut faire une différence tangible. Devenez un pilier de la salubrité urbaine.
              </p>

              {/* Avantages */}
              <ul className="space-y-4 mb-10">
                {perks.map((perk) => (
                  <li key={perk.label} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                      <span className="material-symbols-outlined text-[#fdd400] text-base">{perk.icon}</span>
                    </div>
                    <span className="text-white/90 text-sm font-medium">{perk.label}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <button className="w-full bg-[#fdd400] hover:bg-[#ffe066] text-[#00450d] font-extrabold py-4 rounded-2xl transition-all duration-200 hover:shadow-lg hover:shadow-yellow-500/20 hover:-translate-y-0.5 active:scale-[0.98] text-base">
                Devenir partenaire →
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}