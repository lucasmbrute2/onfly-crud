import { AppError } from '@/src/shared/errors/global-errors'

export class InvalidCredentialsError extends AppError {
  constructor(message?: string) {
    super(message ?? 'Invalid credentials', 401)
  }
}
