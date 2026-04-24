"use client"

import { useEffect, useRef, useState } from 'react'

const fundingSources = [
  {
    icon: "business",
    title: "Modèle de RSE",
    description: "Les entreprises locales parrainent des zones dans le cadre de leur responsabilité sociétale, finançant les équipements de collecte.",
    percentage: 65,
  },
  {
    icon: "account_balance",
    title: "Fonds Municipaux",
    description: "La Mairie de Parakou alloue une partie de son budget d'assainissement pour soutenir l'infrastructure du projet.",
    percentage: 25,
  },
  {
    icon: "handshake",
    title: "Collaborations ONG",
    description: "Des organisations internationales nous accompagnent via des subventions dédiées au développement durable.",
    percentage: 10,
  },
]

export function FundingSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-24 bg-surface-container-low">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-semibold text-primary mb-6">Comment nous sommes financés</h2>
            <div className="space-y-8">
              {fundingSources.map((source, index) => (
                <div key={source.title} className="flex gap-4" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="flex-shrink-0 w-12 h-12 bg-white rounded-full flex items-center justify-center text-primary shadow-sm">
                    <span className="material-symbols-outlined">{source.icon}</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-on-surface mb-1">{source.title}</h4>
                    <p className="text-on-surface-variant text-sm">{source.description}</p>
                    <div className="prog-bar mt-2">
                      <div 
                        className="prog-fill" 
                        style={{ width: isVisible ? `${source.percentage}%` : '0%' }}
                      />
                    </div>
                    <p className="text-xs text-outline mt-1">{source.percentage}% des fonds</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-primary p-10 rounded-[40px] text-white">
            <h3 className="text-2xl font-bold mb-3">Investir dans le futur de Parakou</h3>
            <p className="mb-6 opacity-80 text-sm">Votre entreprise peut faire une différence tangible. Devenez un pilier de la salubrité urbaine.</p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-3 text-sm">
                <span className="material-symbols-outlined text-secondary-container">check_circle</span>
                Visibilité sur la carte interactive
              </li>
              <li className="flex items-center gap-3 text-sm">
                <span className="material-symbols-outlined text-secondary-container">check_circle</span>
                Rapports d&apos;impact trimestriels
              </li>
              <li className="flex items-center gap-3 text-sm">
                <span className="material-symbols-outlined text-secondary-container">check_circle</span>
                Branding sur les bacs de collecte
              </li>
            </ul>
            <button className="w-full bg-secondary-container text-on-secondary-container font-bold py-3.5 rounded-xl hover:opacity-90 transition-opacity">
              Devenir partenaire
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
