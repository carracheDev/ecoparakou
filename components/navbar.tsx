'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { AuthModal } from './auth-modal'
import Image from 'next/image'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

export function Navbar() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [authTab, setAuthTab] = useState<'login' | 'register'>('login')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState<{ name: string; email: string } | null>(null)
  const [showDropdown, setShowDropdown] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => setMounted(true), [])

  const navLinks = [
    { href: '/', label: 'Accueil' },
    { href: '/missions', label: 'Missions' },
    { href: '/signaler', label: 'Signaler' },
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
      <header className="bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50 shadow-sm">
        <div className="flex justify-between items-center w-full px-4 md:px-6 py-3 max-w-7xl mx-auto">

          {/* LOGO */}
         <Link href="/" className="flex items-center gap-3 flex-shrink-0 group">
  <Image
    src="/images/logo.png"
    alt="EcoParakou"
    width={56}
    height={56}
    className="w-14 h-14 object-contain group-hover:opacity-85 transition-opacity"
  />
  <div className="flex flex-col">
    <span className="text-lg md:text-xl font-bold tracking-tight leading-tight">
      <span className="text-green-700">Eco</span>
      <span className="text-amber-500">Parakou</span>
    </span>
    <span className="text-[10px] md:text-xs text-gray-500 dark:text-gray-400 font-medium leading-tight">
      Ville propre, Bénin responsable
    </span>
  </div>
</Link>

          {/* NAVIGATION LINKS - Desktop */}
          <nav className="hidden md:flex items-center gap-8 flex-1 justify-center">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors relative pb-0.5 ${
                  pathname === link.href
                    ? 'text-green-700 font-semibold'
                    : 'text-gray-600 dark:text-gray-300 hover:text-green-700'
                } after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-green-600 after:transition-all after:duration-300 hover:after:w-full ${
                  pathname === link.href ? 'after:w-full' : ''
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* RIGHT SECTION */}
          <div className="flex items-center gap-2 md:gap-3">

            {/* THEME TOGGLE */}
            {mounted && (
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:text-green-700 hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors"
                aria-label="Basculer le thème"
              >
                {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
            )}

            {/* AUTH SECTION */}
            {!isLoggedIn ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => openModal('login')}
                  className="hidden md:block border-2 border-green-900 text-green-700 px-4 py-1.5 rounded-lg text-sm font-semibold hover:bg-green-50 transition-colors"
                >
                  Connexion
                </button>
                <button
                  onClick={() => openModal('register')}
                  className="hidden sm:block bg-green-900 text-white px-4 py-1.5 rounded-lg text-sm font-semibold hover:bg-green-700 transition-colors"
                >
                  Inscription
                </button>
              </div>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-green-600 text-white flex items-center justify-center font-bold text-sm cursor-pointer hover:shadow-md transition-shadow ring-2 ring-green-200"
                >
                  {currentUser ? getInitials(currentUser.name) : 'U'}
                </button>

                {showDropdown && (
                  <div className="absolute top-full right-0 mt-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl min-w-[200px] shadow-lg z-50 overflow-hidden">
                    <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                      <p className="text-sm font-bold text-gray-900 dark:text-white">{currentUser?.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{currentUser?.email}</p>
                    </div>

                    <Link
                      href="/missions"
                      onClick={() => setShowDropdown(false)}
                      className="flex items-center gap-2 px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      <span className="text-base">📋</span>
                      Mes missions
                    </Link>

                    <Link
                      href="#"
                      onClick={() => setShowDropdown(false)}
                      className="flex items-center gap-2 px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      <span className="text-base">⭐</span>
                      Mon impact
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-3 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors border-t border-gray-100 dark:border-gray-700"
                    >
                      <span className="text-base">🚪</span>
                      Déconnexion
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* MENU MOBILE BURGER */}
            <button
              className="md:hidden p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:text-green-700 hover:bg-green-50 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Menu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
            <nav className="flex flex-col p-4 gap-1.5">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    pathname === link.href
                      ? 'bg-green-50 text-green-700 font-semibold'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              {/* THEME TOGGLE MOBILE */}
              {mounted && (
                <button
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  {theme === 'dark'
                    ? <><Sun className="w-4 h-4" /> Mode clair</>
                    : <><Moon className="w-4 h-4" /> Mode sombre</>
                  }
                </button>
              )}

              {!isLoggedIn && (
                <div className="flex gap-2 pt-1">
                  <button
                    onClick={() => { openModal('login'); setIsMenuOpen(false) }}
                    className="flex-1 border-2 border-green-900 text-green-700 px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-green-50 transition-colors"
                  >
                    Connexion
                  </button>
                  <button
                    onClick={() => { openModal('register'); setIsMenuOpen(false) }}
                    className="flex-1 bg-green-900 hover:bg-green-700 text-white px-4 py-2.5 rounded-lg text-sm font-bold transition-colors"
                  >
                    Inscription
                  </button>
                </div>
              )}
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