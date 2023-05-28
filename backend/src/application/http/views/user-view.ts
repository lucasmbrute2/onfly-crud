import { User } from '../../modules/user/entity/user'

export class UserView {
  static toHttp(user: User): Partial<User> {
    return {
      id: user.id,
      name: user.name,
      username: user.username,
    }
  }
}
