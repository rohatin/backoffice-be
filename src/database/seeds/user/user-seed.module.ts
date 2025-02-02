import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserSeedService } from './user-seed.service'
import { User } from '../../../user/entities/user.entity'
import { Role } from '../../../role/entities/role.entity'

@Module({
  imports: [TypeOrmModule.forFeature([User, Role])],
  providers: [UserSeedService],
  exports: [UserSeedService]
})
export class UserSeedModule {}
