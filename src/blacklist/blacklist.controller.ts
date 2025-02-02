import { Controller } from '@nestjs/common'
import { BlacklistService } from './blacklist.service'
import { TypedBody, TypedParam, TypedRoute } from '@nestia/core'
import { BanUserDTO } from './dto/request/ban-user.dto'
import { User, UserEntity } from '../utils/decorators/user.decorator'
import { WrapResponse } from '../utils/decorators/wrap-response'
import { RequestResponse } from '../utils/types/request-response.type'
import { BlacklistDTO } from './dto/response/blacklist.dto'

@Controller('blacklist')
@WrapResponse()
export class BlacklistController {
  constructor(private readonly blacklistService: BlacklistService) {}

  @TypedRoute.Post('ban')
  async banUser(
    @User() user: UserEntity,
    @TypedBody() banData: BanUserDTO
  ): Promise<RequestResponse<BlacklistDTO>> {
    return {
      data: await this.blacklistService.banUser(user.id, banData),
      message: 'User banned successfully',
      status: true
    }
  }

  @TypedRoute.Post('unban/:userId')
  async unbanUser(
    @User() user: UserEntity,
    @TypedParam('userId') userId: number
  ): Promise<RequestResponse<void>> {
    return {
      data: await this.blacklistService.unbanUser(user.id, userId),
      message: 'User unbanned successfully',
      status: true
    }
  }
}
