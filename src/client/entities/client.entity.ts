import { Column, Entity } from 'typeorm'
import { EntityHelper } from '../../utils/entity-helper'
import { cryptDecryptTransformer } from '../../utils/transformers/crypt-decrypt.transformer'

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
}
