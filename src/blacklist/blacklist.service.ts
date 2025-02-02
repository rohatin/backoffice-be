import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, LessThan } from 'typeorm'
import { Blacklist } from './entities/blacklist.entity'
import { RoleService } from '../role/role.service'
import { ActionType } from '../role/action-type.enum'
import { ResourceType } from '../role/resource-type.enum'
import { BanUserDTO } from './dto/request/ban-user.dto'

@Injectable()
export class BlacklistService {
  constructor(
    @InjectRepository(Blacklist)
    private readonly blacklistRepository: Repository<Blacklist>,
    private readonly roleService: RoleService
  ) {}

  async banUser(adminId: number, banData: BanUserDTO): Promise<Blacklist> {
    await this.roleService.checkAccessFor(
      adminId,
      ActionType.create,
      ResourceType.blacklist
    )

    // Deactivate any existing bans
    await this.blacklistRepository.update(
      { userId: banData.userId, isActive: true },
      { isActive: false }
    )

    // Create new ban
    const blacklist = this.blacklistRepository.create(banData)
    const savedUser = this.blacklistRepository.save(blacklist)
    return savedUser[0]
  }

  async unbanUser(adminId: number, userId: number): Promise<void> {
    await this.roleService.checkAccessFor(
      adminId,
      ActionType.delete,
      ResourceType.blacklist
    )

    await this.blacklistRepository.update(
      { userId, isActive: true },
      { isActive: false }
    )
  }

  async isUserBanned(userId: number): Promise<boolean> {
    const activeBan = await this.blacklistRepository.findOne({
      where: {
        userId,
        isActive: true,
        expiresAt: LessThan(new Date())
      }
    })
    return !!activeBan
  }

  async cleanupExpiredBans(): Promise<void> {
    await this.blacklistRepository.update(
      {
        isActive: true,
        expiresAt: LessThan(new Date())
      },
      { isActive: false }
    )
  }
}
