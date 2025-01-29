import { CacheModule } from '@nestjs/cache-manager'
import { Global, MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { redisStore } from 'cache-manager-redis-yet'
import { Client } from './entities/client.entity'
import { ClientService } from './client.service'
import { ClientServiceProvider } from './client.provider'

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([Client]),
    CacheModule.register({
      url: `redis://${process.env.REDIS_HOST ?? 'localhost'}:${
        process.env.REDIS_PORT ?? 6379
      }`,
      ttl: 86400, // Time to live in seconds (24 hours),
      store: redisStore
    })
  ],
  exports: [ClientService],
  providers: [ClientService],
  controllers: []
})
export class ClientModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ClientServiceProvider).forRoutes('*')
  }
}
