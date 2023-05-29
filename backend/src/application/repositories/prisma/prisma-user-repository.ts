import { PrismaClient } from '@prisma/client'
import { IncludeRelation, UserRepository } from '../user-repository'
import { PrismaUserMapper } from './mappers/user-mapper'
import { User } from '../../modules/user/entity/user'
import { injectable } from 'tsyringe'

@injectable()
export class PrismaUserRepository implements UserRepository {
  private readonly prisma = new PrismaClient()

  async add(userData: User): Promise<User> {
    const user = await this.prisma.user.create({
      data: PrismaUserMapper.toPrisma(userData),
    })

    return PrismaUserMapper.toDomain(user)
  }

  async findById(
    id: string,
    includeRelation?: IncludeRelation,
  ): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        expenses: includeRelation?.expenses ?? false,
      },
    })

    if (!user) return null
    return PrismaUserMapper.toDomain(user)
  }

  async findByUsername(
    username: string,
    includeRelation?: IncludeRelation,
  ): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        username,
      },
      include: {
        expenses: includeRelation?.expenses ?? false,
      },
    })
    if (!user) return null
    return PrismaUserMapper.toDomain(user)
  }
}
