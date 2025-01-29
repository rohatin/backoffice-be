import { Column, Entity, ManyToMany } from 'typeorm'
import { EntityHelper } from '../../utils/entity-helper'
import { ActionType } from '../action-type.enum'
import { ResourceType } from '../resource-type.enum'
import { Role } from './role.entity'

@Entity()
export class Permission extends EntityHelper {
  @Column()
  name: string

  @Column({ nullable: true })
  description: string

  @Column({ type: 'enum', enum: ActionType })
  action: ActionType

  @Column({ type: 'enum', enum: ResourceType })
  resource: ResourceType

  @ManyToMany(() => Role, (role) => role.permissions)
  roles: Array<Role>
}
