import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from '../../../user/entities/user.entity'
import { Role } from '../../../role/entities/role.entity'
import bcrypt from 'bcryptjs'
import { Client } from '../../../client/entities/client.entity'

@Injectable()
export class UserSeedService {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,
    @InjectRepository(Role)
    private roleRepository: Repository<Role>
  ) {}

  async run(client: Client) {
    const adminRole = await this.roleRepository.findOne({
      where: { name: 'admin', clientId: client.id }
    })
    const moderatorRole = await this.roleRepository.findOne({
      where: { name: 'moderator', clientId: client.id }
    })
    const userRole = await this.roleRepository.findOne({
      where: { name: 'user', clientId: client.id }
    })

    if (!adminRole || !moderatorRole || !userRole) {
      throw new Error('Roles not found')
    }

    // Create superadmin
    const superadminExists = await this.repository.count({
      where: { email: 'superadmin@example.com' }
    })
    const salt = await bcrypt.genSalt()

    if (!superadminExists) {
      const hashedPass = await bcrypt.hash('superadmin123', salt)
      await this.repository.save(
        this.repository.create({
          email: 'superadmin@example.com',
          passwordHash: hashedPass,
          firstName: 'Super',
          lastName: 'Admin',
          roles: [adminRole],
          clientId: client.id
        })
      )
    }

    // Create moderator
    const moderatorExists = await this.repository.count({
      where: { email: 'moderator@example.com' }
    })

    if (!moderatorExists) {
      const hashedPass = await bcrypt.hash('moderator123', salt)
      await this.repository.save(
        this.repository.create({
          email: 'moderator@example.com',
          passwordHash: hashedPass,
          firstName: 'Main',
          lastName: 'Moderator',
          roles: [moderatorRole, userRole],
          clientId: client.id
        })
      )
    }

    // Create two normal users
    const user1Exists = await this.repository.count({
      where: { email: 'user1@example.com' }
    })

    if (!user1Exists) {
      const hashedPass = await bcrypt.hash('user123', salt)
      await this.repository.save(
        this.repository.create({
          email: 'user1@example.com',
          passwordHash: hashedPass,
          firstName: 'Normal',
          lastName: 'User One',
          roles: [userRole],
          clientId: client.id
        })
      )
    }

    const user2Exists = await this.repository.count({
      where: { email: 'user2@example.com' }
    })

    if (!user2Exists) {
      const hashedPass = await bcrypt.hash('user123', salt)
      await this.repository.save(
        this.repository.create({
          email: 'user2@example.com',
          passwordHash: hashedPass,
          firstName: 'Normal',
          lastName: 'User Two',
          roles: [userRole],
          clientId: client.id
        })
      )
    }
  }
}
