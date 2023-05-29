import 'reflect-metadata'
import { vi, expect, describe, it, beforeEach } from 'vitest'
import { makeUserModel, makeHasherStub, makeUser } from '../tests/factories'
import { RegisterUseCase } from './register-use-case'
import { InMemoryUserRepository } from '@/src/application/repositories/in-memory/in-memory-user-repository'
import { Hasher } from '@/src/application/repositories/hash'
import { User } from '../entity/user'
import { UserAlreadyExistsError } from '../errors/user-already-exists-error'

let sut: RegisterUseCase
let inMemoryUserRepository: InMemoryUserRepository
let hasherStub: Hasher

describe('Register author use case', () => {
  beforeEach(() => {
    hasherStub = makeHasherStub()
    inMemoryUserRepository = new InMemoryUserRepository()
    sut = new RegisterUseCase(hasherStub, inMemoryUserRepository)
  })

  it('Should call Hasher with correct plaintext', async () => {
    const hashSpy = vi.spyOn(hasherStub, 'hash')
    const addUserParams = makeUserModel()
    await sut.execute(addUserParams)
    expect(hashSpy).toHaveBeenCalledWith(addUserParams.password, 6)
  })

  it('Should throw if Hasher throws', async () => {
    vi.spyOn(hasherStub, 'hash').mockRejectedValueOnce(
      Promise.resolve(new Error()),
    )
    const promise = sut.execute(makeUserModel())
    await expect(promise).rejects.toThrow()
  })

  it('Should call AddUserRepository with correct values', async () => {
    const addSpy = vi.spyOn(inMemoryUserRepository, 'add')
    const userModel = makeUserModel()

    const user = makeUser(userModel)
    const response = await sut.execute(user)

    const userToCompare = makeUser({
      ...userModel,
      id: response.user.id,
    })
    expect(addSpy).toHaveBeenCalledWith(userToCompare)
  })

  it('Should be able to register an User', async () => {
    const userModel = makeUserModel()
    const response = await sut.execute(userModel)

    expect(inMemoryUserRepository.users).toHaveLength(1)
    expect(inMemoryUserRepository.users[0]).toBeInstanceOf(User)
    expect(response.user).toMatchObject({
      ...makeUserModel,
      id: response.user.id,
    })
  })

  it('Should thrown UserAlreadyExistsError if user is already registered', async () => {
    expect(async () => {
      const userModel = makeUserModel()
      await sut.execute(userModel)
      await sut.execute(userModel)
    }).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
