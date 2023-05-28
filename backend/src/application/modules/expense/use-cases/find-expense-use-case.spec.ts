import { beforeEach, describe, expect, it, vi } from 'vitest'
import { InMemoryExpenseRepository } from '@/src/application/repositories/in-memory/in-memory-expense-repository'
import { InMemoryUserRepository } from '@/src/application/repositories/in-memory/in-memory-user-repository'
import { FindExpenseUseCase } from './find-expense-use-case'

import { makeExpense } from '../tests/factories'
import { NotFoundError } from '@/src/shared/errors/global-errors'
import { makeUser } from '../../user/tests/factories'

let sut: FindExpenseUseCase
let inMemoryUserRepository: InMemoryUserRepository
let inMemoryExpenseRepository: InMemoryExpenseRepository

describe('FindExpenseUseCase', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()
    inMemoryExpenseRepository = new InMemoryExpenseRepository()
    sut = new FindExpenseUseCase(
      inMemoryExpenseRepository,
      inMemoryUserRepository,
    )
  })

  it('Should to throw if has not valid payer', () => {
    expect(async () => {
      const { payerId, id } = makeExpense()
      await sut.execute({ payerId, expenseId: id })
    }).rejects.toBeInstanceOf(NotFoundError)
  })

  it('Should call UserRepository with correct payerId', async () => {
    const findByIdSpy = vi.spyOn(inMemoryUserRepository, 'findById')
    const user = makeUser()
    await inMemoryUserRepository.add(user)

    const expense = makeExpense({
      payerId: user.id,
    })
    const { payerId, id } = expense
    inMemoryExpenseRepository.add(expense)
    await sut.execute({ payerId, expenseId: id })

    expect(findByIdSpy).toHaveBeenCalledWith(payerId)
  })

  it('Should call UserRepository with correct payerId', () => {
    expect(async () => {
      const { payerId } = makeExpense()
      await sut.execute({ payerId, expenseId: 'wrong-id' })
    }).rejects.toBeInstanceOf(NotFoundError)
  })
})
