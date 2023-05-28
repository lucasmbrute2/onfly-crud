import { describe, expect, it } from 'vitest'
import { makeExpense } from '../tests/factories'
import { Expense } from './expense'
import { InvalidCredentialsError } from '../../user/errors/invalid-credentials-error'
import { InvalidCostError } from '../../user/errors/invalid-cost-error'
import { AppError } from '@/src/shared/errors/global-errors'

interface SutTypes {
  sut: Expense
}

const makeSut = (): SutTypes => {
  const expense = makeExpense()
  return {
    sut: expense,
  }
}
describe('Expense entity', () => {
  it('Should be able to instance Expense with correct values', () => {
    const { sut } = makeSut()

    expect(sut).toBeInstanceOf(Expense)
  })

  it('Should throw InvalidCredentialsError if Expense has a description greaten than maximum characters allowed', () => {
    expect(() => {
      makeExpense({
        description: 'a'.repeat(192),
      })
    }).toThrow(InvalidCredentialsError)
  })

  it('Should throw InvalidCostError if cost is lower than min cost allowed', () => {
    expect(() => {
      makeExpense({
        cost: 0,
      })
    }).toThrow(InvalidCostError)
  })

  it('Should throw AppError if cost is lower than min cost allowed', () => {
    expect(() => {
      makeExpense({
        createdAt: new Date(new Date().setDate(new Date().getDate() + 1)),
      })
    }).toThrow(AppError)
  })
})
