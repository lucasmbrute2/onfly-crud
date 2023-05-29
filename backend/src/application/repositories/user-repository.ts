import { User } from '../modules/user/entity/user'

export interface IncludeRelation {
  expenses: boolean
}

export interface UserRepository {
  add(userData: User): Promise<User | null>
  findByUsername(
    username: string,
    includeRelation?: IncludeRelation,
  ): Promise<User | null>
  findById(id: string, includeRelation?: IncludeRelation): Promise<User | null>
}
