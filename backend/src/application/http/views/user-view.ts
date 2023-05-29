import { User } from '../../modules/user/entity/user'

interface HideProperties {
  hideExpenses?: boolean
}

export class UserView {
  static toHttp(user: User, HideProperties?: HideProperties): Partial<User> {
    const response: Partial<User> = {
      id: user.id,
      name: user.name,
      username: user.username,
    }

    if (!HideProperties?.hideExpenses) {
      response.expenses = user.expenses
    }

    return response
  }
}
