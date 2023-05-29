import 'reflect-metadata'
import { InMemoryExpenseRepository } from '@/src/application/repositories/in-memory/in-memory-expense-repository'
import { InMemoryUserRepository } from '@/src/application/repositories/in-memory/in-memory-user-repository'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { makeExpense } from '../tests/factories'
import { makeUser } from '../../user/tests/factories'
import { DeleteOneUseCase } from './delete-one-use-case'
import { NotFoundError } from '@/src/shared/errors/global-errors'

let sut: DeleteOneUseCase
let inMemoryUserRepository: InMemoryUserRepository
let inMemoryExpenseRepository: InMemoryExpenseRepository

describe('DeleteOne use case', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()
    inMemoryExpenseRepository = new InMemoryExpenseRepository()
    sut = new DeleteOneUseCase(
      inMemoryUserRepository,
      inMemoryExpenseRepository,
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
})
