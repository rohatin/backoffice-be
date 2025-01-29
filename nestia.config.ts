import { INestiaConfig } from '@nestia/sdk'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './src/app.module'

const NESTIA_CONFIG: INestiaConfig = {
  input: async () => {
    const app = await NestFactory.create(AppModule)

    app.enableShutdownHooks()
    return app
  },
  output: 'src/nestia-api',
  swagger: {
    openapi: '3.1',
    output: 'dist/swagger.json',
    security: {
      bearer: {
        type: 'apiKey',
        name: 'Authorization',
        in: 'header'
      }
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Local Server'
      }
    ],
    beautify: true
  },
  e2e: 'test/e2e',
  clone: true,
  primitive: true,
  propagate: true
}

export default NESTIA_CONFIG
