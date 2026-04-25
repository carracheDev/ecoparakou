"use client"

import { useState } from 'react'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  defaultTab?: 'login' | 'register'
  onLogin: (user: { name: string; email: string; role: string; points: number }) => void
}

export function AuthModal({ isOpen, onClose, defaultTab = 'login', onLogin }: AuthModalProps) {
  const [activeTab, setActiveTab] = useState(defaultTab)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Login
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')

  // Register
  const [registerFirstName, setRegisterFirstName] = useState('')
  const [registerLastName, setRegisterLastName] = useState('')
  const [registerEmail, setRegisterEmail] = useState('')
  const [registerPassword, setRegisterPassword] = useState('')
  const [registerRole, setRegisterRole] = useState<'SIGNALEUR' | 'COLLECTEUR'>('SIGNALEUR')
  const [registerTelephone, setRegisterTelephone] = useState('')
  const [registerQuartier, setRegisterQuartier] = useState('')

  if (!isOpen) return null

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loginEmail, password: loginPassword }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Erreur connexion')

      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))
      onLogin({
        name: data.user.nom,
        email: data.user.email,
        role: data.user.role,
        points: data.user.points,
      })
      onClose()
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nom: `${registerFirstName} ${registerLastName}`.trim(),
          email: registerEmail,
          password: registerPassword,
          role: registerRole,
          telephone: registerTelephone,
          momoNumber: registerTelephone,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Erreur inscription')

      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))
      onLogin({
        name: data.user.nom,
        email: data.user.email,
        role: data.user.role,
        points: data.user.points,
      })
      onClose()
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div
      className="fixed inset-0 bg-black/45 flex items-center justify-center z-[9999] transition-opacity"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-3xl p-8 w-full max-w-[420px] mx-4 shadow-2xl relative max-h-[90vh] overflow-y-auto">

        {/* Tabs */}
        <div className="flex bg-surface-container-low rounded-xl p-1 mb-6">
          <button
            onClick={() => { setActiveTab('login'); setError(null) }}
            className={`flex-1 py-2 text-sm font-semibold text-center rounded-lg transition-all ${
              activeTab === 'login' ? 'bg-primary text-white' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Connexion
          </button>
          <button
            onClick={() => { setActiveTab('register'); setError(null) }}
            className={`flex-1 py-2 text-sm font-semibold text-center rounded-lg transition-all ${
              activeTab === 'register' ? 'bg-primary text-white' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Inscription
          </button>
        </div>

        {/* Erreur globale */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            ⚠️ {error}
          </div>
        )}

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
                  className="w-full px-3 py-2.5 rounded-lg border border-outline-variant bg-surface text-sm outline-none focus:border-primary transition-all"
                  required
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-on-surface-variant block mb-1">Mot de passe</label>
                <input
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3 py-2.5 rounded-lg border border-outline-variant bg-surface text-sm outline-none focus:border-primary transition-all"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-primary text-white py-3 rounded-xl font-bold text-sm mt-1 hover:opacity-90 transition-all disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Connexion...
                  </>
                ) : 'Se connecter'}
              </button>
              <p className="text-center text-sm text-outline">
                Pas encore de compte ?{' '}
                <button type="button" onClick={() => setActiveTab('register')} className="text-primary font-semibold hover:underline">
                  S'inscrire
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
              <p className="text-sm text-outline mt-1">Créez votre compte EcoParakou</p>
            </div>
            <div className="flex flex-col gap-3">

              {/* Rôle */}
              <div>
                <label className="text-xs font-semibold text-on-surface-variant block mb-1">
                  Je suis un(e) *
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setRegisterRole('SIGNALEUR')}
                    className={`py-2.5 rounded-lg border-2 text-sm font-semibold transition-all ${
                      registerRole === 'SIGNALEUR'
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-outline-variant text-gray-500'
                    }`}
                  >
                    📢 Signaleur
                  </button>
                  <button
                    type="button"
                    onClick={() => setRegisterRole('COLLECTEUR')}
                    className={`py-2.5 rounded-lg border-2 text-sm font-semibold transition-all ${
                      registerRole === 'COLLECTEUR'
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-outline-variant text-gray-500'
                    }`}
                  >
                    🚛 Collecteur
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-on-surface-variant block mb-1">Prénom *</label>
                  <input
                    type="text"
                    value={registerFirstName}
                    onChange={(e) => setRegisterFirstName(e.target.value)}
                    placeholder="Jean"
                    className="w-full px-3 py-2.5 rounded-lg border border-outline-variant bg-surface text-sm outline-none focus:border-primary transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-on-surface-variant block mb-1">Nom *</label>
                  <input
                    type="text"
                    value={registerLastName}
                    onChange={(e) => setRegisterLastName(e.target.value)}
                    placeholder="Koffi"
                    className="w-full px-3 py-2.5 rounded-lg border border-outline-variant bg-surface text-sm outline-none focus:border-primary transition-all"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-on-surface-variant block mb-1">Email *</label>
                <input
                  type="email"
                  value={registerEmail}
                  onChange={(e) => setRegisterEmail(e.target.value)}
                  placeholder="votre@email.com"
                  className="w-full px-3 py-2.5 rounded-lg border border-outline-variant bg-surface text-sm outline-none focus:border-primary transition-all"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-on-surface-variant block mb-1">
                  Téléphone / MoMo
                </label>
                <input
                  type="tel"
                  value={registerTelephone}
                  onChange={(e) => setRegisterTelephone(e.target.value)}
                  placeholder="Ex: 97000000"
                  className="w-full px-3 py-2.5 rounded-lg border border-outline-variant bg-surface text-sm outline-none focus:border-primary transition-all"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-on-surface-variant block mb-1">Quartier</label>
                <select
                  value={registerQuartier}
                  onChange={(e) => setRegisterQuartier(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg border border-outline-variant bg-surface text-sm outline-none focus:border-primary transition-all"
                >
                  <option value="">Sélectionner votre quartier</option>
                  <option value="banikanni">Banikanni</option>
                  <option value="zongo">Zongo</option>
                  <option value="madina">Madina</option>
                  <option value="kpebie">Kpébié</option>
                  <option value="albarika">Albarika</option>
                  <option value="deke">Dèkè</option>
                  <option value="ladjifarani">Ladjifarani</option>
                  <option value="titirou">Titirou</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-on-surface-variant block mb-1">Mot de passe *</label>
                <input
                  type="password"
                  value={registerPassword}
                  onChange={(e) => setRegisterPassword(e.target.value)}
                  placeholder="Min. 8 caractères"
                  className="w-full px-3 py-2.5 rounded-lg border border-outline-variant bg-surface text-sm outline-none focus:border-primary transition-all"
                  required
                  minLength={8}
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-primary text-white py-3 rounded-xl font-bold text-sm hover:opacity-90 transition-all disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Création du compte...
                  </>
                ) : 'Créer mon compte'}
              </button>

              <p className="text-center text-sm text-outline">
                Déjà un compte ?{' '}
                <button type="button" onClick={() => setActiveTab('login')} className="text-primary font-semibold hover:underline">
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