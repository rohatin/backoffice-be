import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Client } from '../../client/entities/client.entity'
import { ClientSeedService } from './client-seed.service'

@Module({
  imports: [TypeOrmModule.forFeature([Client])],
  providers: [ClientSeedService],
  exports: [ClientSeedService]
})
export class ClientSeedModule {}
