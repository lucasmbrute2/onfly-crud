import { User } from '@prisma/client'

export interface RegisterUseCaseProps {
  name: string
  username: string
  password: string
}

export interface RegisterUseCaseResponse {
  user: User
}

export interface RegisterUser {
  execute(user: RegisterUseCaseProps): Promise<RegisterUseCaseResponse>
}
