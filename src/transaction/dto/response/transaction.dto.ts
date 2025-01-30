import { TransactionStatus } from '../../enum/transaction-status.enum'
import { TransactionSubType } from '../../enum/transaction-subtype.enum'
import { TransactionType } from '../../enum/transaction-type.enum'

export type TransactionDTO = {
  id: number
  type: TransactionType
  subType: TransactionSubType
  amount: number
  status: TransactionStatus
  userId: number
  createdAt: Date
  updatedAt: Date
}
