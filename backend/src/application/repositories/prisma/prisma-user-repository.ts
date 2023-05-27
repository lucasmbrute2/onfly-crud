import { PrismaClient } from '@prisma/client'
import { UserRepository } from '../user-repository'
import { PrismaUserMapper } from './mappers/user-mapper'
import { User } from '../../modules/user/entity/user'

export class PrismaUserRepository implements UserRepository {
  private readonly prisma = new PrismaClient()

  async add(userData: User): Promise<User> {
    const user = await this.prisma.user.create({
      data: PrismaUserMapper.toPrisma(userData),
    })

    return PrismaUserMapper.toDomain(user)
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    })

    if (!user) return null
    return PrismaUserMapper.toDomain(user)
  }

  async findByUsername(username: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        username,
      },
    })
    if (!user) return null
    return PrismaUserMapper.toDomain(user)
  }
}
