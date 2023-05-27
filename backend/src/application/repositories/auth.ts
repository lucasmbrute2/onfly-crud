export interface Auth {
  encrypt: (plaintext: string) => Promise<string>
  decrypt: (ciphertext: string) => Promise<string>
}
