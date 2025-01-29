import {
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
    const role = await this.roleRepository
      .createQueryBuilder('role')
      .innerJoin('role.permissions', 'permission')
      .innerJoin('user_roles', 'ur', 'ur.roleId = role.id')
      .where('ur.userId = :userId', { userId })
      .andWhere('permission.resource = :resource', { resource })
      .andWhere(':action = ANY(permission.action)', { action })
      .getOne()

    if (!role) {
      throw new UnauthorizedException(
        `You are not allowed to perform this action. Action in cause: ${ActionType.view} and resource in cause: ${ResourceType.role}`
      )
    }
  }

  async create(userId: number, createRoleDto: CreateRoleDTO): Promise<Role> {
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
      permissions: allPermissions
    })
    const dbRole = await this.roleRepository.save(role)
    return dbRole[0]
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
