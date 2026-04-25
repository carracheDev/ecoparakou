"use client"

import { useState } from 'react'

interface AnalyseIA {
  gravite: 'LEGER' | 'MODERE' | 'CRITIQUE'
  description: string
  recommandation: string
  score: number
}

const graviteConfig = {
  LEGER: { color: 'bg-green-100 text-green-800 border-green-300', emoji: '🟢', label: 'Léger' },
  MODERE: { color: 'bg-orange-100 text-orange-800 border-orange-300', emoji: '🟠', label: 'Modéré' },
  CRITIQUE: { color: 'bg-red-100 text-red-800 border-red-300', emoji: '🔴', label: 'Critique - Urgent !' },
}

const parlerAnalyse = (analyse: AnalyseIA) => {
  if (typeof window === 'undefined' || !window.speechSynthesis) return
  window.speechSynthesis.cancel()

  const niveauTexte =
    analyse.gravite === 'CRITIQUE' ? 'Critique. Intervention urgente requise !' :
    analyse.gravite === 'MODERE' ? 'Modéré. Intervention recommandée sous 48 heures.' :
    'Léger. Pas urgent.'

  const texte = `Analyse IA terminée. Niveau de gravité : ${niveauTexte} ${analyse.description}. Recommandation pour les collecteurs : ${analyse.recommandation}`

  const utterance = new SpeechSynthesisUtterance(texte)
  utterance.lang = 'fr-FR'
  utterance.rate = 0.9
  utterance.pitch = 1
  utterance.volume = 1
  window.speechSynthesis.speak(utterance)
}

export function SignalForm() {
  const [formData, setFormData] = useState({
    titre: '',
    adresse: '',
    description: '',
  })
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [analyseIA, setAnalyseIA] = useState<AnalyseIA | null>(null)
  const [isAnalysing, setIsAnalysing] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null)
  const [geoLoading, setGeoLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isSpeaking, setIsSpeaking] = useState(false)

  const getLocation = () => {
    setGeoLoading(true)
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude })
        setGeoLoading(false)
      },
      () => {
        setCoords({ lat: 9.3372, lng: 2.6289 })
        setGeoLoading(false)
      }
    )
  }

  const handleSpeak = (analyse: AnalyseIA) => {
    if (isSpeaking) {
      window.speechSynthesis.cancel()
      setIsSpeaking(false)
      return
    }
    setIsSpeaking(true)
    parlerAnalyse(analyse)
    // Détecte la fin de la parole
    const check = setInterval(() => {
      if (!window.speechSynthesis.speaking) {
        setIsSpeaking(false)
        clearInterval(check)
      }
    }, 500)
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) return
    const file = e.target.files[0]
    setSelectedFile(file)
    setAnalyseIA(null)
    setError(null)
    setIsSpeaking(false)

    const reader = new FileReader()
    reader.onload = (ev) => setImagePreview(ev.target?.result as string)
    reader.readAsDataURL(file)

    setIsAnalysing(true)
    try {
      const base64Reader = new FileReader()
      base64Reader.onload = async (ev) => {
        const base64 = (ev.target?.result as string).split(',')[1]
        const res = await fetch('/api/analyse', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            imageBase64: base64,
            mimeType: file.type,
          }),
        })
        const data = await res.json()
        if (data.gravite) {
          setAnalyseIA(data)
          // Parle automatiquement après analyse
          setTimeout(() => parlerAnalyse(data), 500)
        } else {
          setError("L'IA n'a pas pu analyser cette image")
        }
        setIsAnalysing(false)
      }
      base64Reader.readAsDataURL(file)
    } catch {
      setError("Erreur lors de l'analyse IA")
      setIsAnalysing(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!analyseIA) {
      setError("Veuillez uploader une photo pour l'analyse IA")
      return
    }
    if (!coords) {
      setError('Veuillez activer la géolocalisation')
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      const token = localStorage.getItem('token')

      const res = await fetch('/api/signalements', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          titre: formData.titre,
          description: formData.description,
          adresse: formData.adresse,
          latitude: coords.lat,
          longitude: coords.lng,
          gravite: analyseIA.gravite,
          analyseIA: analyseIA.description,
        }),
      })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error || 'Erreur serveur')
      }

      setIsSubmitted(true)
      // Message vocal de confirmation
      setTimeout(() => {
        const msg = new SpeechSynthesisUtterance(
          'Votre signalement a été envoyé avec succès. Une mission de collecte a été créée automatiquement. Merci pour votre contribution à EcoParakou !'
        )
        msg.lang = 'fr-FR'
        msg.rate = 0.9
        window.speechSynthesis.speak(msg)
      }, 300)

      setTimeout(() => {
        setIsSubmitted(false)
        setFormData({ titre: '', adresse: '', description: '' })
        setSelectedFile(null)
        setImagePreview(null)
        setAnalyseIA(null)
        setCoords(null)
        setIsSpeaking(false)
      }, 5000)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <section className="bg-surface-container-lowest p-6 lg:p-10 rounded-xl border border-outline-variant shadow-sm text-center">
        <div className="w-20 h-20 bg-primary-fixed rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="material-symbols-outlined text-4xl text-primary">check_circle</span>
        </div>
        <h2 className="text-2xl font-bold text-primary mb-3">Signalement envoyé ! 🎉</h2>
        <p className="text-on-surface-variant mb-2">
          Merci pour votre contribution. Une mission de collecte a été créée automatiquement.
        </p>
        {analyseIA && (
          <div className={`inline-block px-4 py-2 rounded-full border text-sm font-semibold mt-2 ${graviteConfig[analyseIA.gravite].color}`}>
            {graviteConfig[analyseIA.gravite].emoji} Gravité : {graviteConfig[analyseIA.gravite].label}
          </div>
        )}
        <div className="mt-4 flex items-center justify-center gap-2 text-primary animate-pulse">
          <span className="material-symbols-outlined">volume_up</span>
          <span className="text-sm font-medium">EcoParakou vous remercie...</span>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-surface-container-lowest p-6 lg:p-10 rounded-xl border border-outline-variant shadow-sm">
      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Titre */}
        <div className="space-y-1">
          <label className="text-sm font-semibold tracking-wide text-on-surface block">
            Titre du signalement *
          </label>
          <input
            type="text"
            value={formData.titre}
            onChange={(e) => setFormData(prev => ({ ...prev, titre: e.target.value }))}
            placeholder="Ex: Dépôt sauvage près du marché Arzèkè"
            className="w-full bg-surface-container-low border-b-2 border-outline-variant py-4 px-3 text-base transition-all rounded-t focus:border-primary outline-none"
            required
          />
        </div>

        {/* Adresse */}
        <div className="space-y-1">
          <label className="text-sm font-semibold tracking-wide text-on-surface block">
            Quartier / Adresse *
          </label>
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-primary">location_on</span>
            <input
              type="text"
              value={formData.adresse}
              onChange={(e) => setFormData(prev => ({ ...prev, adresse: e.target.value }))}
              placeholder="Ex: Quartier Ladjifarani, face école primaire"
              className="w-full bg-surface-container-low border-b-2 border-outline-variant py-4 pl-12 pr-3 text-base transition-all rounded-t focus:border-primary outline-none"
              required
            />
          </div>
        </div>

        {/* Description */}
        <div className="space-y-1">
          <label className="text-sm font-semibold tracking-wide text-on-surface block">
            Description (optionnelle)
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Décrivez la situation..."
            rows={3}
            className="w-full bg-surface-container-low border-b-2 border-outline-variant py-4 px-3 text-base transition-all rounded-t focus:border-primary outline-none resize-none"
          />
        </div>

        {/* Photo Upload + Analyse IA */}
        <div className="space-y-3">
          <label className="text-sm font-semibold tracking-wide text-on-surface block">
            📸 Photo de la zone * —{' '}
            <span className="text-primary font-bold">L'IA analysera automatiquement</span>
          </label>

          <label className="group relative cursor-pointer border-2 border-dashed border-outline-variant bg-surface-container-low hover:bg-surface-container hover:border-primary transition-all rounded-xl p-8 text-center block">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
            {imagePreview ? (
              <img src={imagePreview} alt="Preview" className="max-h-48 mx-auto rounded-lg object-cover" />
            ) : (
              <div className="flex flex-col items-center gap-3">
                <div className="w-16 h-16 rounded-full bg-primary-fixed flex items-center justify-center">
                  <span className="material-symbols-outlined text-4xl text-primary">photo_camera</span>
                </div>
                <p className="text-sm font-semibold text-on-surface">Cliquez pour ajouter une photo</p>
                <p className="text-xs text-on-surface-variant">PNG, JPG jusqu&apos;à 10MB</p>
              </div>
            )}
          </label>

          {/* Loader analyse IA */}
          {isAnalysing && (
            <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl border border-blue-200">
              <div className="w-5 h-5 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
              <p className="text-blue-700 text-sm font-medium">🤖 L'IA analyse votre photo...</p>
            </div>
          )}

          {/* Résultat analyse IA */}
          {analyseIA && (
            <div className={`p-4 rounded-xl border-2 space-y-2 ${graviteConfig[analyseIA.gravite].color}`}>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-2xl">{graviteConfig[analyseIA.gravite].emoji}</span>
                <span className="font-bold text-lg">
                  Gravité : {graviteConfig[analyseIA.gravite].label}
                </span>
                <span className="ml-auto text-sm font-semibold">
                  Score : {analyseIA.score}/100
                </span>
              </div>
              <p className="text-sm"><strong>Analyse :</strong> {analyseIA.description}</p>
              <p className="text-sm"><strong>Recommandation :</strong> {analyseIA.recommandation}</p>

              {/* Bouton écouter */}
              <button
                type="button"
                onClick={() => handleSpeak(analyseIA)}
                className="mt-2 flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 hover:bg-white border border-current font-semibold text-sm transition-all"
              >
                <span className="material-symbols-outlined text-base">
                  {isSpeaking ? 'stop_circle' : 'volume_up'}
                </span>
                {isSpeaking ? 'Arrêter la lecture' : '🔊 Écouter l\'analyse'}
              </button>
            </div>
          )}
        </div>

        {/* Géolocalisation */}
        <div className="space-y-2">
          <label className="text-sm font-semibold tracking-wide text-on-surface block">
            📍 Géolocalisation GPS *
          </label>
          <button
            type="button"
            onClick={getLocation}
            className="w-full border-2 border-primary text-primary font-semibold py-3 rounded-full hover:bg-primary hover:text-white transition-all flex items-center justify-center gap-2"
          >
            {geoLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                Localisation en cours...
              </>
            ) : coords ? (
              <>
                <span className="material-symbols-outlined text-sm">check_circle</span>
                ✅ Position : {coords.lat.toFixed(4)}, {coords.lng.toFixed(4)}
              </>
            ) : (
              <>
                <span className="material-symbols-outlined">my_location</span>
                Activer ma géolocalisation
              </>
            )}
          </button>
        </div>

        {/* Erreur */}
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            ⚠️ {error}
          </div>
        )}

        {/* Submit */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting || !analyseIA || !coords}
            className="w-full bg-secondary-container text-on-secondary-container font-semibold text-lg py-4 rounded-full shadow-sm hover:shadow-md active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-on-secondary-container/30 border-t-on-secondary-container rounded-full animate-spin" />
                Envoi en cours...
              </>
            ) : (
              <>
                <span className="material-symbols-outlined">send</span>
                Envoyer le signalement
              </>
            )}
          </button>
          {(!analyseIA || !coords) && (
            <p className="text-center text-xs text-on-surface-variant mt-2">
              {!analyseIA
                ? "📸 Ajoutez une photo pour activer l'envoi"
                : '📍 Activez la géolocalisation pour continuer'}
            </p>
          )}
        </div>
      </form>
    </section>
  )
}