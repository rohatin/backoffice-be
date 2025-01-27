import { DynamicModule, ForwardReference, Module, Type } from '@nestjs/common'
import { HomeModule } from './home/home.module'
import { ConfigModule } from '@nestjs/config'
import appConfig from './config/app.config'
import { DataSourceOptions } from 'typeorm'
import { DataSource } from 'typeorm'
import { TypeOrmConfigService } from './database/typeorm-config.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import databaseConfig from './database/config/database.config'

const defaultImports: Array<
  Type<any> | DynamicModule | Promise<DynamicModule> | ForwardReference
> = [
  HomeModule,
  ConfigModule.forRoot({
    //make the config module globally accessible for ease of use
    isGlobal: true,
    load: [appConfig, databaseConfig],
    envFilePath: ['.env']
  }),
  TypeOrmModule.forRootAsync({
    useClass: TypeOrmConfigService,
    dataSourceFactory: async (options: DataSourceOptions) => {
      return new DataSource(options).initialize()
    }
  })
]

@Module({
  imports: defaultImports
})
export class AppModule {}
