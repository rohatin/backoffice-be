import { ExtractJwt, Strategy } from 'passport-jwt'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ConfigService } from '@nestjs/config'
import { JwtRefreshPayloadType } from './types/jwt-refresh-payload.type'
import { GeneralConfig } from '../../config/config.type'

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh'
) {
  constructor(configService: ConfigService<GeneralConfig>) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('auth.refreshSecret', { infer: true })
    })
  }

  public validate(
    payload: JwtRefreshPayloadType
  ): JwtRefreshPayloadType | never {
    if (!payload.sessionId) {
      throw new UnauthorizedException()
    }

    return payload
  }
}
