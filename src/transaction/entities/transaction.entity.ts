import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { EntityHelper } from '../../utils/entity-helper'
import { TransactionType } from '../enum/transaction-type.enum'
import { TransactionSubType } from '../enum/transaction-subtype.enum'
import { decimalTransformer } from '../../utils/transformers/decimal.transformer'
import { TransactionStatus } from '../enum/transaction-status.enum'
import { User } from '../../user/entities/user.entity'
@Entity()
export class Transaction extends EntityHelper {
  @Column({ type: 'enum', enum: TransactionType })
  type: TransactionType

  @Column({ type: 'enum', enum: TransactionSubType })
  subType: TransactionSubType

  @Column({ type: 'double precision', transformer: decimalTransformer })
  amount: number

  @Column({ type: 'enum', enum: TransactionStatus })
  status: TransactionStatus

  @ManyToOne(() => User, (user) => user.transactions)
  @JoinColumn({ name: 'userId' })
  user: User

  @Column({ nullable: false, unique: false })
  userId: number
}
