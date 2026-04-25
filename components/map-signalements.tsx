'use client'

import { useEffect, useState } from 'react'

interface Signalement {
  id: string
  titre: string
  description?: string
  latitude: number
  longitude: number
  adresse?: string
  gravite: 'LEGER' | 'MODERE' | 'CRITIQUE'
  statut: string
  analyseIA?: string
  createdAt: string
  user: { nom: string }
}

const graviteColor = {
  LEGER: '#22c55e',
  MODERE: '#f97316',
  CRITIQUE: '#ef4444',
}

const graviteLabel = {
  LEGER: '🟢 Léger',
  MODERE: '🟠 Modéré',
  CRITIQUE: '🔴 Critique',
}

function MapComponent({ signalements }: { signalements: Signalement[] }) {
  useEffect(() => {
    let map: any = null

    const initMap = async () => {
      const L = (await import('leaflet')).default
      await import('leaflet/dist/leaflet.css')

      const container = document.getElementById('map-parakou')
      if (!container) return
      // @ts-ignore
      if (container._leaflet_id) return

      map = L.map('map-parakou', {
        center: [9.3372, 2.6289],
        zoom: 13,
      })

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap',
      }).addTo(map)

      signalements.forEach((s) => {
        const color = graviteColor[s.gravite]
        const icon = L.divIcon({
          html: `<div style="background:${color};width:18px;height:18px;border-radius:50%;border:3px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.4);"></div>`,
          className: '',
          iconSize: [18, 18],
          iconAnchor: [9, 9],
        })

        L.marker([s.latitude, s.longitude], { icon })
          .addTo(map)
          .bindPopup(`
            <div style="min-width:180px;font-family:sans-serif;">
              <strong style="color:${color}">${graviteLabel[s.gravite]}</strong>
              <h3 style="margin:4px 0;font-size:13px;">${s.titre}</h3>
              ${s.adresse ? `<p style="margin:2px 0;color:#666;font-size:11px;">📍 ${s.adresse}</p>` : ''}
              ${s.analyseIA ? `<div style="background:#f0fdf4;padding:5px;border-radius:4px;margin-top:5px;font-size:11px;"><strong>🤖 IA:</strong> ${s.analyseIA}</div>` : ''}
              <p style="margin:4px 0;color:#999;font-size:10px;">Par ${s.user?.nom} • ${new Date(s.createdAt).toLocaleDateString('fr-FR')}</p>
            </div>
          `)
      })
    }

    initMap()

    return () => {
      if (map) map.remove()
    }
  }, [signalements])

  return (
    <div
      id="map-parakou"
      style={{
        height: '400px',
        width: '100%',
        borderRadius: '12px',
        zIndex: 0,
        position: 'relative',
      }}
    />
  )
}

export default function MapSignalements() {
  const [signalements, setSignalements] = useState<Signalement[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/signalements')
      .then((r) => r.json())
      .then((data) => {
        setSignalements(Array.isArray(data) ? data : [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[400px] bg-muted rounded-xl">
        <p className="text-muted-foreground">Chargement de la carte...</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      <div className="flex gap-4 text-sm font-medium">
        <span>🟢 Léger ({signalements.filter((s) => s.gravite === 'LEGER').length})</span>
        <span>🟠 Modéré ({signalements.filter((s) => s.gravite === 'MODERE').length})</span>
        <span>🔴 Critique ({signalements.filter((s) => s.gravite === 'CRITIQUE').length})</span>
      </div>
      <MapComponent signalements={signalements} />
    </div>
  )
}