"use client"

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const allMissions = [
  {
    id: 1,
    title: "Quartier Ladji-Farani",
    location: "Zone Nord-Est, Parakou",
    status: "En attente",
    statusColor: "bg-red-100 text-red-800 border-red-200",
    icon: "priority_high",
    iconColor: "text-red-700",
    tags: [{ icon: "recycling", label: "Plastique" }, { icon: "warning", label: "Urgent" }],
    updatedAt: "Mis à jour il y a 2h",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAewwhMTnGbk5WfjarJ1odXkW5SmtXYkZQfgNoIJTO4jRLW8DCDSWzO-CQRBgirAuDaCqC3T5TDe6ZszyCwToDBEXIsOisD0n15lKpgnHCCAFjpPPyLGD9C5Shc_OU0V-zi5dOHP_Y8-Wed_2T9S816TwpsvH9KC4_H-kgOqvfNrDZ3o7k9ayfYVzmI4wzyAITzCfbGOxi84ImG5YiWegEmAfWX6LqlnWAGiV1nU2iFsFi7KkP94yZSTN0zaNWycp3gK79X3aYcSas",
  },
  {
    id: 2,
    title: "Quartier Banikanni",
    location: "Zone Marché, Parakou",
    status: "En cours",
    statusColor: "bg-yellow-100 text-yellow-800 border-yellow-200",
    icon: "pending",
    iconColor: "text-secondary",
    tags: [{ icon: "compost", label: "Organique" }],
    updatedAt: "Mis à jour il y a 5h",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBlBYkkXtYZcf53QgpmuDJESJo3GcMbkMvyMsucHAGsDcfKQH1Yf8zw8LUSYpxfHezrm38NQirNz-g-ElqQamJuxMNkVAfQ6iB5of-HYPfUPvWu3Xou1JT_HV6V_6WWVrnEtWrk3a5LYpMO0aK-7cMfGa_iucHx3oN8s7NcRiD5IjyP8ksj6hY87NjfkFmGCsN-nWk2B8cP5N2YsvoyuVRNAEZpSIUmxBoZCiRSzgTv-dwgIChfyzDelzq-jra5g5jP9b6jd1PF6TY",
  },
  {
    id: 3,
    title: "Quartier Albarika",
    location: "Zone Universitaire, Parakou",
    status: "Terminé",
    statusColor: "bg-primary-fixed text-on-primary-fixed-variant border-primary-fixed-dim",
    icon: "check_circle",
    iconColor: "text-primary",
    tags: [{ icon: "delete", label: "Mixte" }],
    updatedAt: "Terminé hier",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCnqwWJFx1fPG-yaXR_nCyDejpwIttw6CzhjGN30c9Wc7-rvPzmHAehf_CHplUUaf0HxwzVd9CsABZ8BaipK4944sqday8_Y6S5upNLVv60qvrXuMuWPzAuU_I-Jqq90_oXB6LVYWCS9d_pa5LbmB2eGlftgJk2ug-JwjerausHBj7fGA-LPnn06urQqMcVqBN9MUlYgOFyeGyhSXeXD97VIlnFUd-IRXWXafPBWX8QeC2RXwlKyy2_fJ7dnZ0ex20upOvHqjinU7o",
  },
  {
    id: 4,
    title: "Zone Industrielle",
    location: "Avenue du Port, Parakou",
    status: "En attente",
    statusColor: "bg-red-100 text-red-800 border-red-200",
    icon: "priority_high",
    iconColor: "text-red-700",
    tags: [{ icon: "biotech", label: "Dangereux" }],
    updatedAt: "Nouveau signalement",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDncciGj7IPD1w_hj39Ubi1FF5mm_rfjXylldkvJ9B7ENRdvF5SaiYJfYilEyX7GA9mDrqwQyjOb45wClGDW4vnZryd3sEZ1LFkhlIVVHcMFXDme2Wqa5cLMNrab1d-kRWXA2YuBdI-nVHuP9ZvhReZZod3tenQF8idtC7BupumSoK9IGY7Qu0hUWCrmHkJ3DTSy7wqT_LI-f1-p1z_4fBAIkjf45iaNsRFNZ4RM0avFAPBRrRxXkUEBvl_0_lXMunFfsPYNfSn2NE",
  },
  {
    id: 5,
    title: "Parc de l'Indépendance",
    location: "Centre-Ville, Parakou",
    status: "En cours",
    statusColor: "bg-yellow-100 text-yellow-800 border-yellow-200",
    icon: "pending",
    iconColor: "text-secondary",
    tags: [{ icon: "park", label: "Espaces Verts" }],
    updatedAt: "Mis à jour il y a 1h",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAGGKabW5qDlAiyCtZpSxrS6p2MLuoNATzOTigw0y5BUDSqQbt6BcBcfaMzQD4jvGEXfsfaXNKNK6d5J2hVw_H7eEg04UUPn2eTWEEIQYl7nCuIlxxPEV7EDFq2T2iXqKBaDOgvAnauYOiJOdAsvUYK9MOwVyt-StEiZjSbpMYrEoFEpmZuV5RmVYBUWdz_HcL_H5fg09kvIbk_z-KxuzfgzNq4jaLsCDr5a6jdZV7iluU2MBLEkQlVOFZlGXKHXzLVlDRDHT7HvpE",
  },
  {
    id: 6,
    title: "Marché Central",
    location: "Place du marché, Parakou",
    status: "En attente",
    statusColor: "bg-red-100 text-red-800 border-red-200",
    icon: "priority_high",
    iconColor: "text-red-700",
    tags: [{ icon: "compost", label: "Organique" }, { icon: "warning", label: "Urgent" }],
    updatedAt: "Mis à jour il y a 3h",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBng59HGcYrFFov6ei1VxNk6ivTdYuq7s-9V8lX3gvtZMEhdJ3VRrBreAVGoa4EgtEjM6uPp3Wya1Z-PRlHeI7igK4CtLY594weEOK_ds8s6L_ULCaHMncdvDDVJZBMvR54p8KkHr61HAhdpxY-iSKHlG38nccTC78UONTjm54wOTvTuhoQijMZO1LZihHJUWBECRrP81ICpsKnlqsnW",
  },
]

export function MissionsList() {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredMissions = allMissions.filter(mission => 
    mission.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    mission.location.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <>
      {/* Filter/Search Bar */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4 bg-surface-container-low p-4 rounded-xl">
        <div className="flex items-center gap-3 bg-white border border-outline-variant px-3 py-2 rounded-lg w-full md:w-96">
          <span className="material-symbols-outlined text-outline">search</span>
          <input 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Rechercher un quartier..."
            className="border-none focus:ring-0 w-full text-sm bg-transparent outline-none"
          />
        </div>
        <div className="flex gap-3">
          <button className="bg-white border border-outline-variant px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-1 hover:bg-surface-container-high transition-colors">
            <span className="material-symbols-outlined text-sm">filter_list</span>
            Filtrer
          </button>
          <button className="bg-white border border-outline-variant px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-1 hover:bg-surface-container-high transition-colors">
            <span className="material-symbols-outlined text-sm">sort</span>
            Trier
          </button>
        </div>
      </div>

      {/* Mission Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMissions.map((mission) => (
          <div 
            key={mission.id}
            className="bg-white border border-gray-200 rounded-xl overflow-hidden flex flex-col group hover:shadow-lg transition-all duration-300"
          >
            <div className="relative h-48 overflow-hidden">
              <Image 
                src={mission.image}
                alt={mission.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 right-3">
                <span className={`${mission.statusColor} text-xs font-medium px-3 py-1 rounded-full border`}>
                  {mission.status}
                </span>
              </div>
            </div>
            <div className="p-4 flex flex-col flex-grow">
              <div className="flex items-start justify-between mb-1">
                <h3 className="text-xl font-semibold text-on-surface">{mission.title}</h3>
                <span className={`material-symbols-outlined ${mission.iconColor}`}>{mission.icon}</span>
              </div>
              <div className="flex items-center gap-1 text-on-surface-variant mb-4">
                <span className="material-symbols-outlined text-base">location_on</span>
                <span className="text-sm">{mission.location}</span>
              </div>
              <div className="flex flex-wrap gap-1.5 mb-6">
                {mission.tags.map((tag) => (
                  <span 
                    key={tag.label}
                    className="flex items-center gap-1 bg-surface-container px-2.5 py-1 rounded-lg text-xs font-medium"
                  >
                    <span className="material-symbols-outlined text-xs">{tag.icon}</span>
                    {tag.label}
                  </span>
                ))}
              </div>
              <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                <span className="text-xs font-medium text-outline">{mission.updatedAt}</span>
                <Link 
                  href={`/missions/${mission.id}`}
                  className="bg-secondary-container text-on-secondary-container font-semibold text-sm px-4 py-1.5 rounded-lg hover:brightness-95 transition-all active:scale-95"
                >
                  Voir détail
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
