import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const mission = await prisma.mission.findUnique({
      where: { id },
      include: {
        signalement: true,
        collecteur: { select: { nom: true, email: true } },
      },
    })
    if (!mission) {
      return NextResponse.json({ error: 'Mission introuvable' }, { status: 404 })
    }
    return NextResponse.json(mission)
  } catch (error) {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const { statut, collecteurId } = await req.json()
    const mission = await prisma.mission.update({
      where: { id },
      data: { statut, collecteurId },
    })
    if (statut === 'TERMINEE' && collecteurId) {
      await prisma.user.update({
        where: { id: collecteurId },
        data: { points: { increment: mission.points } },
      })
    }
    return NextResponse.json(mission)
  } catch (error) {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
