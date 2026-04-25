import { prisma } from '../lib/prisma'
import bcrypt from 'bcryptjs'

async function main() {
  // Créer un utilisateur signaleur
  const signaleur = await prisma.user.create({
    data: {
      nom: 'Ali Signaleur',
      email: 'signaleur@ecoparakou.com',
      password: await bcrypt.hash('password123', 10),
      role: 'SIGNALEUR',
      telephone: '+229 96 00 00 00',
    },
  })

  // Créer un utilisateur collecteur
  const collecteur = await prisma.user.create({
    data: {
      nom: 'Farid Collecteur',
      email: 'collecteur@ecoparakou.com',
      password: await bcrypt.hash('password123', 10),
      role: 'COLLECTEUR',
      telephone: '+229 97 00 00 00',
      points: 150,
    },
  })

  // Créer des signalements
  const signalements = await Promise.all([
    prisma.signalement.create({
      data: {
        titre: 'Accumulation de déchets plastiques - Quartier Ladji-Farani',
        description: 'Zone couverte de sachets plastiques et bouteilles. Situation urgente.',
        latitude: 9.5544,
        longitude: 2.6289,
        adresse: 'Quartier Ladji-Farani, Zone Nord-Est, Parakou',
        gravite: 'CRITIQUE',
        statut: 'EN_ATTENTE',
        analyseIA: 'Zone urbaine densément peuplée avec accumulation majeure de déchets plastiques. Recommandation : intervention urgente requise dans les 24-48h.',
        userId: signaleur.id,
        photoUrl: '/images/mission-1.jpg',
      },
    }),
    prisma.signalement.create({
      data: {
        titre: 'Pollution aux environs du marché central',
        description: 'Déchets organiques accumulés près des marchands de fruits et légumes.',
        latitude: 9.5567,
        longitude: 2.6312,
        adresse: 'Marché Central, Place du marché, Parakou',
        gravite: 'MODERE',
        statut: 'EN_ATTENTE',
        analyseIA: 'Marché avec déchets organiques importants. Zone de forte circulation. Nettoyage régulier nécessaire.',
        userId: signaleur.id,
        photoUrl: '/images/mission-marché.jpg',
      },
    }),
    prisma.signalement.create({
      data: {
        titre: 'Quartier Albarika - Espaces verts dégradés',
        description: 'Zone universitaire avec débris et déchets mixtes sur les espaces verts.',
        latitude: 9.5489,
        longitude: 2.6401,
        adresse: 'Quartier Albarika, Zone Universitaire, Parakou',
        gravite: 'LEGER',
        statut: 'EN_ATTENTE',
        analyseIA: 'Espaces verts universitaires nécessitant nettoyage de maintenance. Débris mixtes: papier, plastique, feuilles.',
        userId: signaleur.id,
        photoUrl: '/images/mission-2.jpg',
      },
    }),
    prisma.signalement.create({
      data: {
        titre: 'Zone Industrielle - Risque de pollution',
        description: 'Résidus industriels et substances dangereuses détectées.',
        latitude: 9.5612,
        longitude: 2.6156,
        adresse: 'Zone Industrielle, Avenue du Port, Parakou',
        gravite: 'CRITIQUE',
        statut: 'EN_ATTENTE',
        analyseIA: 'Zone industrielle avec présence de substances dangereuses. Intervention spécialisée requise. Risque élevé.',
        userId: signaleur.id,
        photoUrl: '/images/mission-4.jpg',
      },
    }),
    prisma.signalement.create({
      data: {
        titre: 'Parc de l\'Indépendance - Maintenance requise',
        description: 'Espaces verts du parc public avec accumulation de papiers et emballages.',
        latitude: 9.5445,
        longitude: 2.6245,
        adresse: 'Parc de l\'Indépendance, Centre-Ville, Parakou',
        gravite: 'LEGER',
        statut: 'EN_ATTENTE',
        analyseIA: 'Parc public nécessitant nettoyage de routine. Débris légers (papiers, emballages).',
        userId: signaleur.id,
        photoUrl: '/images/mission-5.jpg',
      },
    }),
  ])

  // Créer des missions à partir des signalements
  const missions = await Promise.all([
    prisma.mission.create({
      data: {
        titre: signalements[0].titre,
        description: 'Nettoyage urgent de la zone. Retrait de tous les déchets plastiques.',
        signalementId: signalements[0].id,
        statut: 'DISPONIBLE',
        points: 100,
      },
    }),
    prisma.mission.create({
      data: {
        titre: signalements[1].titre,
        description: 'Nettoyage des alentours du marché. Évacuation des déchets organiques.',
        signalementId: signalements[1].id,
        statut: 'EN_COURS',
        collecteurId: collecteur.id,
        points: 75,
      },
    }),
    prisma.mission.create({
      data: {
        titre: signalements[2].titre,
        description: 'Nettoyage des espaces verts universitaires.',
        signalementId: signalements[2].id,
        statut: 'DISPONIBLE',
        points: 50,
      },
    }),
    prisma.mission.create({
      data: {
        titre: signalements[3].titre,
        description: 'Intervention spécialisée pour zone industrielle - risque de pollution.',
        signalementId: signalements[3].id,
        statut: 'DISPONIBLE',
        points: 150,
      },
    }),
    prisma.mission.create({
      data: {
        titre: signalements[4].titre,
        description: 'Nettoyage routine du parc public.',
        signalementId: signalements[4].id,
        statut: 'DISPONIBLE',
        points: 50,
      },
    }),
  ])

  console.log('✅ Seed completed!')
  console.log('📋 Signalements created:', signalements.length)
  console.log('🎯 Missions created:', missions.length)
  console.log('👤 Users created:')
  console.log('  - Signaleur:', signaleur.email)
  console.log('  - Collecteur:', collecteur.email)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
