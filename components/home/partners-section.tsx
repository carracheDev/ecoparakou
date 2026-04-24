const partners = [
  "Mairie de Parakou",
  "NGO GreenAfrica",
  "Bank of Benin",
  "Soneb",
  "LogisTrans",
]

export function PartnersSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-semibold text-primary mb-10">Partenaires et sponsors</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 items-center justify-items-center opacity-60">
          {partners.map((partner) => (
            <div 
              key={partner}
              className="h-11 flex items-center justify-center font-semibold text-gray-400 border-2 border-dashed border-gray-200 rounded-lg px-5 w-full text-sm"
            >
              {partner}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
