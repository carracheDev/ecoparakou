"use client"

import Image from 'next/image'
import { useState } from 'react'

const missionsData: Record<string, {
  title: string
  zone: string
  date: string
  priority: string
  description: string
  type: string
  need: string
  image: string
  impact: string
}> = {
  "1": {
    title: "Nettoyage Ladji Farani",
    zone: "Quartier Ladji Farani, Zone C",
    date: "12 Oct 2023",
    priority: "Priorité Haute",
    description: "Dépôt sauvage de plastique et de déchets ménagers obstruant partiellement le passage près de l'école primaire. La zone nécessite une intervention urgente pour éviter l'insalubrité avant les prochaines pluies. Volume estimé : 3m³.",
    type: "Plastique",
    need: "Benne-tasseuse",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDiDF9DJ7UFIaGqdpkEfdSxp6mlU8Mzjrsmlf83Xd7zdLlZFHpS1Xp8MK6HVBVpvX06fFr12eR0bUbVShSI_aPhLPnNjJt188Z4A5nLTGvUP4Ebv0hkuajRKKvTH027bPB2AxwrmLbqC5TH7sPPpPeiUL5ozloULveqIpjvwokasrisMXeh3CtN4rhIHGEZNcBNv2FMczpTWuBpl5cHVvtIsQDZiYd3wziPkmueUtW9Yq66tSgsIv739YeEOxM2PeIc2G8Drtlv6VE",
    impact: "Réduction de 250kg de CO2 équivalent en traitant ces déchets.",
  },
  "2": {
    title: "Collecte Banikanni",
    zone: "Quartier Banikanni, Zone Marché",
    date: "15 Oct 2023",
    priority: "En cours",
    description: "Déchets organiques provenant du marché local. Collecte régulière nécessaire pour maintenir l'hygiène de la zone commerciale. Intervention planifiée avec les commerçants.",
    type: "Organique",
    need: "Camion-benne",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBlBYkkXtYZcf53QgpmuDJESJo3GcMbkMvyMsucHAGsDcfKQH1Yf8zw8LUSYpxfHezrm38NQirNz-g-ElqQamJuxMNkVAfQ6iB5of-HYPfUPvWu3Xou1JT_HV6V_6WWVrnEtWrk3a5LYpMO0aK-7cMfGa_iucHx3oN8s7NcRiD5IjyP8ksj6hY87NjfkFmGCsN-nWk2B8cP5N2YsvoyuVRNAEZpSIUmxBoZCiRSzgTv-dwgIChfyzDelzq-jra5g5jP9b6jd1PF6TY",
    impact: "Réduction de 180kg de CO2 équivalent en traitant ces déchets.",
  },
  "3": {
    title: "Assainissement Albarika",
    zone: "Quartier Albarika, Zone Universitaire",
    date: "10 Oct 2023",
    priority: "Terminé",
    description: "Mission de nettoyage complète de la zone universitaire. Collecte mixte effectuée avec succès. Zone maintenant propre et entretenue.",
    type: "Mixte",
    need: "Équipe manuelle",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCnqwWJFx1fPG-yaXR_nCyDejpwIttw6CzhjGN30c9Wc7-rvPzmHAehf_CHplUUaf0HxwzVd9CsABZ8BaipK4944sqday8_Y6S5upNLVv60qvrXuMuWPzAuU_I-Jqq90_oXB6LVYWCS9d_pa5LbmB2eGlftgJk2ug-JwjerausHBj7fGA-LPnn06urQqMcVqBN9MUlYgOFyeGyhSXeXD97VIlnFUd-IRXWXafPBWX8QeC2RXwlKyy2_fJ7dnZ0ex20upOvHqjinU7o",
    impact: "Réduction de 320kg de CO2 équivalent grâce à cette intervention.",
  },
}

// Default mission for unknown IDs
const defaultMission = {
  title: "Mission EcoParakou",
  zone: "Parakou",
  date: "2023",
  priority: "En attente",
  description: "Une nouvelle mission de nettoyage à Parakou. Détails en cours de confirmation.",
  type: "Mixte",
  need: "À déterminer",
  image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDiDF9DJ7UFIaGqdpkEfdSxp6mlU8Mzjrsmlf83Xd7zdLlZFHpS1Xp8MK6HVBVpvX06fFr12eR0bUbVShSI_aPhLPnNjJt188Z4A5nLTGvUP4Ebv0hkuajRKKvTH027bPB2AxwrmLbqC5TH7sPPpPeiUL5ozloULveqIpjvwokasrisMXeh3CtN4rhIHGEZNcBNv2FMczpTWuBpl5cHVvtIsQDZiYd3wziPkmueUtW9Yq66tSgsIv739YeEOxM2PeIc2G8Drtlv6VE",
  impact: "Impact environnemental positif estimé.",
}

export function MissionDetail({ id }: { id: string }) {
  const mission = missionsData[id] || defaultMission
  const [isAccepted, setIsAccepted] = useState(false)

  const handleAccept = () => {
    setIsAccepted(true)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
      {/* Left Column: Image & Map */}
      <div className="lg:col-span-7 space-y-6">
        <div className="overflow-hidden rounded-xl border border-outline-variant bg-surface-container-low aspect-video">
          <Image 
            src={mission.image}
            alt={mission.title}
            width={800}
            height={450}
            className="w-full h-full object-cover"
            priority
          />
        </div>
        {/* Map Placeholder */}
        <div className="rounded-xl border border-outline-variant overflow-hidden h-[300px] relative">
          <Image 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAaXetLs8xK4Hi6VGspig4wo8o0-LHXyZpJSDURCKn79-NsSSVKcb6W47JtPMGxrqqRuoT7RhzlvVjrfAvvlgJNbtqwWZRtubhNsypy7b4uNqSQMLAIVXNvJOQm3xDJGNFcVYg8aS4WRwdbk6Lf_QqrHlB5D2PezTNr2eiGr-z0HvTQIOd-rWjeyUe_apJCa_FFezipai3p2XYxUHF2BX58-7i8oG6K1yHqUoSgiZ_nKfjc6nqkzaXprIBaoMSdtVw-zo9D91NbzjA"
            alt="Carte de localisation"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/5 flex items-center justify-center">
            <div className="bg-white/90 px-4 py-2 rounded-full shadow-md flex items-center gap-2">
              <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>location_on</span>
              <span className="font-semibold text-on-surface">{mission.zone.split(',')[0]}, Parakou</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Mission Details */}
      <div className="lg:col-span-5 space-y-6">
        <div className="bg-surface border border-outline-variant rounded-xl p-6">
          <div className="flex justify-between items-start mb-3">
            <span className={`px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider ${
              mission.priority === 'Priorité Haute' 
                ? 'bg-error-container text-on-error-container' 
                : mission.priority === 'En cours'
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-primary-fixed text-on-primary-fixed-variant'
            }`}>
              {mission.priority}
            </span>
            <div className="flex items-center text-on-surface-variant text-xs font-medium">
              <span className="material-symbols-outlined text-base mr-1">event</span>
              {mission.date}
            </div>
          </div>
          <h1 className="text-2xl font-semibold text-primary mb-1">{mission.title}</h1>
          <div className="flex items-center text-surface-tint font-semibold text-sm mb-6">
            <span className="material-symbols-outlined mr-1 text-xl">location_city</span>
            {mission.zone}
          </div>

          <div className="space-y-6 border-t border-outline-variant pt-6">
            <div>
              <h3 className="text-xs font-semibold text-on-surface-variant uppercase mb-1">Description de la mission</h3>
              <p className="text-base text-on-surface leading-relaxed">
                {mission.description}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-3 bg-surface-container-low rounded-lg border border-outline-variant">
                <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>recycling</span>
                <div>
                  <p className="text-xs text-on-surface-variant">Type</p>
                  <p className="text-sm font-semibold text-on-surface">{mission.type}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-surface-container-low rounded-lg border border-outline-variant">
                <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>local_shipping</span>
                <div>
                  <p className="text-xs text-on-surface-variant">Besoin</p>
                  <p className="text-sm font-semibold text-on-surface">{mission.need}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3">
            {isAccepted ? (
              <div className="w-full bg-primary-fixed text-primary font-semibold text-lg py-4 rounded-xl flex items-center justify-center gap-2">
                <span className="material-symbols-outlined">check_circle</span>
                Mission acceptée
              </div>
            ) : (
              <button 
                onClick={handleAccept}
                className="w-full bg-secondary-container text-on-secondary-container font-semibold text-lg py-4 rounded-xl active:scale-95 transition-transform flex items-center justify-center gap-2 shadow-sm hover:shadow-md"
              >
                <span className="material-symbols-outlined">task_alt</span>
                Accepter la mission
              </button>
            )}
            <button className="w-full bg-transparent border-2 border-primary text-primary font-semibold text-lg py-4 rounded-xl active:scale-95 transition-transform hover:bg-primary-fixed/10">
              Contacter le signalant
            </button>
          </div>
        </div>

        {/* Mission Statistics Card */}
        <div className="bg-primary-container p-6 rounded-xl text-white">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-3 rounded-full">
              <span className="material-symbols-outlined text-2xl">eco</span>
            </div>
            <div>
              <h4 className="text-xl font-semibold">Impact Environnemental</h4>
              <p className="text-base opacity-90">{mission.impact}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
