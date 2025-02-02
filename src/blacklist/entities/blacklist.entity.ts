import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm'
import { User } from '../../user/entities/user.entity'
import { EntityHelper } from '../../utils/entity-helper'

@Entity('blacklist')
export class Blacklist extends EntityHelper {
  @Column()
  userId: number

  @Column({ type: 'timestamp' })
  expiresAt: Date

  @Column({ nullable: true })
  reason?: string

  @Column({ default: true })
  isActive: boolean

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User
}
