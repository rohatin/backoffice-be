import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Permission } from '../../../role/entities/permission.entity'
import { PermissionSeedService } from './permission-seed.service'

@Module({
  imports: [TypeOrmModule.forFeature([Permission])],
  providers: [PermissionSeedService],
  exports: [PermissionSeedService]
})
export class PermissionSeedModule {}
