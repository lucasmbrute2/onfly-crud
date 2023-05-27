import { BcryptAdapter } from '@/src/application/repositories/bcrypt/bcrypt-adapter'
import { Hasher } from '@/src/application/repositories/hash'
import { PrismaUserRepository } from '@/src/application/repositories/prisma/prisma-user-repository'
import { UserRepository } from '@/src/application/repositories/user-repository'
import { container } from 'tsyringe'

container.registerSingleton<UserRepository>(
  'UserRepository',
  PrismaUserRepository,
)

container.registerInstance<Hasher>('Hasher', new BcryptAdapter(6))
