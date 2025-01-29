import { ExtractJwt, Strategy } from 'passport-jwt'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ConfigService } from '@nestjs/config'
import { JwtPayloadType } from './types/jwt-payload.type'
import { GeneralConfig } from '../../config/config.type'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(configService: ConfigService<GeneralConfig>) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('auth.secret', { infer: true })
    })
  }

  public validate(payload: JwtPayloadType): JwtPayloadType | never {
    if (!payload.id) {
      throw new UnauthorizedException()
    }

    return payload
  }
}
