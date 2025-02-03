import { Controller, UseGuards } from '@nestjs/common'
import { UserService } from './user.service'
import { TypedParam, TypedRoute } from '@nestia/core'
import { User, UserEntity } from '../utils/decorators/user.decorator'
import { WrapResponse } from '../utils/decorators/wrap-response'
import { RequestResponse } from '../utils/types/request-response.type'
import { UserDTO } from './dto/response/user.dto'
import { AuthGuard } from '@nestjs/passport'
import { ClientDecorator } from '../utils/decorators/client.decorator'
import { Client } from '../client/entities/client.entity'

@Controller('users')
@WrapResponse()
@UseGuards(AuthGuard('jwt'))
export class UserController {
  constructor(private readonly userService: UserService) {}

  @TypedRoute.Get('all')
  async findAll(
    @User() user: UserEntity,
    @ClientDecorator() client: Client
  ): Promise<RequestResponse<UserDTO[]>> {
    return {
      data: await this.userService.findAllForClient(user.id, client.id),
      message: 'ok',
      status: true
    }
  }

  @TypedRoute.Get(':userId')
  async findById(
    @User() user: UserEntity,
    @TypedParam('userId') targetUserId: number
  ): Promise<RequestResponse<UserDTO>> {
    return {
      data: await this.userService.findByIdWithCheck(user.id, targetUserId),
      message: 'ok',
      status: true
    }
  }
}
