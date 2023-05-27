import 'reflect-metadata'
import { PrismaClient } from '@prisma/client'
import { env } from './env'
import console from 'console'
import { app } from './app'

const prisma = new PrismaClient()

async function main() {
  await prisma.$connect()
}

main()
  .then(() => {
    console.info('Prisma connected')
    app.listen(Number(env.PORT), () =>
      console.log(`Server running on port ${env.PORT}`),
    )
  })
  .catch(async (e) => {
    await prisma.$disconnect()
    console.error('Prisma was desconnected - error: ' + e)
    process.exit(1)
  })
