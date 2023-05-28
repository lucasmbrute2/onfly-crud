import 'reflect-metadata'
import { PrismaClient } from '@prisma/client'
import { execSync } from 'child_process'
import { randomUUID } from 'node:crypto'
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest'
import { PrismaExpenseRepository } from './prisma-expense-repository'
import { ExpenseRepository } from '../expense-repository'
import { makeExpense } from '../../modules/expense/tests/factories'
import { makeUser } from '../../modules/user/tests/factories'
import { PrismaUserMapper } from './mappers/user-mapper'
import { Expense } from '../../modules/expense/entity/expense'

const makeSut = (): ExpenseRepository => {
  return new PrismaExpenseRepository()
}

describe('ExpenseRepository', () => {
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
    await prisma.expense.deleteMany({})
  })

  // add()
  it('Should return an Expense on success', async () => {
    const sut = makeSut()
    const user = makeUser()

    await prisma.user.create({
      data: PrismaUserMapper.toPrisma(user),
    })

    const expense = await sut.add(
      makeExpense({
        payerId: user.id,
      }),
    )

    expect(expense).toBeInstanceOf(Expense)
    expect(expense).toMatchObject(
      makeExpense({
        payerId: user.id,
        createdAt: expense.createdAt,
      }),
    )
  })

  // findMany()
  it('Should return an array of Expenses on success', async () => {
    const sut = makeSut()
    const user = makeUser()

    await prisma.user.create({
      data: PrismaUserMapper.toPrisma(user),
    })
    await sut.add(
      makeExpense({
        payerId: user.id,
      }),
    )
    const expenses = await sut.findMany(user.id)
    expect(expenses).toHaveLength(1)
    expect(expenses[0]).toBeInstanceOf(Expense)
  })

  // findById()
  it('Should return an Expenses on success', async () => {
    const sut = makeSut()
    const user = makeUser()

    await prisma.user.create({
      data: PrismaUserMapper.toPrisma(user),
    })

    const expenseCreated = makeExpense({
      payerId: user.id,
    })
    await sut.add(expenseCreated)
    const expenseFromDb = await sut.findById(expenseCreated.id)

    expect(expenseFromDb).toBeInstanceOf(Expense)
  })
})
