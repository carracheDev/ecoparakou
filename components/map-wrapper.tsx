'use client'

import dynamic from 'next/dynamic'

const MapSignalements = dynamic(() => import('@/components/map-signalements'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-[500px] bg-muted rounded-xl">
      <p className="text-muted-foreground">Chargement de la carte...</p>
    </div>
  ),
})

export default function MapWrapper() {
  return <MapSignalements />
}