import 'reflect-metadata'

import { PrismaClient } from '@prisma/client'
import { execSync } from 'child_process'
import { randomUUID } from 'node:crypto'
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest'
import { PrismaUserMapper } from './mappers/user-mapper'
import { makeUser } from '../../modules/user/tests/factories'
import { PrismaUserRepository } from './prisma-user-repository'
import { User } from '../../modules/user/entity/user'
import { UserRepository } from '../user-repository'

const makeSut = (): UserRepository => {
  return new PrismaUserRepository()
}

describe('UserRepository', () => {
  const prisma = new PrismaClient()
  let schema: string

  beforeAll(() => {
    if (!process.env.DATABASE_URL) {
      throw new Error('Please provide a DATABASE_URL environment variable')
    }
    schema = randomUUID()
    const url = new URL(process.env.DATABASE_URL)
    url.searchParams.set('schema', schema)

    process.env.DATABASE_URL = url.toString()
    execSync('npx prisma migrate deploy')
  })

  afterAll(async () => {
    await prisma.$queryRawUnsafe(`DROP SCHEMA IF EXISTS "${schema}" CASCADE`)
    await prisma.$disconnect()
  })

  beforeEach(async () => {
    await prisma.user.deleteMany({})
  })

  // add()
  it('Should return an User on success', async () => {
    const sut = makeSut()
    const user = await sut.add(makeUser())

    expect(user).toBeInstanceOf(User)
    expect(user).toBeTruthy()
    expect(user).toEqual(makeUser())
  })

  // findById
  it('Should return an User on success', async () => {
    const sut = makeSut()
    const userFromFactory = makeUser()

    await prisma.user.create({
      data: PrismaUserMapper.toPrisma(userFromFactory),
    })

    const user = await sut.findById(userFromFactory.id)

    expect(user).toMatchObject(makeUser({ id: user.id }))
    expect(user).toBeInstanceOf(User)
  })

  // findByUsername

  it('Should return an User on success', async () => {
    const sut = makeSut()
    const userFromFactory = makeUser()

    await prisma.user.create({
      data: PrismaUserMapper.toPrisma(userFromFactory),
    })

    const user = await sut.findByUsername(userFromFactory.username)

    expect(user).toMatchObject(makeUser({ id: user.id }))
    expect(user).toBeInstanceOf(User)
  })
})
