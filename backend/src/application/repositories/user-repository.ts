import { User } from '../modules/user/entity/user'

export interface UserRepository {
  add(userData: User): Promise<User | null>
  findByUsername(username: string): Promise<User | null>
  findById(id: string): Promise<User | null>
}
