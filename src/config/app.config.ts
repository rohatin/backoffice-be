import { registerAs } from '@nestjs/config'
import { AppConfig } from './app-config.type'
import { IsString, IsInt, IsUrl, IsOptional, Min, Max } from 'class-validator'
import { validateConfig } from '../utils/functions/validate-config.function'

class EnvironmentVariablesValidator {
  @IsString()
  @IsOptional()
  NODE_ENV: string

  @IsString()
  @IsOptional()
  APP_NAME: string

  @IsUrl({ require_tld: false })
  @IsOptional()
  FRONTEND_URL: string

  @IsInt()
  @Min(0)
  @Max(65535)
  @IsOptional()
  APP_PORT: number
}

export default registerAs<AppConfig>('app', () => {
  validateConfig(process.env, EnvironmentVariablesValidator)

  return {
    nodeEnv: process.env.NODE_ENV || 'development',
    name: process.env.APP_NAME || 'app',
    frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000',
    port: process.env.APP_PORT ? parseInt(process.env.APP_PORT, 10) : 3000
  }
})
