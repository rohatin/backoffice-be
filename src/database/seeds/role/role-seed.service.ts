import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Role } from '../../../role/entities/role.entity'
import { Permission } from '../../../role/entities/permission.entity'
import { ActionType } from '../../../role/action-type.enum'
import { Client } from '../../../client/entities/client.entity'

@Injectable()
export class RoleSeedService {
  constructor(
    @InjectRepository(Role)
    private repository: Repository<Role>,
    @InjectRepository(Permission)
    private permissionRepository: Repository<Permission>
  ) {}

  async run(client: Client) {
    // Get all permissions
    const allPermissions = await this.permissionRepository.find()
    const viewPermissions = allPermissions.filter((p) =>
      p.action.includes(ActionType.view)
    )

    // Create admin role with all permissions
    const adminExists = await this.repository.count({
      where: { name: 'admin', clientId: client.id }
    })

    if (!adminExists) {
      await this.repository.save(
        this.repository.create({
          name: 'admin',
          description: 'Administrator role with full access',
          permissions: allPermissions,
          clientId: client.id
        })
      )
    }

    // Create moderator role with view permissions only
    const moderatorExists = await this.repository.count({
      where: { name: 'moderator', clientId: client.id }
    })

    if (!moderatorExists) {
      await this.repository.save(
        this.repository.create({
          name: 'moderator',
          description: 'Moderator role with view-only access',
          permissions: viewPermissions,
          clientId: client.id
        })
      )
    }

    // Create basic user role with no permissions
    const userExists = await this.repository.count({
      where: { name: 'user', clientId: client.id }
    })

    if (!userExists) {
      await this.repository.save(
        this.repository.create({
          name: 'user',
          description: 'Basic user role with no special permissions',
          permissions: [],
          clientId: client.id
        })
      )
    }
  }
}
