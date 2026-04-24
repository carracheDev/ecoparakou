"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { AuthModal } from './auth-modal'

export function Navbar() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [authTab, setAuthTab] = useState<'login' | 'register'>('login')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState<{ name: string; email: string } | null>(null)
  const [showDropdown, setShowDropdown] = useState(false)

  const navLinks = [
    { href: '/', label: 'Accueil' },
    { href: '/missions', label: 'Missions' },
    { href: '/signaler', label: 'Signaler' },
    { href: '/impact', label: 'Impact' },
  ]

  const openModal = (tab: 'login' | 'register') => {
    setAuthTab(tab)
    setShowAuthModal(true)
  }

  const handleLogin = (user: { name: string; email: string }) => {
    setCurrentUser(user)
    setIsLoggedIn(true)
    setShowAuthModal(false)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setCurrentUser(null)
    setShowDropdown(false)
  }

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
  }

  return (
    <>
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 backdrop-blur-sm">
        <div className="flex justify-between items-center w-full px-6 py-3 max-w-7xl mx-auto">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="material-symbols-outlined text-primary-fixed text-lg">eco</span>
            </div>
            <span className="text-xl font-bold tracking-tight text-green-900">EcoParakou</span>
          </Link>

          {/* Nav links - Desktop */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? 'text-green-800 border-b-2 border-green-800 font-semibold pb-1'
                    : 'text-gray-600 hover:text-green-700'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Auth zone */}
          <div className="flex items-center gap-3">
            {!isLoggedIn ? (
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => openModal('login')}
                  className="hidden md:block border border-primary text-primary px-4 py-1.5 rounded-lg text-sm font-semibold hover:bg-primary hover:text-white transition-colors whitespace-nowrap"
                >
                  Se connecter
                </button>
                <button 
                  onClick={() => openModal('register')}
                  className="bg-primary text-white px-4 py-1.5 rounded-lg text-sm font-semibold hover:bg-primary-container transition-colors whitespace-nowrap"
                >
                  {"S'inscrire"}
                </button>
              </div>
            ) : (
              <div className="relative">
                <button 
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="w-9 h-9 rounded-full bg-primary-container text-primary-fixed flex items-center justify-center font-bold text-sm cursor-pointer border-2 border-primary-fixed-dim hover:scale-105 transition-transform"
                >
                  {currentUser ? getInitials(currentUser.name) : 'U'}
                </button>
                {showDropdown && (
                  <div className="absolute top-full right-0 mt-2 bg-white border border-outline-variant rounded-xl min-w-[180px] shadow-lg animate-slide-down z-50">
                    <div className="px-4 py-3 border-b border-outline-variant">
                      <p className="text-sm font-bold text-primary">{currentUser?.name}</p>
                      <p className="text-xs text-outline">{currentUser?.email}</p>
                    </div>
                    <Link href="#" className="flex items-center gap-2 px-4 py-2.5 text-sm text-on-surface hover:bg-surface-container-low">
                      <span className="material-symbols-outlined text-base text-outline">person</span>
                      Mon profil
                    </Link>
                    <Link href="/missions" className="flex items-center gap-2 px-4 py-2.5 text-sm text-on-surface hover:bg-surface-container-low">
                      <span className="material-symbols-outlined text-base text-outline">assignment</span>
                      Mes missions
                    </Link>
                    <Link href="#" className="flex items-center gap-2 px-4 py-2.5 text-sm text-on-surface hover:bg-surface-container-low">
                      <span className="material-symbols-outlined text-base text-outline">bar_chart</span>
                      Mon impact
                    </Link>
                    <div className="border-t border-outline-variant my-1" />
                    <button 
                      onClick={handleLogout}
                      className="flex items-center gap-2 px-4 py-2.5 text-sm text-error hover:bg-surface-container-low w-full"
                    >
                      <span className="material-symbols-outlined text-base">logout</span>
                      Déconnexion
                    </button>
                  </div>
                )}
              </div>
            )}
            
            {/* Mobile menu button */}
            <button 
              className="md:hidden text-gray-600"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="material-symbols-outlined">{isMenuOpen ? 'close' : 'menu'}</span>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <nav className="flex flex-col p-4 gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${
                    pathname === link.href
                      ? 'bg-primary-fixed text-primary font-semibold'
                      : 'text-gray-600 hover:bg-surface-container-low'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>

      <AuthModal 
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        defaultTab={authTab}
        onLogin={handleLogin}
      />
    </>
  )
}
