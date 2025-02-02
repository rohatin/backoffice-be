import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { RoleSeedService } from './role-seed.service'
import { Role } from '../../../role/entities/role.entity'
import { Permission } from '../../../role/entities/permission.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Role, Permission])],
  providers: [RoleSeedService],
  exports: [RoleSeedService]
})
export class RoleSeedModule {}
