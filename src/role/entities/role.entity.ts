import {
  Column,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne
} from 'typeorm'
import { EntityHelper } from '../../utils/entity-helper'
import { Permission } from './permission.entity'
import { User } from '../../user/entities/user.entity'
import { Client } from '../../client/entities/client.entity'

@Entity()
@Index(['name', 'clientId'], { unique: true })
export class Role extends EntityHelper {
  @Column()
  name: string

  @Column({ nullable: true })
  description: string

  @ManyToMany(() => Permission, (permission) => permission.roles)
  @JoinTable({
    name: 'role_permissions',
    joinColumn: { name: 'roleId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'permissionId', referencedColumnName: 'id' }
  })
  permissions: Array<Permission>

  @ManyToMany(() => User, (user) => user.roles)
  users: Array<User>

  @ManyToOne(() => Client, (client) => client.roles)
  @JoinColumn({ name: 'clientId' })
  client: Client

  @Column()
  clientId: number
}
