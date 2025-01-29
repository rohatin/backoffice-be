import { AuthConfig } from '../auth/config/auth-config.type'
import { DatabaseConfig } from '../database/config/database-config.type'
import { AppConfig } from './app-config.type'

export type GeneralConfig = {
  app: AppConfig
  database: DatabaseConfig
  auth: AuthConfig
}
