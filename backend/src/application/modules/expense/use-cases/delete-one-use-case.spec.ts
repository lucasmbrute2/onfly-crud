import 'reflect-metadata'
import { InMemoryExpenseRepository } from '@/src/application/repositories/in-memory/in-memory-expense-repository'
import { InMemoryUserRepository } from '@/src/application/repositories/in-memory/in-memory-user-repository'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { makeExpense } from '../tests/factories'
import {
  makeUser,
  makeUserPropsWithExpense,
  makeUserProps,
} from '../../user/tests/factories'
import { DeleteOneUseCase } from './delete-one-use-case'
import { Forbidden, NotFoundError } from '@/src/shared/errors/global-errors'

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
    const user = makeUser(makeUserPropsWithExpense())
    inMemoryUserRepository.add(user)

    await inMemoryUserRepository.add(user)

    const { id: payerId, expenses } = user
    await sut.execute({ payerId, expenseId: expenses[0].id })

    expect(findByIdSpy).toHaveBeenCalledWith(payerId)
  })

  it('Should return Forbidden if User is not owner of the Expense', () => {
    expect(async () => {
      const user = makeUser(makeUserProps())
      inMemoryUserRepository.add(user)

      await sut.execute({
        expenseId: 'wrong-id33',
        payerId: user.id,
      })
    }).rejects.toBeInstanceOf(Forbidden)
  })

  it('Should call ExpenseRepository with correct expenseId', async () => {
    const findByIdSpy = vi.spyOn(inMemoryExpenseRepository, 'deleteOne')
    const user = makeUser(makeUserPropsWithExpense())
    inMemoryUserRepository.add(user)

    await sut.execute({
      expenseId: user.expenses[0].id,
      payerId: user.id,
    })

    expect(findByIdSpy).toHaveBeenCalledWith(user.id)
  })

  it('Should delete an Expense on success', async () => {
    const user = makeUser(makeUserPropsWithExpense())
    await inMemoryUserRepository.add(user)

    await sut.execute({
      expenseId: user.expenses[0].id,
      payerId: user.id,
    })

    const expense = await inMemoryExpenseRepository.findById(
      user.expenses[0].id,
    )
    expect(expense).toBeFalsy()
  })
})
