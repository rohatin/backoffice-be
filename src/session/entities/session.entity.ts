import {
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
  JoinColumn,
  Column
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
  @JoinColumn({ name: 'userId' })
  user: User

  @Column({ nullable: true })
  userId: number

  @CreateDateColumn()
  createdAt: Date

  @DeleteDateColumn()
  deletedAt: Date
}
