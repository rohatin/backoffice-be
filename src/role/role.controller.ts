import { Controller } from '@nestjs/common'
import { RoleService } from './role.service'
import { TypedBody, TypedRoute } from '@nestia/core'
import { CreateRoleDTO } from './dto/request/create-role.dto'
import { UpdateRolePermissionsDTO } from './dto/request/update-role-permissions.dto'
import { User, UserEntity } from '../utils/decorators/user.decorator'
import { ClientDecorator } from '../utils/decorators/client.decorator'
import { Client } from '../client/entities/client.entity'
import { WrapResponse } from '../utils/decorators/wrap-response'
import { RequestResponse } from '../utils/types/request-response.type'
import { RoleDTO } from './dto/response/role.dto'

@Controller('roles')
@WrapResponse()
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @TypedRoute.Get()
  async findAll(
    @ClientDecorator() client: Client,
    @User() user: UserEntity
  ): Promise<RequestResponse<Array<RoleDTO>>> {
    return {
      data: await this.roleService.findAllForClient(user.id, client.id),
      message: 'ok',
      status: true
    }
  }

  @TypedRoute.Post()
  async create(
    @User() user: UserEntity,
    @TypedBody() createRoleDto: CreateRoleDTO
  ): Promise<RequestResponse<RoleDTO>> {
    return {
      data: await this.roleService.create(user.id, createRoleDto),
      message: 'ok',
      status: true
    }
  }

  @TypedRoute.Patch()
  async updatePermissions(
    @User() user: UserEntity,
    @TypedBody() updatePermissionsDto: UpdateRolePermissionsDTO
  ): Promise<RequestResponse<RoleDTO>> {
    return {
      data: await this.roleService.updatePermissions(
        user.id,
        updatePermissionsDto.roleId,
        updatePermissionsDto.permissions
      ),
      message: 'ok',
      status: true
    }
  }
}
