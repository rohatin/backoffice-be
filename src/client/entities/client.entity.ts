import { Column, Entity, OneToMany } from 'typeorm'
import { EntityHelper } from '../../utils/entity-helper'
import { cryptDecryptTransformer } from '../../utils/transformers/crypt-decrypt.transformer'
import { User } from '../../user/entities/user.entity'
import { Role } from '../../role/entities/role.entity'

@Entity()
export class Client extends EntityHelper {
  @Column()
  name: string

  @Column({ default: true })
  isActive: boolean

  //api keys should be stored at the database level but encrypted to make leaks harder
  //reason for not hashing them (similar to passwords) is just easier recovery
  @Column({ transformer: cryptDecryptTransformer })
  apiKey: string

  @Column({ type: 'jsonb', default: [] })
  enabledDomains: Array<string>

  @OneToMany(() => User, (user) => user.client)
  users: Array<User>

  @OneToMany(() => Role, (role) => role.client)
  roles: Array<Role>

  //this will save data such as jwt secrets and so on
  @Column({ type: 'json', nullable: true })
  metadata: Record<string, any>
}
