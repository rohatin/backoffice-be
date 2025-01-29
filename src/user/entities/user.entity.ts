import {
  Column,
  Entity,
  Index,
  ManyToMany,
  JoinTable,
  ManyToOne,
  JoinColumn
} from 'typeorm'
import { EntityHelper } from '../../utils/entity-helper'
import { Role } from '../../role/entities/role.entity'
import { Client } from '../../client/entities/client.entity'

@Entity()
@Index(['clientId', 'email'], { unique: true })
export class User extends EntityHelper {
  @Column()
  email: string

  @Column()
  passwordHash: string

  @Column({ type: 'jsonb', default: [] })
  previousPasswordHashes: Array<string>

  @Column({ nullable: false })
  @Index({ unique: false })
  roleId: number

  //an user can be assigned to many roles
  //basic example is operator and client
  @ManyToMany(() => Role)
  @JoinTable({
    name: 'user_roles',
    joinColumn: { name: 'userId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'roleId', referencedColumnName: 'id' }
  })
  roles: Array<Role>

  @ManyToOne(() => Client, (client) => client.users)
  @JoinColumn({ name: 'clientId' })
  client: Client

  @Column()
  clientId: number
}
