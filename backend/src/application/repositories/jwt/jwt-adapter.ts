import jwt from 'jsonwebtoken'
import { Auth } from '../auth'

export class JwtAdapter implements Auth {
  constructor(private readonly secret: string) {}

  async encrypt(plaintext: string): Promise<string> {
    return jwt.sign({ id: plaintext }, this.secret)
  }

  async decrypt(ciphertext: string): Promise<string> {
    return jwt.verify(ciphertext, this.secret) as any
  }
}
