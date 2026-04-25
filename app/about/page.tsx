import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-b from-green-50 to-white py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-green-900 mb-4">
              À Propos de EcoParakou
            </h1>
            <p className="text-lg text-gray-700 mb-8">
              EcoParakou est un mouvement citoyen qui transforme Parakou en ville propre et durable.
            </p>
          </div>
        </section>

        {/* Mission */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-green-900 mb-6">Notre Mission</h2>
            <p className="text-lg text-gray-700 mb-4">
              Connecter les habitants, les collecteurs et l'intelligence artificielle pour créer une ville propre et durable.
            </p>
          </div>
        </section>

        {/* Vision */}
        <section className="bg-green-50 py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-green-900 mb-6">Notre Vision</h2>
            <p className="text-lg text-gray-700 mb-4">
              Parakou propre, Bénin responsable. Ensemble, nous transformons notre environnement urbain.
            </p>
          </div>
        </section>

        {/* ODD */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-green-900 mb-6">Alignement ODD</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-blue-900 mb-2">ODD 11 - Villes Durables</h3>
                <p className="text-gray-700">Rendre les villes inclusives, sûres, résilientes et durables.</p>
              </div>
              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-green-900 mb-2">ODD 12 - Consommation Responsable</h3>
                <p className="text-gray-700">Assurer une consommation et une production durables.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-green-900 text-white py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Rejoignez le Mouvement</h2>
            <p className="text-lg mb-8">Ensemble, rendons Parakou propre et durable.</p>
            <Button className="bg-white text-green-900 hover:bg-gray-100">
              Signaler une zone
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}