import { AuthConfig } from '../auth/config/auth-config.type'
import { DatabaseConfig } from '../database/config/database-config.type'
import { MailerTypeConfig } from '../mailer/config/mailer-type.config'
import { AppConfig } from './app-config.type'

export type GeneralConfig = {
  app: AppConfig
  database: DatabaseConfig
  auth: AuthConfig
  mail: MailerTypeConfig
}
