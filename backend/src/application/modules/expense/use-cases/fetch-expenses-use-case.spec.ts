import { beforeEach, describe, expect, it } from 'vitest'
import { FetchExpensesUseCase } from './fetch-expenses-use-case'
import { InMemoryUserRepository } from '@/src/application/repositories/in-memory/in-memory-user-repository'
import { InMemoryExpenseRepository } from '@/src/application/repositories/in-memory/in-memory-expense-repository'
import { makeExpense } from '../tests/factories'
import { NotFoundError } from '@/src/shared/errors/global-errors'

let sut: FetchExpensesUseCase
let inMemoryUserRepository: InMemoryUserRepository
let inMemoryExpenseRepository: InMemoryExpenseRepository

describe('Fetch expenses', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()
    inMemoryExpenseRepository = new InMemoryExpenseRepository()
    sut = new FetchExpensesUseCase(
      inMemoryExpenseRepository,
      inMemoryUserRepository,
    )
  })

  it('Should to throw if has not valid payer', () => {
    expect(async () => {
      await sut.execute(makeExpense().payerId)
    }).rejects.toBeInstanceOf(NotFoundError)
  })
})
