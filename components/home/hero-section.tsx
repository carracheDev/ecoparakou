'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { MapPin } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

// --- Compteur animé ---
function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          const duration = 2000
          const steps = 60
          const increment = target / steps
          let current = 0
          const timer = setInterval(() => {
            current += increment
            if (current >= target) {
              setCount(target)
              clearInterval(timer)
            } else {
              setCount(Math.floor(current))
            }
          }, duration / steps)
        }
      },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target])

  return (
    <div ref={ref} className="text-xl font-extrabold text-white tabular-nums">
      {count.toLocaleString('fr-FR')}{suffix}
    </div>
  )
}

// --- Typing effect ---
function TypingText({ words }: { words: string[] }) {
  const [wordIndex, setWordIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = words[wordIndex]
    let timeout: ReturnType<typeof setTimeout>

    if (!deleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80)
    } else if (!deleting && displayed.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), 2200)
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length - 1)), 45)
    } else if (deleting && displayed.length === 0) {
      setDeleting(false)
      setWordIndex((i) => (i + 1) % words.length)
    }

    return () => clearTimeout(timeout)
  }, [displayed, deleting, wordIndex, words])

  return (
    <span className="text-[#acf4a4]">
      {displayed}
      <span className="animate-pulse">|</span>
    </span>
  )
}

// --- Toast live ---
const liveAlerts = [
  { zone: 'Marché Arzèkè', time: 'il y a 2 min', status: 'Mission assignée ✓' },
  { zone: 'Quartier Banikanni', time: 'il y a 5 min', status: 'Collecte en cours ♻️' },
  { zone: 'Zone Industrielle', time: 'il y a 8 min', status: 'Signalement reçu 📍' },
  { zone: 'Parc Indépendance', time: 'il y a 12 min', status: 'Terminé ✅' },
]

function LiveToast() {
  const [index, setIndex] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setIndex((i) => (i + 1) % liveAlerts.length)
        setVisible(true)
      }, 400)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const alert = liveAlerts[index]

  return (
    <div
      className="absolute bottom-14 right-8 z-20 hidden md:block"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(8px)',
        transition: 'opacity 0.4s ease, transform 0.4s ease',
      }}
    >
      <div className="bg-black/80 backdrop-blur-md border border-[#acf4a4]/30 rounded-xl px-4 py-3 min-w-[210px] shadow-xl">
        <div className="flex items-center gap-2 mb-1">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse flex-shrink-0" />
          <span className="text-[12px] text-white font-semibold">Zone signalée</span>
          <span className="ml-auto text-[10px] text-white/40 bg-white/10 px-1.5 py-0.5 rounded-full">LIVE</span>
        </div>
        <div className="text-[11px] text-white/60 pl-4">{alert.zone} · {alert.time}</div>
        <div className="text-[11px] text-[#acf4a4]/80 pl-4 mt-0.5">{alert.status}</div>
      </div>
    </div>
  )
}

// --- Mini map Parakou ---
function MiniMap() {
  return (
    <div className="absolute top-24 right-8 z-20 hidden lg:block">
      <div className="bg-black/60 backdrop-blur-md border border-white/15 rounded-2xl p-3 w-[160px]">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] text-white/50 font-bold uppercase tracking-wider">Parakou</span>
          <span className="flex items-center gap-1 text-[10px] text-green-400">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            Live
          </span>
        </div>
        {/* SVG carte simplifiée Parakou */}
        <svg viewBox="0 0 140 110" className="w-full rounded-lg overflow-hidden">
          {/* Fond */}
          <rect width="140" height="110" fill="#0a1f0a" rx="6" />
          {/* Grille */}
          {[20,40,60,80,100].map(x => (
            <line key={x} x1={x} y1="0" x2={x} y2="110" stroke="#1a3a1a" strokeWidth="0.5" />
          ))}
          {[20,40,60,80].map(y => (
            <line key={y} x1="0" y1={y} x2="140" y2={y} stroke="#1a3a1a" strokeWidth="0.5" />
          ))}
          {/* Routes principales */}
          <path d="M0 55 Q35 52 70 55 Q105 58 140 55" stroke="#2d5a2d" strokeWidth="2" fill="none" />
          <path d="M70 0 Q68 28 70 55 Q72 80 70 110" stroke="#2d5a2d" strokeWidth="2" fill="none" />
          <path d="M20 20 Q45 38 70 55 Q95 72 120 90" stroke="#1f4a1f" strokeWidth="1" fill="none" />
          <path d="M120 20 Q95 38 70 55 Q45 72 20 90" stroke="#1f4a1f" strokeWidth="1" fill="none" />
          {/* Zones */}
          <circle cx="70" cy="55" r="14" fill="#00450d" opacity="0.4" />
          <circle cx="70" cy="55" r="8" fill="#00450d" opacity="0.6" />
          {/* Points signalements */}
          <circle cx="45" cy="35" r="3" fill="#ef4444" opacity="0.9">
            <animate attributeName="r" values="3;5;3" dur="2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.9;0.4;0.9" dur="2s" repeatCount="indefinite" />
          </circle>
          <circle cx="95" cy="70" r="3" fill="#f59e0b" opacity="0.9">
            <animate attributeName="r" values="3;5;3" dur="2.5s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.9;0.4;0.9" dur="2.5s" repeatCount="indefinite" />
          </circle>
          <circle cx="55" cy="75" r="3" fill="#ef4444" opacity="0.9">
            <animate attributeName="r" values="3;5;3" dur="1.8s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.9;0.4;0.9" dur="1.8s" repeatCount="indefinite" />
          </circle>
          <circle cx="105" cy="35" r="3" fill="#22c55e" opacity="0.9">
            <animate attributeName="r" values="3;5;3" dur="3s" repeatCount="indefinite" />
          </circle>
          <circle cx="30" cy="65" r="3" fill="#22c55e" opacity="0.9">
            <animate attributeName="r" values="3;5;3" dur="2.2s" repeatCount="indefinite" />
          </circle>
          {/* Centre label */}
          <text x="70" y="58" textAnchor="middle" fill="#acf4a4" fontSize="5" fontWeight="bold">Centre</text>
        </svg>
        {/* Légende */}
        <div className="flex items-center justify-between mt-2 px-1">
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-red-500" />
            <span className="text-[9px] text-white/40">En attente</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-green-500" />
            <span className="text-[9px] text-white/40">Terminé</span>
          </div>
        </div>
      </div>
    </div>
  )
}

// --- Scroll indicator ---
function ScrollIndicator() {
  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 hidden md:flex">
      <span className="text-[10px] text-white/30 uppercase tracking-widest">Défiler</span>
      <div className="w-5 h-8 border border-white/20 rounded-full flex items-start justify-center p-1">
        <div
          className="w-1 h-1.5 bg-white/60 rounded-full"
          style={{ animation: 'scrollDot 1.8s ease-in-out infinite' }}
        />
      </div>
      <style>{`
        @keyframes scrollDot {
          0% { transform: translateY(0); opacity: 1; }
          80% { transform: translateY(14px); opacity: 0; }
          100% { transform: translateY(0); opacity: 0; }
        }
      `}</style>
    </div>
  )
}

// --- Hero principal ---
export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">

      {/* Image fond */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/fond.png"
          alt="Collecte de déchets à Parakou"
          className="w-full h-full object-cover object-center"
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(100deg, rgba(0,40,8,0.92) 0%, rgba(0,60,12,0.80) 45%, rgba(0,40,8,0.45) 100%)'
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '28px 28px',
          }}
        />
      </div>

      {/* Mini map */}
      <MiniMap />

      {/* Live toast */}
      <LiveToast />

      {/* Scroll indicator */}
      <ScrollIndicator />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 py-24">
        <div className="max-w-[560px]">

          {/* Badge ODD */}
          <div className="inline-flex items-center gap-2 bg-[#acf4a4]/15 border border-[#acf4a4]/40 text-[#acf4a4] text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full mb-5">
            <span className="w-2 h-1.5 rounded-full bg-[#acf4a4] animate-pulse" />
            ODD 11 — Villes et communautés durables
          </div>

          {/* Titre avec typing effect */}
          <h1 className="text-5xl font-extrabold text-white leading-tight mb-3">
            <TypingText words={[
              'Parakou Propre,',
              'Bénin Vert,',
              'Citoyens Actifs,',
              'Ensemble Propres,',
            ]} />
            <br />
            <span className="text-white">Bénin Responsable</span>
          </h1>

          <p className="text-white/70 text-lg leading-relaxed mb-6 max-w-md">
            La plateforme citoyenne qui transforme la gestion des déchets à Parakou — signalez, mobilisez, mesurez l'impact.
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-7">
            {['📍 Signaler', '♻️ Collecter', '🌱 Transformer', '📊 Mesurer l\'impact'].map((t) => (
              <span key={t} className="text-[13px] text-white/65 border border-white/20 px-3 py-1 rounded-md hover:border-[#acf4a4]/50 hover:text-white/90 transition-colors cursor-default">
                {t}
              </span>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3 mb-9">
            <Link href="/signaler">
              <Button className="bg-[#acf4a4] hover:bg-[#8de085] text-[#00450d] font-bold px-6 py-3 rounded-lg text-sm flex items-center gap-2 shadow-lg shadow-green-900/30 hover:shadow-green-400/20 hover:-translate-y-0.5 transition-all">
                <MapPin size={13} />
                Je Signale une zone
              </Button>
            </Link>
            <Link href="/missions">
              <Button variant="outline" className="border-2 border-white/35 text-white bg-transparent hover:bg-white/10 px-6 py-3 rounded-lg text-sm font-semibold hover:-translate-y-0.5 transition-all">
                Voir les missions →
              </Button>
            </Link>
          </div>

          {/* Stats avec compteurs animés */}
          <div className="flex border-t border-white/12 pt-6">
            {[
              { target: 1240, suffix: '+', label: 'Zones signalées' },
              { target: 87,   suffix: '%', label: 'Taux de collecte' },
              { target: 320,  suffix: ' t', label: 'Déchets collectés' },
            ].map((s, i) => (
              <div key={i} className={`flex-1 ${i > 0 ? 'border-l border-white/12 pl-5' : 'pr-5'}`}>
                <div className="flex items-center gap-1.5 mb-0.5">
                  <AnimatedCounter target={s.target} suffix={s.suffix} />
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                </div>
                <div className="text-[10px] text-white/45 uppercase tracking-widest">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Barre verte bas */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1 z-30"
        style={{ background: 'linear-gradient(90deg, #00450d, #acf4a4, #fdd400, #00450d)' }}
      />
    </section>
  )
}