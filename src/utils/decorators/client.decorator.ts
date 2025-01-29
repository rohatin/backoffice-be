import {
  BadRequestException,
  createParamDecorator,
  ExecutionContext
} from '@nestjs/common'

import { Client } from '../../client/entities/client.entity'
export const ClientDecorator = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): Promise<Client> => {
    const request = ctx.switchToHttp().getRequest()
    const apiKey = request.headers['x-api-key']
    const clientService = request['client']

    if (!apiKey) {
      throw new BadRequestException('API key is missing')
    }
    return clientService.getClientByApiKey(apiKey as string)
  }
)
