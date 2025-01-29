// client-service.provider.ts
import { Injectable, NestMiddleware } from '@nestjs/common'
import { ClientService } from './client.service'

@Injectable()
export class ClientServiceProvider implements NestMiddleware {
  constructor(private clientService: ClientService) {}

  use(req: any, res: any, next: () => void) {
    req['client'] = this.clientService
    next()
  }
}
