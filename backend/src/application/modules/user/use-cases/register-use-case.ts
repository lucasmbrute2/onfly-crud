import { UserRepository } from '@/src/application/repositories/user-repository'
import { UserAlreadyExistsError } from '../errors/user-already-exists-error'
import { User } from '../entity/user'
import { Hasher } from '@/src/application/repositories/hash'
import { inject, injectable } from 'tsyringe'
import {
  RegisterUseCaseProps,
  RegisterUseCaseResponse,
  RegisterUser,
} from './protocols/register-user'

@injectable()
export class RegisterUseCase implements RegisterUser {
  constructor(
    @inject('Hasher')
    private readonly hasher: Hasher,
    @inject('UserRepository')
    private readonly userRepository: UserRepository,
  ) {}

  async execute({
    name,
    password,
    username,
  }: RegisterUseCaseProps): Promise<RegisterUseCaseResponse> {
    const userAlreadyExists = await this.userRepository.findByUsername(username)
    if (userAlreadyExists) throw new UserAlreadyExistsError()

    const incryptedPassword = await this.hasher.hash(password, 6)

    const user = new User({
      name,
      password: incryptedPassword,
      username,
    })

    await this.userRepository.add(user)

    return {
      user,
    }
  }
}
