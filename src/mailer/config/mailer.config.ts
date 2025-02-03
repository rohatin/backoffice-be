import { registerAs } from '@nestjs/config'
import { IsString } from 'class-validator'
import { MailerTypeConfig } from './mailer-type.config'
import { validateConfig } from '../../utils/functions/validate-config.function'

class EnvironmentVariablesValidator {
  @IsString()
  SENDGRID_API_KEY: string

  @IsString()
  MAILER_NO_REPLY_ADDRESS: string
}

export default registerAs<MailerTypeConfig>('mail', () => {
  validateConfig(process.env, EnvironmentVariablesValidator)

  return {
    apiKey: process.env.SENDGRID_API_KEY!,
    noReplyAddress: process.env.MAILER_NO_REPLY_ADDRESS!
  }
})
