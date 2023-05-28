import { env } from '@/src/application/env'
import { Auth } from '@/src/application/repositories/auth'
import { BcryptAdapter } from '@/src/application/repositories/bcrypt/bcrypt-adapter'
import { ExpenseRepository } from '@/src/application/repositories/expense-repository'
import { Hasher } from '@/src/application/repositories/hash'
import { JwtAdapter } from '@/src/application/repositories/jwt/jwt-adapter'
import { PrismaExpenseRepository } from '@/src/application/repositories/prisma/prisma-expense-repository'
import { PrismaUserRepository } from '@/src/application/repositories/prisma/prisma-user-repository'
import { UserRepository } from '@/src/application/repositories/user-repository'
import { container } from 'tsyringe'

container.registerSingleton<UserRepository>(
  'UserRepository',
  PrismaUserRepository,
)

container.registerInstance<Hasher>('Hasher', new BcryptAdapter(6))
container.registerInstance<Auth>(
  'Auth',
  new JwtAdapter(env.SECRET_KEY as string),
)

container.registerSingleton<ExpenseRepository>(
  'ExpenseRepository',
  PrismaExpenseRepository,
)
