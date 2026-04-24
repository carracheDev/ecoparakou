"use client"

import { useState } from 'react'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  defaultTab?: 'login' | 'register'
  onLogin: (user: { name: string; email: string }) => void
}

export function AuthModal({ isOpen, onClose, defaultTab = 'login', onLogin }: AuthModalProps) {
  const [activeTab, setActiveTab] = useState(defaultTab)
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [registerFirstName, setRegisterFirstName] = useState('')
  const [registerLastName, setRegisterLastName] = useState('')
  const [registerEmail, setRegisterEmail] = useState('')
  const [registerQuartier, setRegisterQuartier] = useState('')
  const [registerPassword, setRegisterPassword] = useState('')

  if (!isOpen) return null

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    const email = loginEmail || 'demo@ecoparakou.bj'
    const name = email.split('@')[0].replace(/\./g, ' ').replace(/\b\w/g, c => c.toUpperCase())
    onLogin({ name, email })
  }

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()
    const email = registerEmail || 'citoyen@ecoparakou.bj'
    const name = `${registerFirstName || 'Citoyen'} ${registerLastName || ''}`
    onLogin({ name: name.trim(), email })
  }

  const switchTab = (tab: 'login' | 'register') => {
    setActiveTab(tab)
  }

  return (
    <div 
      className="fixed inset-0 bg-black/45 flex items-center justify-center z-[9999] transition-opacity"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-3xl p-8 w-full max-w-[420px] mx-4 shadow-2xl relative">
        {/* Tabs */}
        <div className="flex bg-surface-container-low rounded-xl p-1 mb-6">
          <button 
            onClick={() => switchTab('login')}
            className={`flex-1 py-2 text-sm font-semibold text-center rounded-lg transition-all ${
              activeTab === 'login' 
                ? 'bg-primary text-white' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Connexion
          </button>
          <button 
            onClick={() => switchTab('register')}
            className={`flex-1 py-2 text-sm font-semibold text-center rounded-lg transition-all ${
              activeTab === 'register' 
                ? 'bg-primary text-white' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Inscription
          </button>
        </div>

        {/* Login Form */}
        {activeTab === 'login' && (
          <form onSubmit={handleLogin}>
            <div className="text-center mb-5">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="material-symbols-outlined text-primary">lock</span>
              </div>
              <h2 className="text-xl font-bold text-primary">Content de vous revoir</h2>
              <p className="text-sm text-outline mt-1">Connectez-vous à votre compte EcoParakou</p>
            </div>
            <div className="flex flex-col gap-4">
              <div>
                <label className="text-xs font-semibold text-on-surface-variant block mb-1">Email</label>
                <input 
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="votre@email.com"
                  className="w-full px-3 py-2.5 rounded-lg border border-outline-variant bg-surface text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-on-surface-variant block mb-1">Mot de passe</label>
                <input 
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3 py-2.5 rounded-lg border border-outline-variant bg-surface text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                />
                <div className="text-right mt-1">
                  <a href="#" className="text-xs text-surface-tint font-medium hover:underline">Mot de passe oublié ?</a>
                </div>
              </div>
              <button 
                type="submit"
                className="w-full bg-primary text-white py-3 rounded-xl font-bold text-sm mt-1 hover:bg-primary-container transition-colors"
              >
                Se connecter
              </button>
              <p className="text-center text-sm text-outline">
                Pas encore de compte ?{' '}
                <button type="button" onClick={() => switchTab('register')} className="text-primary font-semibold hover:underline">
                  {"S'inscrire"}
                </button>
              </p>
            </div>
          </form>
        )}

        {/* Register Form */}
        {activeTab === 'register' && (
          <form onSubmit={handleRegister}>
            <div className="text-center mb-5">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="material-symbols-outlined text-primary">eco</span>
              </div>
              <h2 className="text-xl font-bold text-primary">Rejoignez le mouvement</h2>
              <p className="text-sm text-outline mt-1">Créez votre compte citoyen EcoParakou</p>
            </div>
            <div className="flex flex-col gap-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-on-surface-variant block mb-1">Prénom</label>
                  <input 
                    type="text"
                    value={registerFirstName}
                    onChange={(e) => setRegisterFirstName(e.target.value)}
                    placeholder="Jean"
                    className="w-full px-3 py-2.5 rounded-lg border border-outline-variant bg-surface text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-on-surface-variant block mb-1">Nom</label>
                  <input 
                    type="text"
                    value={registerLastName}
                    onChange={(e) => setRegisterLastName(e.target.value)}
                    placeholder="Koffi"
                    className="w-full px-3 py-2.5 rounded-lg border border-outline-variant bg-surface text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-on-surface-variant block mb-1">Email</label>
                <input 
                  type="email"
                  value={registerEmail}
                  onChange={(e) => setRegisterEmail(e.target.value)}
                  placeholder="votre@email.com"
                  className="w-full px-3 py-2.5 rounded-lg border border-outline-variant bg-surface text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-on-surface-variant block mb-1">Quartier à Parakou</label>
                <select 
                  value={registerQuartier}
                  onChange={(e) => setRegisterQuartier(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg border border-outline-variant bg-surface text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                >
                  <option value="">Sélectionner votre quartier</option>
                  <option value="banikanni">Banikanni</option>
                  <option value="zongo">Zongo</option>
                  <option value="madina">Madina</option>
                  <option value="kpebie">Kpébié</option>
                  <option value="albarika">Albarika</option>
                  <option value="deke">Dèkè</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-on-surface-variant block mb-1">Mot de passe</label>
                <input 
                  type="password"
                  value={registerPassword}
                  onChange={(e) => setRegisterPassword(e.target.value)}
                  placeholder="Min. 8 caractères"
                  className="w-full px-3 py-2.5 rounded-lg border border-outline-variant bg-surface text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                />
              </div>
              <button 
                type="submit"
                className="w-full bg-primary text-white py-3 rounded-xl font-bold text-sm hover:bg-primary-container transition-colors"
              >
                Créer mon compte
              </button>
              <p className="text-center text-sm text-outline">
                Déjà un compte ?{' '}
                <button type="button" onClick={() => switchTab('login')} className="text-primary font-semibold hover:underline">
                  Se connecter
                </button>
              </p>
            </div>
          </form>
        )}

        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-outline w-7 h-7 flex items-center justify-center rounded-full hover:bg-surface-container-low transition-colors"
        >
          <span className="material-symbols-outlined text-xl">close</span>
        </button>
      </div>
    </div>
  )
}
