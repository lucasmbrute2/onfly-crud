import 'reflect-metadata'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { FetchExpensesUseCase } from './fetch-expenses-use-case'
import { InMemoryUserRepository } from '@/src/application/repositories/in-memory/in-memory-user-repository'
import { makeExpense } from '../tests/factories'
import { NotFoundError } from '@/src/shared/errors/global-errors'
import { makeUser, makeUserPropsWithExpense } from '../../user/tests/factories'
import { Expense } from '../entity/expense'

let sut: FetchExpensesUseCase
let inMemoryUserRepository: InMemoryUserRepository

describe('Fetch expenses', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()
    sut = new FetchExpensesUseCase(inMemoryUserRepository)
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

    expect(findByIdSpy).toHaveBeenCalledWith(user.id, {
      expenses: true,
    })
  })

  it('Should return an array of the payer Expenses on success', async () => {
    const user = makeUser(makeUserPropsWithExpense())
    inMemoryUserRepository.add(user)
    const { expenses } = await sut.execute({
      payerId: user.id,
    })

    expect(expenses[0]).toBeInstanceOf(Expense)
    expect(expenses).toHaveLength(1)
  })
})
