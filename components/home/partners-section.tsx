"use client"

import { useEffect, useRef } from 'react'

const partners = [
  { name: "Mairie de Parakou", emoji: "🏛️" },
  { name: "NGO GreenAfrica", emoji: "🌍" },
  { name: "Bank of Benin", emoji: "🏦" },
  { name: "Soneb", emoji: "💧" },
  { name: "LogisTrans", emoji: "🚛" },
  { name: "Mairie de Parakou", emoji: "🏛️" },
  { name: "NGO GreenAfrica", emoji: "🌍" },
  { name: "Bank of Benin", emoji: "🏦" },
  { name: "Soneb", emoji: "💧" },
  { name: "LogisTrans", emoji: "🚛" },
]

export function PartnersSection() {
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    let animationId: number
    let position = 0
    const speed = 0.5

    const animate = () => {
      position -= speed
      const halfWidth = track.scrollWidth / 2
      if (Math.abs(position) >= halfWidth) {
        position = 0
      }
      track.style.transform = `translateX(${position}px)`
      animationId = requestAnimationFrame(animate)
    }

    animationId = requestAnimationFrame(animate)

    const handleMouseEnter = () => cancelAnimationFrame(animationId)
    const handleMouseLeave = () => { animationId = requestAnimationFrame(animate) }

    track.addEventListener('mouseenter', handleMouseEnter)
    track.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      cancelAnimationFrame(animationId)
      track.removeEventListener('mouseenter', handleMouseEnter)
      track.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 text-center mb-12">
        <span className="inline-block bg-[#e8f5e9] text-[#00450d] text-[10px] font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-3">
          Ils nous font confiance
        </span>
        <h2 className="text-3xl font-semibold text-primary">Partenaires et sponsors</h2>
      </div>

      {/* Carousel */}
      <div className="relative w-full overflow-hidden">
        {/* Gradient gauche */}
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-white to-transparent pointer-events-none" />
        {/* Gradient droite */}
        <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-white to-transparent pointer-events-none" />

        <div ref={trackRef} className="flex gap-5 w-max">
          {partners.map((partner, i) => (
            <div
              key={i}
              className="flex items-center gap-3 bg-white border border-gray-100 shadow-sm hover:shadow-md hover:border-green-200 transition-all duration-300 rounded-2xl px-6 py-4 min-w-[200px] cursor-default group"
            >
              <span className="text-2xl">{partner.emoji}</span>
              <span className="font-semibold text-gray-600 group-hover:text-green-700 transition-colors text-sm whitespace-nowrap">
                {partner.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}