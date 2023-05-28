import { Expense, ExpenseProps } from '../../entity/expense'

export const makeExpenseProps = (): ExpenseProps => ({
  id: 'any-id',
  cost: 100,
  description: 'any-description',
  payerId: 'any-payer-id',
  createdAt: new Date(),
})

export const makeExpense = (override?: Partial<Expense>): Expense => {
  return new Expense({
    ...makeExpenseProps(),
    ...override,
  })
}
