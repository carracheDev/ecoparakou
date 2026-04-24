const steps = [
  {
    number: 1,
    icon: "add_location_alt",
    title: "Signaler",
    description: "Prenez une photo et géolocalisez les zones nécessitant une intervention via notre application mobile.",
  },
  {
    number: 2,
    icon: "local_shipping",
    title: "Collecter",
    description: "Nos équipes ou des partenaires agréés reçoivent l'alerte et organisent le ramassage dans les meilleurs délais.",
  },
  {
    number: 3,
    icon: "verified",
    title: "Valider",
    description: "Chaque intervention est documentée et validée, garantissant un suivi rigoureux de l'assainissement urbain.",
  },
]

export function HowItWorksSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <span className="inline-block bg-green-100 text-surface-tint text-xs font-bold px-3.5 py-1 rounded-full tracking-wider mb-3">
          PROCESSUS
        </span>
        <h2 className="text-3xl font-semibold text-primary mb-4">Comment ça marche ?</h2>
        <p className="text-base text-on-surface-variant mb-16 max-w-2xl mx-auto">
          Une approche simple et collaborative pour améliorer la salubrité de Parakou, étape par étape.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div 
              key={step.number}
              className="p-8 rounded-3xl border border-outline-variant hover:border-surface-tint transition-all group bg-surface-container-lowest"
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              <div className="w-16 h-16 bg-primary-fixed rounded-2xl flex items-center justify-center text-primary mb-6 mx-auto group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-4xl">{step.icon}</span>
              </div>
              <div className="inline-flex items-center justify-center w-7 h-7 bg-primary text-white rounded-full font-bold text-sm mb-3">
                {step.number}
              </div>
              <h3 className="text-2xl font-semibold text-primary mb-3">{step.title}</h3>
              <p className="text-base text-on-surface-variant">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
