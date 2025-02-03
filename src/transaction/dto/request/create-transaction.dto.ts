import { TransactionType } from '../../enum/transaction-type.enum'
import { TransactionSubType } from '../../enum/transaction-subtype.enum'
import { TransactionStatus } from '../../enum/transaction-status.enum'

export type CreateTransactionDTO = {
  type: TransactionType
  subType: TransactionSubType
  amount: number
  status: TransactionStatus
  userId: number
  description: string
}
