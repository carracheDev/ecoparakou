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
    const signalements = await prisma.signalement.findMany({
      include: {
        user: {
          select: { nom: true, email: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(signalements)
  } catch (error) {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = getUserFromToken(req)
    if (!user) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
    }

    const { titre, description, latitude, longitude, adresse, photoUrl, analyseIA, gravite } =
      await req.json()

    if (!titre || !latitude || !longitude) {
      return NextResponse.json(
        { error: 'Titre et coordonnées obligatoires' },
        { status: 400 }
      )
    }

    const signalement = await prisma.signalement.create({
      data: {
        titre,
        description,
        latitude,
        longitude,
        adresse,
        photoUrl,
        analyseIA,
        gravite: gravite || 'LEGER',
        userId: user.userId,
      },
    })

    // Créer automatiquement une mission liée
    await prisma.mission.create({
      data: {
        titre: `Collecte - ${titre}`,
        description: `Zone signalée : ${adresse || 'coordonnées GPS'}`,
        points: gravite === 'CRITIQUE' ? 100 : gravite === 'MODERE' ? 75 : 50,
        signalementId: signalement.id,
      },
    })

    return NextResponse.json(signalement, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}