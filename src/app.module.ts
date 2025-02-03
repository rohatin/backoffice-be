import {
  DynamicModule,
  ForwardReference,
  MiddlewareConsumer,
  Module,
  NestModule,
  Type
} from '@nestjs/common'
import { HomeModule } from './home/home.module'
import { ConfigModule, ConfigService } from '@nestjs/config'
import appConfig from './config/app.config'
import { DataSourceOptions } from 'typeorm'
import { DataSource } from 'typeorm'
import { TypeOrmConfigService } from './database/typeorm-config.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import databaseConfig from './database/config/database.config'
import { CacheModule } from '@nestjs/cache-manager'
import { redisStore } from 'cache-manager-redis-yet'
import { GeneralConfig } from './config/config.type'
import { ClientCorsMiddleware } from './middleware/client-cors.middleware'
import { AuthModule } from './auth/auth.module'
import { UserModule } from './user/user.module'
import { SessionModule } from './session/session.module'
import { RoleModule } from './role/role.module'
import authConfig from './auth/config/auth.config'
import { ClientModule } from './client/client.module'
import { TransactionModule } from './transaction/transaction.module'
import { BlacklistModule } from './blacklist/blacklist.module'
import { MailerModule } from './mailer/mailer.module'

const defaultImports: Array<
  Type<any> | DynamicModule | Promise<DynamicModule> | ForwardReference
> = [
  HomeModule,
  ConfigModule.forRoot({
    //make the config module globally accessible for ease of use
    isGlobal: true,
    load: [appConfig, databaseConfig, authConfig],
    envFilePath: ['.env']
  }),
  TypeOrmModule.forRootAsync({
    useClass: TypeOrmConfigService,
    dataSourceFactory: async (options: DataSourceOptions) => {
      return new DataSource(options).initialize()
    }
  }),
  //cache module should be globally available since it will be used in most, if not all modules
  CacheModule.registerAsync({
    isGlobal: true,
    useFactory: (configService: ConfigService<GeneralConfig>) => ({
      store: redisStore,
      url: `redis://${configService.getOrThrow('database.redisHost', {
        infer: true
      })}:${configService.getOrThrow('database.redisPort', {
        infer: true
      })}`,
      ttl: 86400 // Time to live in seconds (24 hours)
    }),
    inject: [ConfigService]
  }),
  AuthModule,
  UserModule,
  SessionModule,
  RoleModule,
  ClientModule,
  TransactionModule,
  BlacklistModule,
  MailerModule
]

@Module({
  imports: defaultImports
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    //home route is excluded from being cors called since it's useful for testing
    //just native to api.domain.com and check if the app is alive
    consumer.apply(ClientCorsMiddleware).exclude('/').forRoutes('*')
  }
}
