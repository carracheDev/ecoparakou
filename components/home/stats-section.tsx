import Image from 'next/image'

const stats = [
  { value: "1 200+", label: "Zones traitées" },
  { value: "500+", label: "Citoyens actifs" },
  { value: "12t", label: "Collectées ce mois" },
  { value: "98%", label: "Satisfaction citoyens" },
]

export function StatsSection() {
  return (
    <section className="py-20 bg-primary-container text-on-primary-container overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <h2 className="text-3xl font-semibold mb-4 text-on-primary-container">Notre impact à Parakou</h2>
            <p className="text-lg mb-8 opacity-80">
              Grâce à l&apos;engagement collectif et au soutien de nos partenaires, nous construisons une ville plus propre.
            </p>
            <div className="grid grid-cols-2 gap-5">
              {stats.map((stat) => (
                <div key={stat.label} className="stat-card">
                  <p className="text-3xl font-bold">{stat.value}</p>
                  <p className="text-sm opacity-80">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="md:w-1/2 relative">
            <Image 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuByJ_UrBj4a7sCsO4NmsxWgSZcxEgJxY9MzYV7MOw_7rOQe16pH3WShTYs6rXwLTkRCm93SMXWQ7wcX3T9I4PEKhxvXHemhejZjbjp-5Sj8fmd7oIu_Xw6YWydZHBKvG-v2F21YLrP2ONyfvYn9Rz3hM4KKVfNaGYXHa5HTzFBw_spFEIuAzQv6clk8sCw3N18fPLcEQhk8Xfn73rC-vNAZfRcYlL0SK5MlcMeN27bF2kOj3-CWBi-5vgUC_RqIETCChbKHypavrJ0"
              alt="Impact Environnemental"
              width={600}
              height={400}
              className="rounded-3xl shadow-2xl relative z-10 w-full object-cover aspect-video"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
