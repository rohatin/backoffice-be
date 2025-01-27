import { NestFactory, Reflector } from '@nestjs/core'
import { AppModule } from './app.module'
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true })
  // Enable automatic validation and transformation of incoming requests, while stripping unknown properties
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }))

  // Enable automatic serialization of response objects using class-transformer decorators
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)))

  await app.listen(process.env.PORT ?? 3000)
}
void bootstrap()
