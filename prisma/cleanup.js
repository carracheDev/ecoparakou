const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  console.log('🗑️  Suppression des données existantes...')
  
  // Supprimer les missions
  await prisma.mission.deleteMany({})
  console.log('✅ Missions supprimées')
  
  // Supprimer les signalements
  await prisma.signalement.deleteMany({})
  console.log('✅ Signalements supprimés')
  
  // Supprimer les utilisateurs
  await prisma.user.deleteMany({})
  console.log('✅ Utilisateurs supprimés')
  
  console.log('🧹 Base de données nettoyée !')
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
