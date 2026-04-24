import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-slate-50 border-t border-gray-200">
      <div className="flex flex-col md:flex-row justify-between items-center w-full px-8 py-10 max-w-7xl mx-auto gap-6">
        <div className="flex flex-col items-center md:items-start gap-1">
          <span className="text-lg font-bold text-green-900">EcoParakou</span>
          <p className="text-sm text-gray-500">© 2024 EcoParakou. Service de gestion des déchets de Parakou.</p>
        </div>
        <nav className="flex flex-wrap justify-center gap-6">
          <Link href="#" className="text-sm text-gray-500 hover:text-green-700 transition-colors">
            À propos
          </Link>
          <Link href="#" className="text-sm text-gray-500 hover:text-green-700 transition-colors">
            Contact
          </Link>
          <Link href="#" className="text-sm text-gray-500 hover:text-green-700 transition-colors">
            Mentions Légales
          </Link>
          <Link href="#" className="text-sm text-gray-500 hover:text-green-700 transition-colors">
            Aide
          </Link>
        </nav>
        <div className="flex gap-4">
          <Link href="#" className="text-gray-400 hover:text-green-800 transition-colors">
            <span className="material-symbols-outlined">language</span>
          </Link>
          <Link href="#" className="text-gray-400 hover:text-green-800 transition-colors">
            <span className="material-symbols-outlined">mail</span>
          </Link>
        </div>
      </div>
    </footer>
  )
}
