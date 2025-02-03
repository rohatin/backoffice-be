import { Controller, UseGuards } from '@nestjs/common'
import { UserService } from './user.service'
import { TypedParam, TypedRoute } from '@nestia/core'
import { User, UserEntity } from '../utils/decorators/user.decorator'
import { WrapResponse } from '../utils/decorators/wrap-response'
import { RequestResponse } from '../utils/types/request-response.type'
import { UserDTO } from './dto/response/user.dto'
import { AuthGuard } from '@nestjs/passport'

@Controller('users')
@WrapResponse()
@UseGuards(AuthGuard('jwt'))
export class UserController {
  constructor(private readonly userService: UserService) {}

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
