import {
  BadRequestException,
  Injectable,
  UnauthorizedException
} from '@nestjs/common'
import bcrypt from 'bcryptjs'
import ms from 'ms'
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import { GeneralConfig } from '../config/config.type'
import { UserService } from '../user/user.service'
import { SessionService } from '../session/session.service'
import { InitiateLoginDTO } from './dto/request/initiate-login.dto'
import { AuthSessionDTO } from './dto/response/auth-session.dto'
import { Client } from '../client/entities/client.entity'
import { ChangePasswordDTO } from './dto/request/change-password.dto'
import { ActionType } from '../role/action-type.enum'
import { AdminRegisterDTO } from './dto/request/admin-register.dto'
import { ResourceType } from '../role/resource-type.enum'
import { RoleService } from '../role/role.service'
import { BlacklistService } from '../blacklist/blacklist.service'

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService<GeneralConfig>,
    private readonly userService: UserService,
    private readonly sessionService: SessionService,
    private readonly roleService: RoleService,
    private readonly blacklistService: BlacklistService
  ) {}

  async changePassword(
    userId: number,
    changePasswordDto: ChangePasswordDTO
  ): Promise<void> {
    const user = await this.userService.findById(userId)

    if (!user) {
      throw new BadRequestException('User not found')
    }

    const isValidPassword = await bcrypt.compare(
      changePasswordDto.oldPassword,
      user.passwordHash
    )

    if (!isValidPassword) {
      throw new UnauthorizedException('Invalid current password')
    }

    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(
      changePasswordDto.newPassword,
      salt
    )

    await this.userService.update(userId, {
      passwordHash: hashedPassword
    })
  }

  async adminRegister(
    userId: number,
    clientId: number,
    registerDto: AdminRegisterDTO
  ): Promise<void> {
    await this.roleService.checkAccessFor(
      userId,
      ActionType.create,
      ResourceType.admin
    )

    const userExists = await this.userService.finOneByEmail(
      clientId,
      registerDto.email
    )

    const roles = await this.roleService.getRolesByIds(registerDto.roleIds)

    if (userExists) {
      throw new BadRequestException('User already exists')
    }

    const salt = await bcrypt.genSalt()
    const hashedPass = await bcrypt.hash(registerDto.password, salt)

    await this.userService.create({
      email: registerDto.email,
      passwordHash: hashedPass,
      firstName: registerDto.firstName,
      lastName: registerDto.lastName,
      roles,
      clientId
    })
  }

  async validateLogin(
    client: Client,
    loginDto: InitiateLoginDTO
  ): Promise<AuthSessionDTO> {
    const user = await this.userService.finOneByEmail(client.id, loginDto.email)

    if (!user) {
      throw new BadRequestException('User not found')
    }

    if (await this.blacklistService.isUserBanned(user.id)) {
      throw new BadRequestException('User is banned')
    }

    const isValidPassword = await bcrypt.compare(
      loginDto.password,
      user.passwordHash
    )

    if (!isValidPassword) {
      throw new UnauthorizedException('Invalid password provided')
    }

    const session = await this.sessionService.create({
      user
    })

    const { token, refreshToken, tokenExpires } = await this.createJwtData({
      id: user.id,
      roles: user.roles.map((role) => role.id),
      sessionId: session.id,
      client
    })

    return {
      refreshToken,
      token,
      tokenExpires,
      user
    }
  }
  async refreshToken(
    client: Client,
    sessionId: number
  ): Promise<AuthSessionDTO> {
    const session = await this.sessionService.findOneById(sessionId)

    if (!session) {
      throw new UnauthorizedException()
    }

    const { token, refreshToken, tokenExpires } = await this.createJwtData({
      id: session.user.id,
      roles: session.user.roles.map((role) => role.id),
      sessionId: session.id,
      client
    })
    const user = await this.userService.findById(session.user.id)

    return {
      token,
      refreshToken,
      tokenExpires,
      user
    }
  }
  async logout(sessionId: number) {
    return this.sessionService.softDelete({
      id: sessionId
    })
  }

  private async createJwtData(data: {
    id: number
    roles: Array<number>
    sessionId: number
    client: Client
  }) {
    const tokenExpiresIn =
      data.client.metadata['jwtTTL'] ||
      this.configService.getOrThrow('auth.expires', {
        infer: true
      })

    const tokenExpires = Date.now() + ms(tokenExpiresIn)

    const [token, refreshToken] = await Promise.all([
      await this.jwtService.signAsync(
        {
          id: data.id,
          roles: data.roles,
          sessionId: data.sessionId
        },
        {
          secret:
            data.client.metadata['jwtSecret'] ||
            this.configService.getOrThrow('auth.secret', { infer: true }),
          expiresIn: tokenExpiresIn
        }
      ),
      await this.jwtService.signAsync(
        {
          sessionId: data.sessionId
        },
        {
          secret:
            data.client.metadata['jwtRefreshSecret'] ||
            this.configService.getOrThrow('auth.refreshSecret', {
              infer: true
            }),
          expiresIn:
            data.client.metadata['jwtRefreshTTL'] ||
            this.configService.getOrThrow('auth.refreshExpires', {
              infer: true
            })
        }
      )
    ])

    return {
      token,
      refreshToken,
      tokenExpires
    }
  }
}
