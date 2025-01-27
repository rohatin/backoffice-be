import { DynamicModule, ForwardReference, Module, Type } from '@nestjs/common'
import { HomeModule } from './home/home.module'
import { ConfigModule } from '@nestjs/config'
import appConfig from './config/app.config'

const defaultImports: Array<
  Type<any> | DynamicModule | Promise<DynamicModule> | ForwardReference
> = [
  HomeModule,
  ConfigModule.forRoot({
    //make the config module globally accessible for ease of use
    isGlobal: true,
    load: [appConfig],
    envFilePath: ['.env']
  })
]

@Module({
  imports: defaultImports
})
export class AppModule {}
