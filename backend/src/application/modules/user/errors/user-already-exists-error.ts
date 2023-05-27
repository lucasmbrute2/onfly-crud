import { AppError } from '@/src/shared/errors/global-errors'

export class UserAlreadyExistsError extends AppError {
  constructor() {
    super('User already exists', 409)
  }
}
