const steps = [
  {
    number: 1,
    icon: "📍",
    title: "Signaler",
    description: "Prenez une photo et géolocalisez les zones sales depuis votre téléphone en quelques secondes.",
    tag: "Citoyen",
    tagColor: "bg-[#e8f5e9] text-[#2e7d32]",
    iconBg: "from-[#e8f5e9] to-[#c8e6c9]",
  },
  {
    number: 2,
    icon: "🚛",
    title: "Collecter",
    description: "Nos équipes reçoivent l'alerte et organisent le ramassage dans les meilleurs délais.",
    tag: "Équipes terrain",
    tagColor: "bg-[#fff8e1] text-[#f57f17]",
    iconBg: "from-[#fff8e1] to-[#ffecb3]",
  },
  {
    number: 3,
    icon: "✅",
    title: "Valider",
    description: "Chaque intervention est documentée avec photo avant/après pour un suivi rigoureux de l'impact.",
    tag: "Impact mesuré",
    tagColor: "bg-[#e3f2fd] text-[#1565c0]",
    iconBg: "from-[#e3f2fd] to-[#bbdefb]",
  },
  {
    number: 4,
    icon: "🌱",
    title: "Valoriser",
    description: "Les déchets collectés sont triés et transformés : compost pour les organiques, recyclage pour le plastique et le métal, créant une économie circulaire locale.",
    tag: "Économie circulaire",
    tagColor: "bg-[#f3e8ff] text-[#6b21a8]",
    iconBg: "from-[#f3e8ff] to-[#e9d5ff]",
  },
]

export function HowItWorksSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header centré */}
        <div className="text-center mb-14">
          <span className="inline-block bg-[#e8f5e9] text-[#00450d] text-[10px] font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-3">
            Processus
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0d1f0e] mb-3">
            Comment ça <span className="text-[#00450d]">marche ?</span>
          </h2>
          <p className="text-sm text-gray-500 max-w-md mx-auto leading-relaxed">
            Une approche simple et collaborative pour améliorer la salubrité de Parakou, étape par étape.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">

          {/* Connecteur ligne entre les cartes */}
          <div className="hidden md:block absolute top-[52px] left-[calc(25%+16px)] right-[calc(25%+16px)] h-0.5 bg-gradient-to-r from-[#acf4a4] to-[#fdd400] z-0" />

          {steps.map((step, i) => (
            <div
              key={i}
              className="relative z-10 text-center p-7 rounded-2xl border-2 border-[#e8f5e9] bg-white hover:-translate-y-1.5 hover:shadow-[0_8px_32px_rgba(0,69,13,0.10)] transition-all duration-300"
            >
              {/* Numéro */}
              <div className="w-8 h-8 bg-[#00450d] text-[#acf4a4] rounded-full text-sm font-extrabold flex items-center justify-center mx-auto mb-4">
                {step.number}
              </div>

              {/* Icône */}
              <div className={`w-[72px] h-[72px] rounded-2xl bg-gradient-to-br ${step.iconBg} flex items-center justify-center text-3xl mx-auto mb-5`}>
                {step.icon}
              </div>

              <h3 className="text-xl font-extrabold text-[#0d1f0e] mb-2">{step.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed mb-4">{step.description}</p>

              <span className={`inline-block text-[11px] font-bold px-3 py-1 rounded-full ${step.tagColor}`}>
                {step.tag}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}