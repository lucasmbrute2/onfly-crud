import 'reflect-metadata'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { FetchExpensesUseCase } from './fetch-expenses-use-case'
import { InMemoryUserRepository } from '@/src/application/repositories/in-memory/in-memory-user-repository'
import { InMemoryExpenseRepository } from '@/src/application/repositories/in-memory/in-memory-expense-repository'
import { makeExpense } from '../tests/factories'
import { NotFoundError } from '@/src/shared/errors/global-errors'
import { makeUser } from '../../user/tests/factories'

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
      await sut.execute({ payerId: makeExpense().payerId })
    }).rejects.toBeInstanceOf(NotFoundError)
  })

  it('Should call UserRepository with correct payerId', async () => {
    const findByIdSpy = vi.spyOn(inMemoryUserRepository, 'findById')

    const user = makeUser()
    await inMemoryUserRepository.add(user)
    await sut.execute({
      payerId: user.id,
    })

    expect(findByIdSpy).toHaveBeenCalledWith(user.id)
  })
})
