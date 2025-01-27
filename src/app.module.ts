import { DynamicModule, ForwardReference, Module, Type } from '@nestjs/common'
import { HomeModule } from './home/home.module'

const defaultImports: Array<
  Type<any> | DynamicModule | Promise<DynamicModule> | ForwardReference
> = [HomeModule]

@Module({
  imports: defaultImports
})
export class AppModule {}
