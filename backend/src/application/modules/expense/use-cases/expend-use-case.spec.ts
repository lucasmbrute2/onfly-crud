import 'reflect-metadata'
import { InMemoryUserRepository } from '@/src/application/repositories/in-memory/in-memory-user-repository'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { ExpendUseCase } from './expend-use-case'
import { InMemoryExpenseRepository } from '@/src/application/repositories/in-memory/in-memory-expense-repository'
import { makeExpense, makeMailProvider } from '../tests/factories'
import { NotFoundError } from '@/src/shared/errors/global-errors'
import { makeUser } from '../../user/tests/factories'
import { Expense } from '../entity/expense'

let sut: ExpendUseCase
let inMemoryUserRepository: InMemoryUserRepository
let inMemoryExpenseRepository: InMemoryExpenseRepository

const mailProviderStub = makeMailProvider()

describe('Expend Use Case ', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()
    inMemoryExpenseRepository = new InMemoryExpenseRepository()
    sut = new ExpendUseCase(
      inMemoryExpenseRepository,
      inMemoryUserRepository,
      mailProviderStub,
    )
  })

  it('Should be passed correct values to UserRepository', async () => {
    const hashFindById = vi.spyOn(inMemoryUserRepository, 'findById')
    const user = makeUser()
    const expense = makeExpense({
      payerId: user.id,
    })
    await inMemoryUserRepository.add(user)
    await sut.execute(expense)
    expect(hashFindById).toHaveBeenCalledWith(expense.id)
  })

  it('Should not be able to create an Expense without an valid user', () => {
    expect(async () => {
      const expense = makeExpense()
      await sut.execute(expense)
    }).rejects.toBeInstanceOf(NotFoundError)
  })

  it('Should return an expense on success', async () => {
    const user = makeUser()
    const expense = makeExpense({
      payerId: user.id,
    })
    await inMemoryUserRepository.add(user)

    const response = await sut.execute(expense)
    expect(response.expense).toBeInstanceOf(Expense)
  })

  it('Should call MailProvider with correct valus', async () => {
    const sendMailSpy = vi.spyOn(mailProviderStub, 'sendMail')
    const user = makeUser()
    const expense = makeExpense({
      payerId: user.id,
    })
    await inMemoryUserRepository.add(user)

    await sut.execute(expense)
    expect(sendMailSpy).toHaveBeenCalledWith({
      subject: 'New expense',
      to: user.username,
      context: {
        name: user.name,
      },
    })
  })
})
