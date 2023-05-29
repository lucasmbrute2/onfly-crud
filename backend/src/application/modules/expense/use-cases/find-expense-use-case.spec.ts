import 'reflect-metadata'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { InMemoryExpenseRepository } from '@/src/application/repositories/in-memory/in-memory-expense-repository'
import { InMemoryUserRepository } from '@/src/application/repositories/in-memory/in-memory-user-repository'
import { FindExpenseUseCase } from './find-expense-use-case'

import { makeExpense } from '../tests/factories'
import { NotFoundError } from '@/src/shared/errors/global-errors'
import { makeUser, makeUserPropsWithExpense } from '../../user/tests/factories'
import { Expense } from '../entity/expense'

let sut: FindExpenseUseCase
let inMemoryUserRepository: InMemoryUserRepository
let inMemoryExpenseRepository: InMemoryExpenseRepository

describe('FindExpenseUseCase', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()
    inMemoryExpenseRepository = new InMemoryExpenseRepository()
    sut = new FindExpenseUseCase(inMemoryUserRepository)
  })

  it('Should to throw if has not valid payer', () => {
    expect(async () => {
      const { payerId, id } = makeExpense()
      await sut.execute({ payerId, expenseId: id })
    }).rejects.toBeInstanceOf(NotFoundError)
  })

  it('Should call UserRepository with correct payerId', async () => {
    const findByIdSpy = vi.spyOn(inMemoryUserRepository, 'findById')
    const user = makeUser(makeUserPropsWithExpense())
    inMemoryUserRepository.add(user)

    const { id: payerId, expenses } = user
    inMemoryExpenseRepository.add(expenses[0])

    await sut.execute({ payerId, expenseId: expenses[0].id })

    expect(findByIdSpy).toHaveBeenCalledWith(payerId, {
      expenses: true,
    })
  })

  it('Should throw NotFoundError if not find expense', () => {
    expect(async () => {
      const { payerId } = makeExpense()
      await sut.execute({ payerId, expenseId: 'wrong-id' })
    }).rejects.toBeInstanceOf(NotFoundError)
  })

  it('Should return an Expense on success', async () => {
    const user = makeUser(makeUserPropsWithExpense())
    inMemoryUserRepository.add(user)

    const { id: payerId, expenses } = user
    inMemoryExpenseRepository.add(expenses[0])

    const response = await sut.execute({ payerId, expenseId: expenses[0].id })
    expect(response.expense).toBeInstanceOf(Expense)
  })
})
