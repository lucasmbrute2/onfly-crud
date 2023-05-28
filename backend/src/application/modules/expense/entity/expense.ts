import { randomUUID } from 'crypto'
import { InvalidCredentialsError } from '../../user/errors/invalid-credentials-error'

export interface ExpenseProps {
  id?: string
  description: string
  createdAt?: Date
  cost: number
  payerId: string
}

export class Expense {
  private readonly MAX_CHAR_LENGTH = 191

  constructor(private props: ExpenseProps) {
    this.validateDescriptionSize()
    this.props = {
      ...props,
      id: this.props.id ?? randomUUID(),
      createdAt: this.props.createdAt ?? new Date(),
    }
  }

  private validateDescriptionSize() {
    if (this.props.description.length > this.MAX_CHAR_LENGTH) {
      throw new InvalidCredentialsError(
        `Description should not be greater than ${this.MAX_CHAR_LENGTH} characters`,
      )
    }
  }

  set id(id: string) {
    this.props.id = id
  }

  get id(): string {
    return this.props.id
  }

  get description(): string {
    return this.props.description
  }

  set description(description: string) {
    this.props.description = description
  }

  get createdAt(): Date {
    return this.props.createdAt
  }

  set createdAt(createdAt: Date) {
    this.props.createdAt = createdAt
  }

  get cost(): number {
    return this.props.cost
  }

  set cost(cost: number) {
    this.props.cost = cost
  }

  get payerId(): string {
    return this.props.payerId
  }

  set payerId(payerId: string) {
    this.props.payerId = payerId
  }
}
