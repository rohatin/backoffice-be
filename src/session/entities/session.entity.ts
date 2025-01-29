import {
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
  DeleteDateColumn
} from 'typeorm'
import { EntityHelper } from '../../utils/entity-helper'
import { User } from '../../user/entities/user.entity'

@Entity()
export class Session extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => User, {
    eager: true
  })
  @Index()
  user: User

  @CreateDateColumn()
  createdAt: Date

  @DeleteDateColumn()
  deletedAt: Date
}
