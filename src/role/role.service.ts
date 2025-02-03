import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { In, Repository } from 'typeorm'
import { Role } from './entities/role.entity'
import { Permission } from './entities/permission.entity'
import { ActionType } from './action-type.enum'
import { ResourceType } from './resource-type.enum'
import { CreateRoleDTO } from './dto/request/create-role.dto'

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>
  ) {}

  async findAllForClient(userId: number, clientId: number) {
    await this.checkAccessFor(userId, ActionType.view, ResourceType.role)

    return this.roleRepository.find({
      where: { clientId },
      relations: ['permissions']
    })
  }

  /**
   * Check if a user has access to perform a certain action on a resource type.
   * @param userId id of the user to check
   * @param action action to check
   * @param resource resource type to check
   * @throws UnauthorizedException if the user does not have access
   */
  async checkAccessFor(
    userId: number,
    action: ActionType,
    resource: ResourceType
  ): Promise<void> {
    const count = await this.roleRepository
      .createQueryBuilder()
      .select('COUNT(*)')
      .from('role_permissions', 'rp')
      .where((qb) => {
        const subQuery = qb
          .subQuery()
          .select('id')
          .from('permission', 'p')
          .where('p.action = :action')
          .andWhere('p.resource = :resource')
          .getQuery()
        return '"permissionId" IN ' + subQuery
      })
      .andWhere((qb) => {
        const subQuery = qb
          .subQuery()
          .select('id')
          .from('role', 'r')
          .where((qb2) => {
            const subQuery2 = qb2
              .subQuery()
              .select('DISTINCT("roleId")')
              .from('user_roles', 'ur')
              .where('ur."userId" = :userId')
              .getQuery()
            return 'id IN ' + subQuery2
          })
          .getQuery()
        return '"roleId" IN ' + subQuery
      })
      .setParameters({ action, resource, userId })
      .getRawOne()

    if (!count || count.count === '0') {
      throw new UnauthorizedException(
        `You are not allowed to perform this action. Action in cause: ${action} and resource in cause: ${resource}`
      )
    }
  }

  async getAllPermissions(
    userId: number,
    clientId: number
  ): Promise<Permission[]> {
    await this.checkAccessFor(userId, ActionType.view, ResourceType.role)
    const allRoles = await this.roleRepository.find({
      where: { clientId }
    })
    return this.permissionRepository.find({
      where: {
        roles: {
          id: In(allRoles.map((role) => role.id))
        }
      }
    })
  }

  async create(
    userId: number,
    clientId: number,
    createRoleDto: CreateRoleDTO
  ): Promise<Role> {
    await this.checkAccessFor(userId, ActionType.create, ResourceType.role)

    //fetching all permissions would not be the best (but not as bad) in a real scenario but it will save me a lot of time
    const allPermissions = await this.permissionRepository.find({
      where: {
        id: In(createRoleDto.permissionIds)
      }
    })

    if (
      allPermissions.filter((elm) => elm.resource === ResourceType.admin)
        .length > 0
    ) {
      //some is trying to add admin priviliges to a new role
      //for this they need to be already an admin
      await this.checkAccessFor(userId, ActionType.create, ResourceType.admin)
    }

    const role = this.roleRepository.create({
      name: createRoleDto.name,
      description: createRoleDto.description,
      permissions: allPermissions,
      clientId: clientId
    })
    const dbRole = await this.roleRepository.save(role)
    return Array.isArray(dbRole) ? dbRole[0] : dbRole
  }

  async updatePermissions(
    userId: number,
    roleId: number,
    permissionIds: Array<number>
  ): Promise<Role> {
    await this.checkAccessFor(roleId, ActionType.update, ResourceType.role)
    const role = await this.roleRepository.findOne({
      where: { id: roleId },
      relations: ['permissions']
    })

    if (!role) {
      throw new NotFoundException('Role not found')
    }

    if (role.name === 'admin') {
      throw new BadRequestException('Admin role cannot be modified')
    }

    const allPermissions = await this.permissionRepository.find({
      where: {
        id: In(permissionIds)
      }
    })

    if (
      allPermissions.filter((elm) => elm.resource === ResourceType.admin)
        .length > 0
    ) {
      //some is trying to add admin priviliges to a new role
      //for this they need to be already an admin
      await this.checkAccessFor(userId, ActionType.create, ResourceType.admin)
    } else if (
      role.permissions.filter((elm) => elm.resource === ResourceType.admin)
        .length > 0
    ) {
      await this.checkAccessFor(userId, ActionType.delete, ResourceType.admin)
    }

    role.permissions = allPermissions
    return this.roleRepository.save(role)
  }
}
