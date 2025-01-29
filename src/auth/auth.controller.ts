import { Controller, Request } from '@nestjs/common'
import { AuthService } from './auth.service'
import { TypedBody, TypedRoute } from '@nestia/core'
import { InitiateLoginDTO } from './dto/request/initiate-login.dto'
import { WrapResponse } from '../utils/decorators/wrap-response'
import { RequestResponse } from '../utils/types/request-response.type'
import { AuthSessionDTO } from './dto/response/auth-session.dto'
import { Client } from '../client/entities/client.entity'
import { ClientDecorator } from '../utils/decorators/client.decorator'

@Controller('auth')
@WrapResponse()
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @TypedRoute.Post('login')
  async login(
    @ClientDecorator() client: Client,
    @TypedBody() body: InitiateLoginDTO
  ): Promise<RequestResponse<AuthSessionDTO>> {
    return {
      data: await this.service.validateLogin(client, body),
      message: 'ok',
      status: true
    }
  }

  @TypedRoute.Get('refresh')
  async refresh(
    @ClientDecorator() client: Client,
    @Request() request
  ): Promise<RequestResponse<AuthSessionDTO>> {
    return {
      data: await this.service.refreshToken(client, request.user.sessionId),
      message: 'ok',
      status: true
    }
  }

  @TypedRoute.Post('logout')
  async logout(@Request() request): Promise<RequestResponse<null>> {
    await this.service.logout(request.user.sessionId)
    return {
      data: null,
      message: 'ok',
      status: true
    }
  }
}
