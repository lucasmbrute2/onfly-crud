import { InMemoryUserRepository } from '@/src/application/repositories/in-memory/in-memory-user-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { ExpendUseCase } from './expend-use-case'
import { InMemoryExpenseRepository } from '@/src/application/repositories/in-memory/in-memory-expense-repository'
import { makeExpense } from '../tests/factories'
import { BadRequestError } from '@/src/shared/errors/global-errors'

let sut: ExpendUseCase
let inMemoryUserRepository: InMemoryUserRepository
let inMemoryExpenseRepository: InMemoryExpenseRepository

describe('Expend Use Case ', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()
    inMemoryExpenseRepository = new InMemoryExpenseRepository()
    sut = new ExpendUseCase(inMemoryExpenseRepository, inMemoryUserRepository)
  })

  it('Should not be able to create an Expense without an valid user', () => {
    expect(async () => {
      const expense = makeExpense()
      await sut.execute(expense)
    }).rejects.toBeInstanceOf(BadRequestError)
  })
})
