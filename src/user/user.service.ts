import { Injectable, UnauthorizedException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from './entities/user.entity'
import { Repository } from 'typeorm'
import { ActionType } from '../role/action-type.enum'
import { ResourceType } from '../role/resource-type.enum'
import { RoleService } from '../role/role.service'

export type CreateUser = {
  email: string
  firstName: string
  lastName: string
  passwordHash: string
  roles: any[]
  clientId: number
}

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly roleService: RoleService
  ) {}

  async findByIdWithCheck(userId: number, targetUserId: number): Promise<User> {
    if (userId !== targetUserId) {
      await this.roleService.checkAccessFor(
        userId,
        ActionType.view,
        ResourceType.user
      )
    }

    const user = await this.userRepository.findOne({
      where: { id: targetUserId },
      relations: ['roles', 'roles.permissions']
    })

    if (!user) {
      throw new UnauthorizedException('User not found')
    }

    return user
  }

  async findById(id: number) {
    return this.userRepository.findOneOrFail({
      where: { id },
      relations: ['roles']
    })
  }

  async finOneByEmail(clientId: number, email: string) {
    return this.userRepository.findOne({
      where: { email, clientId },
      relations: ['roles', 'roles.permissions']
    })
  }

  async update(id: number, data: Partial<User>) {
    return this.userRepository.update(id, data)
  }

  async create(data: CreateUser): Promise<User> {
    const user = this.userRepository.create({
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      passwordHash: data.passwordHash,
      roles: data.roles,
      clientId: data.clientId
    })
    const savedUser = await this.userRepository.save(user)
    return Array.isArray(savedUser) ? savedUser[0] : savedUser
  }

  async findAllForClient(userId: number, clientId: number) {
    await this.roleService.checkAccessFor(
      userId,
      ActionType.view,
      ResourceType.user
    )
    return this.userRepository.find({
      where: { clientId },
      relations: ['roles', 'roles.permissions']
    })
  }
}
