import { ValueTransformer } from 'typeorm'

const decimalTransformer: ValueTransformer = {
  to(value: number): number {
    return value
  },
  from(value: string): number {
    //create null check
    return parseFloat(value ?? 0)
  }
}
export { decimalTransformer }
