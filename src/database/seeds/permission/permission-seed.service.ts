import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Permission } from '../../../role/entities/permission.entity'
import { Repository } from 'typeorm'
import { ActionType } from '../../../role/action-type.enum'
import { ResourceType } from '../../../role/resource-type.enum'

@Injectable()
export class PermissionSeedService {
  constructor(
    @InjectRepository(Permission)
    private repository: Repository<Permission>
  ) {}

  async run() {
    const resources = Object.values(ResourceType)
    const actions = Object.values(ActionType)

    for (const resource of resources) {
      for (const action of actions) {
        const exists = await this.repository.exists({
          where: {
            resource,
            action
          }
        })

        if (!exists) {
          await this.repository.save(
            this.repository.create({
              resource,
              action: action,
              description: `Permission to ${action} ${resource}`,
              name: `${action} ${resource}`
            })
          )
        }
      }
    }
  }
}
