'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'

const graviteConfig = {
  LEGER: { color: 'bg-green-100 text-green-800', label: '🟢 Léger', points: 50 },
  MODERE: { color: 'bg-orange-100 text-orange-800', label: '🟠 Modéré', points: 75 },
  CRITIQUE: { color: 'bg-red-100 text-red-800', label: '🔴 Critique - Urgent !', points: 100 },
}

function MiniMap({ latitude, longitude, adresse }: { latitude: number; longitude: number; adresse?: string }) {
  useEffect(() => {
    let map: any = null
    const init = async () => {
      const L = (await import('leaflet')).default
      await import('leaflet/dist/leaflet.css')
      const container = document.getElementById('mission-map')
      if (!container) return
      // @ts-ignore
      if (container._leaflet_id) return
      map = L.map('mission-map').setView([latitude, longitude], 16)
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap',
      }).addTo(map)
      const icon = L.divIcon({
        html: `<div style="background:#ef4444;width:24px;height:24px;border-radius:50%;border:4px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.4);"></div>`,
        className: '',
        iconSize: [24, 24],
        iconAnchor: [12, 12],
      })
      L.marker([latitude, longitude], { icon })
        .addTo(map)
        .bindPopup(`<strong>📍 ${adresse || 'Zone signalée'}</strong>`)
        .openPopup()
    }
    init()
    return () => { if (map) map.remove() }
  }, [latitude, longitude])

  return (
    <div
      id="mission-map"
      style={{ height: '300px', width: '100%', borderRadius: '12px', zIndex: 0 }}
    />
  )
}

export function MissionDetail({ id }: { id: string }) {
  const [mission, setMission] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [isAccepted, setIsAccepted] = useState(false)
  const [isAccepting, setIsAccepting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch(`/api/missions/${id}`)
      .then(r => {
        if (!r.ok) {
          throw new Error('Mission introuvable')
        }
        return r.json()
      })
      .then(data => {
        setMission(data)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message || 'Erreur lors du chargement')
        setLoading(false)
      })
  }, [id])

  const handleAccept = async () => {
    setIsAccepting(true)
    setError(null)
    try {
      const token = localStorage.getItem('token')
      const user = JSON.parse(localStorage.getItem('user') || '{}')

      if (!token) {
        setError('Connectez-vous pour accepter une mission')
        setIsAccepting(false)
        return
      }

      if (user.role !== 'COLLECTEUR') {
        setError('Seuls les collecteurs peuvent accepter des missions')
        setIsAccepting(false)
        return
      }

      const res = await fetch(`/api/missions/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          statut: 'EN_COURS',
          collecteurId: user.id,
        }),
      })

      if (!res.ok) throw new Error('Erreur lors de l\'acceptation')
      setIsAccepted(true)
      setMission((prev: any) => ({ ...prev, statut: 'EN_COURS' }))
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsAccepting(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!mission || mission.error || error) {
    return (
      <div className="text-center py-20">
        <p className="text-2xl mb-2">😕</p>
        <p className="text-on-surface-variant">{error || mission?.error || 'Mission introuvable'}</p>
      </div>
    )
  }

  const s = mission.signalement
  const gravite = s?.gravite || 'LEGER'
  const config = graviteConfig[gravite as keyof typeof graviteConfig]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

      {/* Colonne gauche */}
      <div className="lg:col-span-7 space-y-6">

        {/* Analyse IA */}
        {s?.analyseIA && (
          <div className={`p-4 rounded-xl border-2 ${config.color}`}>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xl">🤖</span>
              <span className="font-bold">Analyse IA — {config.label}</span>
            </div>
            <p className="text-sm">{s.analyseIA}</p>
          </div>
        )}

        {/* Carte Leaflet réelle */}
        {s?.latitude && s?.longitude ? (
          <div className="rounded-xl border border-outline-variant overflow-hidden">
            <div className="px-4 py-2 bg-surface-container-low border-b border-outline-variant flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-sm">location_on</span>
              <span className="text-sm font-semibold text-on-surface">
                {s.adresse || 'Position GPS exacte'}
              </span>
              <span className="ml-auto text-xs text-on-surface-variant">
                {s.latitude.toFixed(4)}, {s.longitude.toFixed(4)}
              </span>
            </div>
            <MiniMap
              latitude={s.latitude}
              longitude={s.longitude}
              adresse={s.adresse}
            />
          </div>
        ) : (
          <div className="h-[300px] bg-muted rounded-xl flex items-center justify-center">
            <p className="text-on-surface-variant text-sm">Position GPS non disponible</p>
          </div>
        )}
      </div>

      {/* Colonne droite */}
      <div className="lg:col-span-5 space-y-6">
        <div className="bg-surface border border-outline-variant rounded-xl p-6">

          {/* Header */}
          <div className="flex justify-between items-start mb-3">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${config.color}`}>
              {config.label}
            </span>
            <span className="text-xs text-on-surface-variant">
              {new Date(mission.createdAt).toLocaleDateString('fr-FR')}
            </span>
          </div>

          <h1 className="text-2xl font-bold text-primary mb-1">{mission.titre}</h1>

          {s?.adresse && (
            <div className="flex items-center text-on-surface-variant text-sm mb-4 gap-1">
              <span className="material-symbols-outlined text-base">location_city</span>
              {s.adresse}
            </div>
          )}

          <div className="space-y-4 border-t border-outline-variant pt-4">
            {mission.description && (
              <div>
                <h3 className="text-xs font-semibold text-on-surface-variant uppercase mb-1">
                  Description
                </h3>
                <p className="text-sm text-on-surface leading-relaxed">
                  {mission.description}
                </p>
              </div>
            )}

            {/* Points */}
            <div className="flex items-center gap-3 p-3 bg-amber-50 rounded-lg border border-amber-200">
              <span className="text-2xl">⭐</span>
              <div>
                <p className="text-xs text-amber-700">Récompense</p>
                <p className="text-lg font-bold text-amber-800">{mission.points} points</p>
              </div>
              <div className="ml-auto text-xs text-amber-600 font-medium">
                ≈ Mobile Money
              </div>
            </div>

            {/* Statut */}
            <div className="flex items-center gap-3 p-3 bg-surface-container-low rounded-lg border border-outline-variant">
              <span className="material-symbols-outlined text-primary">info</span>
              <div>
                <p className="text-xs text-on-surface-variant">Statut</p>
                <p className="text-sm font-semibold text-on-surface">
                  {mission.statut === 'DISPONIBLE' ? '✅ Disponible' :
                   mission.statut === 'EN_COURS' ? '🔄 En cours' : '✔️ Terminée'}
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-6 flex flex-col gap-3">
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                ⚠️ {error}
              </div>
            )}

            {isAccepted || mission.statut === 'EN_COURS' ? (
              <div className="w-full bg-primary-fixed text-primary font-semibold text-lg py-4 rounded-xl flex items-center justify-center gap-2">
                <span className="material-symbols-outlined">check_circle</span>
                Mission acceptée !
              </div>
            ) : mission.statut === 'TERMINEE' ? (
              <div className="w-full bg-green-100 text-green-800 font-semibold text-lg py-4 rounded-xl flex items-center justify-center gap-2">
                <span className="material-symbols-outlined">task_alt</span>
                Mission terminée
              </div>
            ) : (
              <button
                onClick={handleAccept}
                disabled={isAccepting}
                className="w-full bg-secondary-container text-on-secondary-container font-semibold text-lg py-4 rounded-xl transition-all hover:shadow-md disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {isAccepting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-current/30 border-t-current rounded-full animate-spin" />
                    Acceptation...
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined">task_alt</span>
                    Accepter la mission
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        {/* Impact */}
        <div className="bg-primary-container p-6 rounded-xl">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-3 rounded-full">
              <span className="material-symbols-outlined text-2xl text-white">eco</span>
            </div>
            <div>
              <h4 className="text-lg font-bold text-white">Impact Environnemental</h4>
              <p className="text-white/90 text-sm">
                {gravite === 'CRITIQUE'
                  ? 'Réduction estimée de 300kg de CO₂ équivalent'
                  : gravite === 'MODERE'
                  ? 'Réduction estimée de 180kg de CO₂ équivalent'
                  : 'Réduction estimée de 80kg de CO₂ équivalent'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}