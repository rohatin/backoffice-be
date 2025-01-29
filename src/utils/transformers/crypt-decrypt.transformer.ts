import Cryptr from 'cryptr'
import { ValueTransformer } from 'typeorm'

const cryptDecryptTransformer: ValueTransformer = {
  to(value: string): string {
    if (!value) {
      return value
    }
    if (!process.env.CRYPT_KEY) {
      throw new Error('CRYPT_KEY is not defined')
    }
    const cryptr = new Cryptr(process.env.CRYPT_KEY)
    return cryptr.encrypt(value)
  },
  from(value: string): string {
    if (!value) {
      return value
    }
    if (!process.env.CRYPT_KEY) {
      throw new Error('CRYPT_KEY is not defined')
    }
    const cryptr = new Cryptr(process.env.CRYPT_KEY)
    return cryptr.decrypt(value)
  }
}
export { cryptDecryptTransformer }
