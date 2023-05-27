import { Hasher } from '@/src/application/repositories/hash'
import { User, UserProps } from '../../entity/user'
import {
  RegisterUseCaseProps,
  RegisterUseCaseResponse,
  RegisterUser,
} from '../../use-cases/protocols'

export const makeUserProps = (): UserProps => ({
  id: 'any-id',
  name: 'any-name',
  password: 'any-password',
  username: 'any-username',
})

export const makeUser = (override?: Partial<User>) => {
  return new User({
    ...makeUserProps(),
    ...override,
  })
}

export const makeUserModel = (): RegisterUseCaseProps => ({
  name: 'any-name',
  password: 'any-password',
  username: 'any-username',
})

export const makeHasherStub = (): Hasher => {
  class HasherStub implements Hasher {
    async compare(plaitext: string, digest: string): Promise<boolean> {
      return Promise.resolve(true)
    }

    async hash(plaintext: string, salt: number): Promise<string> {
      return Promise.resolve(plaintext)
    }
  }

  return new HasherStub()
}

export const makeRegisterUserUseCaseStub = (): RegisterUser => {
  class RegisterUserUseCaseStub implements RegisterUser {
    async execute(
      user: RegisterUseCaseProps,
    ): Promise<RegisterUseCaseResponse> {
      return Promise.resolve(null)
    }
  }

  return new RegisterUserUseCaseStub()
}
