import {
  BadRequestException,
  Injectable,
  NestMiddleware,
  UnauthorizedException
} from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'
import { ClientService } from '../client/client.service'

@Injectable()
export class ClientCorsMiddleware implements NestMiddleware {
  constructor(private clientService: ClientService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const apiKey = req.headers['x-api-key'] as string
    const origin = req.headers.origin

    if (!apiKey) {
      throw new BadRequestException('missing api key')
    }

    //if we find an origin as well check if the domain is allowed to make requests
    //otherwise check only if the api key is valid
    if (origin) {
      const isAllowed = await this.clientService.isDomainAllowed(apiKey, origin)
      if (isAllowed) {
        res.setHeader('Access-Control-Allow-Origin', origin)
        res.setHeader(
          'Access-Control-Allow-Methods',
          'GET,HEAD,PUT,PATCH,POST,DELETE'
        )
        res.setHeader(
          'Access-Control-Allow-Headers',
          'Content-Type, Accept, x-api-key'
        )
      } else {
        throw new UnauthorizedException('Cors Bitch')
      }
    } else {
      const client = await this.clientService.getClientByApiKey(apiKey)
      if (!client) {
        throw new UnauthorizedException('Invalid api key found')
      }
    }
    next()
  }
}
