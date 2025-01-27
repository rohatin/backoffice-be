import { NestFactory, Reflector } from '@nestjs/core'
import { AppModule } from './app.module'
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common'
import { useContainer } from 'class-validator'
import { ConfigService } from '@nestjs/config'
import { GeneralConfig } from './config/config.type'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true })

  //rather than accesing the port directly (or future env) fetch it trhough the config service for type casting
  const configService = app.get(ConfigService<GeneralConfig>)

  // Configure class-validator to use NestJS's dependency injection container
  // This allows custom validators to use dependency injection
  useContainer(app.select(AppModule), { fallbackOnErrors: true })

  // Enable automatic validation and transformation of incoming requests, while stripping unknown properties
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }))

  // Enable automatic serialization of response objects using class-transformer decorators
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)))

  await app.listen(configService.getOrThrow('app.port', { infer: true }))
}
void bootstrap()
