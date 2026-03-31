import { PrismaClient } from '@prisma/client'
import { PrismaNeon } from '@prisma/adapter-neon'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env' })

const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log('🌱 Seeding demo data...')

  // Create demo tenant if it doesn't exist
  let tenant = await prisma.tenant.findFirst()
  if (!tenant) {
    tenant = await prisma.tenant.create({
      data: {
        name: 'Demo Bäckerei Geiselbach',
      },
    })
    console.log('✅ Created demo tenant')
  }

  // Create 5 demo products
  const productNames = [
    'Brötchen',
    'Croissant',
    'Kaiserbrötchen',
    'Baguette',
    'Laugenbrötchen',
  ]

  for (const name of productNames) {
    const existing = await prisma.product.findFirst({
      where: { name, tenantId: tenant.id },
    })
    if (!existing) {
      await prisma.product.create({
        data: {
          name,
          tenantId: tenant.id,
        },
      })
      console.log(`✅ Added product: ${name}`)
    }
  }

  console.log('🎉 Demo data ready! You can now use the app.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })