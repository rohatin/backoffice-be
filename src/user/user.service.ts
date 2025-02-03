import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from './entities/user.entity'
import { Repository } from 'typeorm'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

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
}
