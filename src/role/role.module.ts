import { Global, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Role } from './entities/role.entity'
import { RoleService } from './role.service'
import { Permission } from './entities/permission.entity'
import { RoleController } from './role.controller'

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Role, Permission])],
  providers: [RoleService],
  exports: [RoleService],
  controllers: [RoleController]
})
export class RoleModule {}
