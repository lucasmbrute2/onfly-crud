import 'reflect-metadata'
import { Hasher } from '@/src/application/repositories/hash'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { AuthUserUseCase } from './auth-use-case'
import { InMemoryUserRepository } from '@/src/application/repositories/in-memory/in-memory-user-repository'
import { makeAuthStub, makeHasherStub, makeUser } from '../tests/factories'
import { Auth } from '@/src/application/repositories/auth'
import { InvalidCredentialsError } from '../errors/invalid-credentials-error'
import { User } from '../entity/user'

let sut: AuthUserUseCase
let inMemoryUserRepository: InMemoryUserRepository
let hasherStub: Hasher
let authStub: Auth

describe('Auth use case', () => {
  beforeEach(() => {
    hasherStub = makeHasherStub()
    authStub = makeAuthStub()
    inMemoryUserRepository = new InMemoryUserRepository()
    sut = new AuthUserUseCase(hasherStub, inMemoryUserRepository, authStub)
  })

  it('Should call Hasher Repository with correct values', async () => {
    const hashSpy = vi.spyOn(hasherStub, 'compare')
    const user = makeUser()

    inMemoryUserRepository.add(user)
    await sut.execute(user)

    expect(hashSpy).toHaveBeenCalledWith(user.password, user.password)
  })

  it('Should return InvalidCredentialsError if passwords miss matchs', async () => {
    expect(async () => {
      vi.spyOn(hasherStub, 'compare').mockReturnValueOnce(
        Promise.resolve(false),
      )

      const user = makeUser()
      inMemoryUserRepository.add(user)
      await sut.execute(user)
    }).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('Should call Auth Repository with correct values', async () => {
    const authSpy = vi.spyOn(authStub, 'encrypt')
    const user = makeUser()

    inMemoryUserRepository.add(user)
    await sut.execute(user)

    expect(authSpy).toHaveBeenCalledWith(user.id)
  })

  it('Should return InvalidCredentialsError if user does not exists', async () => {
    expect(async () => {
      const user = makeUser()
      await sut.execute(user)
    }).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('Should return an User and access token on success', async () => {
    const user = makeUser()
    inMemoryUserRepository.add(user)
    const response = await sut.execute(user)

    expect(response.accessToken).toBeTruthy()
    expect(response.user).toBeInstanceOf(User)
  })
})
