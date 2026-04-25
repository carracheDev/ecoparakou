import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'ecoparakou-secret-2024'

function getUserFromToken(req: NextRequest) {
  const authHeader = req.headers.get('authorization')
  if (!authHeader) return null
  const token = authHeader.replace('Bearer ', '')
  try {
    return jwt.verify(token, JWT_SECRET) as { userId: string; role: string }
  } catch {
    return null
  }
}

export async function GET() {
  try {
    const missions = await prisma.mission.findMany({
      include: {
        signalement: true,
        collecteur: {
          select: { nom: true, email: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(missions)
  } catch (error) {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const user = getUserFromToken(req)
    if (!user) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
    }

    const { missionId, statut } = await req.json()

    const mission = await prisma.mission.update({
      where: { id: missionId },
      data: {
        statut,
        collecteurId: user.userId,
      },
    })

    // Si mission terminée, ajouter les points au collecteur
    if (statut === 'TERMINEE') {
      await prisma.user.update({
        where: { id: user.userId },
        data: {
          points: { increment: mission.points },
        },
      })
    }

    return NextResponse.json(mission)
  } catch (error) {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}