import { Auth } from '@/src/application/repositories/auth'
import { UserRepository } from '@/src/application/repositories/user-repository'
import { injectable } from 'tsyringe'
import { User } from '../entity/user'
import { Hasher } from '@/src/application/repositories/hash'
import { InvalidCredentialsError } from '../errors/invalid-credentials-error'

interface AuthUserUseCaseProps {
  id: string
  username: string
  password: string
}

interface AuthUserUseCaseResponse {
  user: User
  accessToken: string
}

@injectable()
export class AuthUserUseCase {
  constructor(
    private readonly hashRepository: Hasher,
    private readonly userRepository: UserRepository,
    private readonly authRepository: Auth,
  ) {}

  async execute({
    username,
    password,
  }: AuthUserUseCaseProps): Promise<AuthUserUseCaseResponse> {
    const user = await this.userRepository.findByUsername(username)
    if (!user) throw new InvalidCredentialsError()

    const doesPasswordsMatchs = await this.hashRepository.compare(
      password,
      user?.password,
    )
    if (!doesPasswordsMatchs) throw new InvalidCredentialsError()
    const accessToken = await this.authRepository.encrypt(user?.id)

    return {
      user,
      accessToken,
    }
  }
}
