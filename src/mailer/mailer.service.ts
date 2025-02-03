import { Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { MailService } from '@sendgrid/mail'
import { GeneralConfig } from '../config/config.type'

@Injectable()
export class MailerService {
  private readonly sender: string
  private readonly service: MailService
  private readonly defaultLang: string
  private readonly logger = new Logger(MailerService.name)
  constructor(private readonly configService: ConfigService<GeneralConfig>) {
    const apiKey: string = this.configService.getOrThrow<string>(
      'mail.apiKey',
      { infer: true }
    )
    this.service = new MailService()
    this.service.setApiKey(apiKey)
    const sender: string = this.configService.getOrThrow<string>(
      'mail.noReplyAddress',
      { infer: true }
    )
    this.sender = sender
  }

  public send = async (options: {
    to: string
    subject: string
    templateId: string
    data: { [key: string]: any }
    lang?: string
  }): Promise<boolean> => {
    const { to, subject, templateId, data, lang } = options
    try {
      await this.service.send({
        to,
        from: this.sender,
        subject,
        templateId,
        personalizations: [
          {
            to: [
              {
                email: to
              }
            ],
            dynamicTemplateData: { ...data, lang: lang ?? this.defaultLang }
          }
        ]
      })
      return true
    } catch (e) {
      this.logger.error(e)
      return false
    }
  }
}
