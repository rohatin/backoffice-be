import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { GeneralConfig } from '../config/config.type'

@Injectable()
export class HomeService {
  constructor(private configService: ConfigService<GeneralConfig>) {}
  getAppName() {
    return this.configService.getOrThrow('app.name', { infer: true })
  }
}
