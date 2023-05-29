import { Mail, MailProps } from '@/src/application/repositories/mail'
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

export const makeMailProvider = (): Mail => {
  class MailProviderStub implements Mail {
    async sendMail(mailData: MailProps): Promise<void> {
      return Promise.resolve(null)
    }
  }

  return new MailProviderStub()
}
