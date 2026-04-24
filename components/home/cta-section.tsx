"use client"

import { useState } from 'react'
import { AuthModal } from '../auth-modal'

export function CtaSection() {
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [authTab, setAuthTab] = useState<'login' | 'register'>('register')

  const openModal = (tab: 'login' | 'register') => {
    setAuthTab(tab)
    setShowAuthModal(true)
  }

  return (
    <>
      <section className="py-20 bg-primary">
        <div className="max-w-3xl mx-auto px-6 text-center text-white">
          <span className="material-symbols-outlined text-5xl text-primary-fixed mb-4 block">eco</span>
          <h2 className="text-3xl font-bold mb-3">Prêt à agir pour Parakou ?</h2>
          <p className="text-base opacity-80 mb-8">
            Rejoignez plus de 500 citoyens engagés. Ensemble, nous rendons Parakou plus propre chaque jour.
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <button 
              onClick={() => openModal('register')}
              className="bg-secondary-container text-on-secondary-container font-bold px-8 py-3.5 rounded-xl text-sm hover:scale-[1.03] transition-transform"
            >
              Créer mon compte gratuit
            </button>
            <button 
              onClick={() => openModal('login')}
              className="border-2 border-white/40 text-white font-semibold px-8 py-3.5 rounded-xl text-sm hover:border-white transition-colors"
            >
              {"J'ai déjà un compte"}
            </button>
          </div>
        </div>
      </section>

      <AuthModal 
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        defaultTab={authTab}
        onLogin={() => setShowAuthModal(false)}
      />
    </>
  )
}
