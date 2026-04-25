import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  try {
    const missions = await prisma.mission.findMany({
      include: {
        signalement: true,
        collecteur: { select: { nom: true, email: true } },
      },
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(missions)
  } catch (error) {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}