import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Blacklist } from './entities/blacklist.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Blacklist])]
})
export class BlacklistModule {}
