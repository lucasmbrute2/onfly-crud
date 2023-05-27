import { User } from '../../modules/user/entity/user'
import { UserRepository } from '../user-repository'

export class InMemoryUserRepository implements UserRepository {
  public users: User[] = []

  async add(userData: User): Promise<User> {
    this.users.push(userData)
    return userData
  }

  async findByUsername(username: string): Promise<User> {
    const user = this.users.find((user) => user.username === username)

    if (!user) return null
    return user
  }

  async findById(id: string): Promise<User> {
    const user = this.users.find((user) => user.id === id)

    if (!user) return null
    return user
  }
}
