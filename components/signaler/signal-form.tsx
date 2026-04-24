"use client"

import { useState } from 'react'
import Image from 'next/image'

export function SignalForm() {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    description: '',
  })
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({ name: '', location: '', description: '' })
      setSelectedFile(null)
    }, 3000)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0])
    }
  }

  if (isSubmitted) {
    return (
      <section className="bg-surface-container-lowest p-6 lg:p-10 rounded-xl border border-outline-variant shadow-sm text-center">
        <div className="w-20 h-20 bg-primary-fixed rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="material-symbols-outlined text-4xl text-primary">check_circle</span>
        </div>
        <h2 className="text-2xl font-bold text-primary mb-3">Signalement envoyé !</h2>
        <p className="text-on-surface-variant">
          Merci pour votre contribution. Nos équipes ont été notifiées et interviendront dans les meilleurs délais.
        </p>
      </section>
    )
  }

  return (
    <section className="bg-surface-container-lowest p-6 lg:p-10 rounded-xl border border-outline-variant shadow-sm">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name Field */}
        <div className="space-y-1">
          <label className="text-sm font-semibold tracking-wide text-on-surface block">Nom complet</label>
          <input 
            type="text"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            placeholder="Entrez votre nom"
            className="w-full bg-surface-container-low border-b-2 border-outline-variant py-4 px-3 text-base form-focus-ring transition-all rounded-t focus:border-primary outline-none"
            required
          />
        </div>

        {/* Location Field */}
        <div className="space-y-1">
          <label className="text-sm font-semibold tracking-wide text-on-surface block">Quartier / Localisation</label>
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-primary">location_on</span>
            <input 
              type="text"
              value={formData.location}
              onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
              placeholder="Ex: Quartier Ladjifarani, face école"
              className="w-full bg-surface-container-low border-b-2 border-outline-variant py-4 pl-12 pr-3 text-base form-focus-ring transition-all rounded-t focus:border-primary outline-none"
              required
            />
          </div>
        </div>

        {/* Description Field */}
        <div className="space-y-1">
          <label className="text-sm font-semibold tracking-wide text-on-surface block">Description du problème</label>
          <textarea 
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Décrivez le type de déchets et l'ampleur du problème..."
            rows={4}
            className="w-full bg-surface-container-low border-b-2 border-outline-variant py-4 px-3 text-base form-focus-ring transition-all rounded-t focus:border-primary outline-none resize-none"
            required
          />
        </div>

        {/* Photo Upload Zone */}
        <div className="space-y-1">
          <label className="text-sm font-semibold tracking-wide text-on-surface block">Photo de la zone</label>
          <label className="group relative cursor-pointer border-2 border-dashed border-outline-variant bg-surface-container-low hover:bg-surface-container hover:border-primary transition-all rounded-xl p-10 text-center block">
            <input 
              type="file" 
              accept="image/*"
              onChange={handleFileChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
            <div className="flex flex-col items-center gap-3">
              <div className="w-16 h-16 rounded-full bg-primary-fixed flex items-center justify-center text-on-primary-fixed">
                <span className="material-symbols-outlined text-4xl">photo_camera</span>
              </div>
              <div className="space-y-1">
                {selectedFile ? (
                  <p className="text-sm font-semibold text-primary">{selectedFile.name}</p>
                ) : (
                  <>
                    <p className="text-sm font-semibold text-on-surface">Cliquez pour ajouter une photo</p>
                    <p className="text-xs text-on-surface-variant">PNG, JPG jusqu&apos;à 10MB</p>
                  </>
                )}
              </div>
            </div>
          </label>
        </div>

        {/* Map Preview Section */}
        <div className="rounded-lg overflow-hidden border border-outline-variant h-40 relative">
          <Image 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBaskCQpm5_bjj9LDGRQmw5Wlr1x6zu3WY2a2pQrI8k5c1UVum-Q7qvhZ5VlkOCLyUl3Ya6MGEl_aChTsLc1QmvNM4wNTWllXZRfQ7-1Dhl5a-9RyAOwmzBIGI-oaGlvoPmyIbI0G6PaqMsHlDGlTVDLXR0ND2dBUIKoPHqrIa2IFmlngya1nMphk5RVFgDuW5DJmh_zJly3IvJ13u7efoCPVmHTnc4tFoyWtyKTqTmu3v-ExE49ZXTFa-6ZPiPzUvqJhnGQz_Z1TI"
            alt="Carte de Parakou"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/5 flex items-center justify-center pointer-events-none">
            <div className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full border border-primary shadow-lg flex items-center gap-1.5">
              <span className="material-symbols-outlined text-primary text-sm">my_location</span>
              <span className="text-xs font-medium">Géolocalisation automatique activée</span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <button 
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-secondary-container text-on-secondary-container font-semibold text-lg py-4 rounded-full shadow-sm hover:shadow-md active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-70"
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
        </div>
      </form>
    </section>
  )
}
