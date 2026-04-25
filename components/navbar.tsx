'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { AuthModal } from './auth-modal'
import { Button } from './ui/button'
import Image from 'next/image'

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
    { href: '/about', label: 'À Propos' },
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
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="flex justify-between items-center w-full px-4 md:px-6 py-4 max-w-7xl mx-auto">
          
          {/* LOGO - Professionnel */}
          <Link href="/" className="flex items-center gap-3 flex-shrink-0 group">
            <Image 
              src="/images/logo.png" 
              alt="EcoParakou" 
              width={45} 
              height={45}
              className="w-11 h-11 object-contain group-hover:opacity-80 transition-opacity"
            />
            <div className="hidden sm:flex flex-col">
              <span className="text-lg font-bold tracking-tight">
                <span className="text-green-700">Eco</span>
                <span className="text-amber-500">Parakou</span>
              </span>
              <span className="text-xs text-gray-500">Ville propre, Bénin responsable</span>
            </div>
          </Link>

          {/* NAVIGATION LINKS - Desktop */}
          <nav className="hidden md:flex items-center gap-8 flex-1 justify-center">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors relative ${
                  pathname === link.href
                    ? 'text-green-700 font-semibold'
                    : 'text-gray-600 hover:text-green-700'
                } after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-green-600 after:transition-all after:duration-300 hover:after:w-full ${
                  pathname === link.href ? 'after:w-full' : ''
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* RIGHT SECTION - CTA + Auth */}
          <div className="flex items-center gap-3 md:gap-4">
            
            {/* BOUTON SIGNALER - CTA Principal */}
            {!isLoggedIn && (
              <Link href="/signaler" className="hidden sm:block">
                <Button className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold px-6 py-2 rounded-lg shadow-md hover:shadow-lg transition-all">
                  Signaler
                </Button>
              </Link>
            )}

            {/* AUTH SECTION */}
            {!isLoggedIn ? (
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => openModal('login')}
                  className="hidden md:block border-2 border-green-600 text-green-600 px-4 py-1.5 rounded-lg text-sm font-semibold hover:bg-green-50 transition-colors"
                >
                  Connexion
                </button>
                <button 
                  onClick={() => openModal('register')}
                  className="hidden sm:block bg-green-600 text-white px-4 py-1.5 rounded-lg text-sm font-semibold hover:bg-green-700 transition-colors"
                >
                  Inscription
                </button>
              </div>
            ) : (
              <div className="relative">
                <button 
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-green-600 text-white flex items-center justify-center font-bold text-sm cursor-pointer hover:shadow-md transition-shadow"
                >
                  {currentUser ? getInitials(currentUser.name) : 'U'}
                </button>
                
                {showDropdown && (
                  <div className="absolute top-full right-0 mt-3 bg-white border border-gray-200 rounded-xl min-w-[200px] shadow-lg z-50 overflow-hidden animate-in fade-in">
                    <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
                      <p className="text-sm font-bold text-gray-900">{currentUser?.name}</p>
                      <p className="text-xs text-gray-500">{currentUser?.email}</p>
                    </div>
                    
                    <Link 
                      href="/missions" 
                      onClick={() => setShowDropdown(false)}
                      className="flex items-center gap-2 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <span className="text-base">📋</span>
                      Mes missions
                    </Link>
                    
                    <Link 
                      href="#" 
                      onClick={() => setShowDropdown(false)}
                      className="flex items-center gap-2 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <span className="text-base">⭐</span>
                      Mon impact
                    </Link>
                    
                    <button 
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors border-t border-gray-100"
                    >
                      <span className="text-base">🚪</span>
                      Déconnexion
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* MENU MOBILE */}
            <button 
              className="md:hidden p-2 text-gray-600 hover:text-green-600 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <nav className="flex flex-col p-4 gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    pathname === link.href
                      ? 'bg-green-50 text-green-700 font-semibold'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              
              <Link 
                href="/signaler"
                onClick={() => setIsMenuOpen(false)}
                className="px-4 py-3 rounded-lg text-sm font-semibold bg-green-600 text-white hover:bg-green-700 transition-colors"
              >
                📍 Signaler une zone
              </Link>

              {!isLoggedIn && (
                <div className="flex gap-2 pt-2">
                  <button 
                    onClick={() => {
                      openModal('login')
                      setIsMenuOpen(false)
                    }}
                    className="flex-1 border-2 border-green-600 text-green-600 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-green-50 transition-colors"
                  >
                    Connexion
                  </button>
                  <button 
                    onClick={() => {
                      openModal('register')
                      setIsMenuOpen(false)
                    }}
                    className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-green-700 transition-colors"
                  >
                    Inscription
                  </button>
                </div>
              )}
            </nav>
          </div>
        )}
      </header>

      {/* AUTH MODAL */}
      <AuthModal 
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        defaultTab={authTab}
        onLogin={handleLogin}
      />
    </>
  )
}