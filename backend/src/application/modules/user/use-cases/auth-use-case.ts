import { UserRepository } from '@/src/application/repositories/user-repository'

export class AuthUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}
}
