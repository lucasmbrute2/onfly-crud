import jwt from 'jsonwebtoken'
import { Auth } from '../auth'
import { injectable } from 'tsyringe'

@injectable()
export class JwtAdapter implements Auth {
  constructor(private readonly secret: string) {}

  async encrypt(id: string): Promise<string> {
    return jwt.sign({}, this.secret, {
      expiresIn: '7d',
      subject: id,
    })
  }

  async decrypt(ciphertext: string): Promise<string> {
    return jwt.verify(ciphertext, this.secret) as any
  }
}
