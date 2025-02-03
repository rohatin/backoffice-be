import { Controller, Request, UseGuards } from '@nestjs/common'
import { AuthService } from './auth.service'
import { TypedBody, TypedRoute } from '@nestia/core'
import { InitiateLoginDTO } from './dto/request/initiate-login.dto'
import { WrapResponse } from '../utils/decorators/wrap-response'
import { RequestResponse } from '../utils/types/request-response.type'
import { AuthSessionDTO } from './dto/response/auth-session.dto'
import { Client } from '../client/entities/client.entity'
import { ClientDecorator } from '../utils/decorators/client.decorator'
import { ChangePasswordDTO } from './dto/request/change-password.dto'
import { AuthGuard } from '@nestjs/passport'
import { User } from '../utils/decorators/user.decorator'
import { UserEntity } from '../utils/decorators/user.decorator'
import { AdminRegisterDTO } from './dto/request/admin-register.dto'

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
  @UseGuards(AuthGuard('jwt-refresh'))
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

  @TypedRoute.Post('admin-register')
  @UseGuards(AuthGuard('jwt'))
  async adminRegister(
    @User() user: UserEntity,
    @ClientDecorator() client: Client,
    @TypedBody() body: AdminRegisterDTO
  ): Promise<RequestResponse<null>> {
    await this.service.adminRegister(user.id, client.id, body)
    return {
      data: null,
      message: 'Admin user created successfully',
      status: true
    }
  }

  @TypedRoute.Post('logout')
  @UseGuards(AuthGuard('jwt'))
  async logout(@Request() request): Promise<RequestResponse<null>> {
    await this.service.logout(request.user.sessionId)
    return {
      data: null,
      message: 'ok',
      status: true
    }
  }

  @TypedRoute.Post('change-password')
  @UseGuards(AuthGuard('jwt'))
  async changePassword(
    @Request() request,
    @TypedBody() body: ChangePasswordDTO
  ): Promise<RequestResponse<null>> {
    await this.service.changePassword(request.user.id, body)
    return {
      data: null,
      message: 'Password changed successfully',
      status: true
    }
  }
}
