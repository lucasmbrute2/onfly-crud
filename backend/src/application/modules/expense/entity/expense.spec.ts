import { describe, expect, it } from 'vitest'
import { makeExpense } from '../tests/factories'
import { Expense } from './expense'
import { InvalidCredentialsError } from '../../user/errors/invalid-credentials-error'

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
})
