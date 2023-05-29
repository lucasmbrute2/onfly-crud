import 'reflect-metadata'
import { InMemoryExpenseRepository } from '@/src/application/repositories/in-memory/in-memory-expense-repository'
import { InMemoryUserRepository } from '@/src/application/repositories/in-memory/in-memory-user-repository'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { makeExpense } from '../tests/factories'
import { NotFoundError } from '@/src/shared/errors/global-errors'
import { makeUser, makeUserPropsWithExpense } from '../../user/tests/factories'
import { UpdateOneExpenseUseCase } from './update-one-use-case'

let sut: UpdateOneExpenseUseCase
let inMemoryUserRepository: InMemoryUserRepository
let inMemoryExpenseRepository: InMemoryExpenseRepository

describe('UpdateOneExpenseUseCase', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()
    inMemoryExpenseRepository = new InMemoryExpenseRepository()
    sut = new UpdateOneExpenseUseCase(
      inMemoryUserRepository,
      inMemoryExpenseRepository,
    )
  })

  it('Should to throw if has not valid payer', () => {
    expect(async () => {
      const { payerId, id } = makeExpense()
      await sut.execute({ payerId, expenseId: id, data: makeExpense() })
    }).rejects.toBeInstanceOf(NotFoundError)
  })

  it('Should call UserRepository with correct payerId', async () => {
    const findByIdSpy = vi.spyOn(inMemoryUserRepository, 'findById')
    const user = makeUser(makeUserPropsWithExpense())
    inMemoryUserRepository.add(user)

    const { id: payerId, expenses } = user
    inMemoryExpenseRepository.add(expenses[0])

    await sut.execute({
      payerId,
      expenseId: expenses[0].id,
      data: makeExpense(),
    })

    expect(findByIdSpy).toHaveBeenCalledWith(payerId, {
      expenses: true,
    })
  })

  it('Should throw NotFoundError if not find expense', () => {
    expect(async () => {
      const { payerId } = makeExpense()
      await sut.execute({ payerId, expenseId: 'wrong-id', data: makeExpense() })
    }).rejects.toBeInstanceOf(NotFoundError)
  })

  it('Should call ExpenseRepository with correct expenseId', async () => {
    const findByIdSpy = vi.spyOn(inMemoryExpenseRepository, 'save')
    const user = makeUser(makeUserPropsWithExpense())
    inMemoryUserRepository.add(user)

    const expense = user.expenses[0]
    await sut.execute({
      expenseId: user.expenses[0].id,
      payerId: user.id,
      data: expense,
    })

    expect(findByIdSpy).toHaveBeenCalledWith(expense)
  })

  it('Should return an updated Expense on success', async () => {
    const user = makeUser(makeUserPropsWithExpense())
    inMemoryUserRepository.add(user)

    const expense = user.expenses[0]
    const response = await sut.execute({
      expenseId: user.expenses[0].id,
      payerId: user.id,
      data: expense,
    })

    expect(response.expense).toMatchObject(expense)
  })
})
