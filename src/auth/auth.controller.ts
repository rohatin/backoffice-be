import { Controller } from '@nestjs/common'
import { AuthService } from './auth.service'
import { TypedBody, TypedRoute } from '@nestia/core'
import { InitiateLoginDTO } from './dto/request/initiate-login.dto'

@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @TypedRoute.Post('login')
  async login(@TypedBody() body: InitiateLoginDTO) {}
}
