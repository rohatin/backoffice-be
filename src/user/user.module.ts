import { forwardRef, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './entities/user.entity'
import { UserService } from './user.service'
import { UserController } from './user.controller'
import { RoleModule } from '../role/role.module'

@Module({
  imports: [TypeOrmModule.forFeature([User]), forwardRef(() => RoleModule)],
  providers: [UserService],
  exports: [UserService],
  controllers: [UserController]
})
export class UserModule {}
