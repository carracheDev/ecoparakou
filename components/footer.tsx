import Link from 'next/link'
import Image from 'next/image'

const footerLinks = {
  navigation: [
    { label: "Accueil", href: "/" },
    { label: "Missions", href: "/missions" },
    { label: "Signaler", href: "/signaler" },
    { label: "Impact", href: "/impact" },
  ],
  legal: [
    { label: "À propos", href: "#" },
    { label: "Mentions légales", href: "#" },
    { label: "Politique de confidentialité", href: "#" },
    { label: "Aide & Contact", href: "#" },
  ],
}

const socials = [
  {
    label: "Facebook",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    label: "Twitter / X",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "WhatsApp",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.554 4.118 1.525 5.845L.057 23.899l6.22-1.431A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 0 1-5.006-1.371l-.359-.213-3.722.856.88-3.623-.234-.372A9.818 9.818 0 1 1 12 21.818z" />
      </svg>
    ),
  },
]

export function Footer() {
  return (
    <footer className="bg-[#0d1f0e] text-white">

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/images/logo.png"
                alt="EcoParakou"
                width={48}
                height={48}
                className="object-contain"
              />
              <div>
                <span className="text-xl font-bold">
                  <span className="text-green-400">Eco</span>
                  <span className="text-amber-400">Parakou</span>
                </span>
                <p className="text-xs text-green-500/70 leading-tight">Ville propre, Bénin responsable</p>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed max-w-sm mb-6">
              EcoParakou est une initiative citoyenne pour améliorer la gestion des déchets et la propreté urbaine à Parakou, au Bénin.
            </p>

            {/* Socials */}
            <div className="flex gap-3">
              {socials.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-green-800 hover:border-green-700 transition-all duration-200"
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-sm font-bold text-white mb-5 uppercase tracking-widest">Navigation</h4>
            <ul className="space-y-3">
              {footerLinks.navigation.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-green-400 transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-green-700 group-hover:bg-green-400 transition-colors" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-bold text-white mb-5 uppercase tracking-widest">Informations</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-green-400 transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-green-700 group-hover:bg-green-400 transition-colors" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Contact rapide */}
            <div className="mt-8 p-4 bg-white/5 border border-white/10 rounded-xl">
              <p className="text-xs text-gray-400 mb-1">Nous contacter</p>
              <a
                href="mailto:contact@ecoparakou.bj"
                className="text-sm text-green-400 hover:text-green-300 font-medium transition-colors"
              >
                contact@ecoparakou.bj
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-500">
            © 2024 EcoParakou. Tous droits réservés.
          </p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs text-gray-500">Service actif à Parakou, Bénin</span>
          </div>
        </div>
      </div>

    </footer>
  )
}