import { BadRequestException, Injectable, Inject } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Client } from './entities/client.entity'
import { Repository } from 'typeorm'
import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { Cache } from 'cache-manager'

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {}

  async getClientByApiKey(apiKey: string): Promise<Client> {
    const cacheKey = `client-${apiKey}`

    // Try to get from cache first
    const cachedClient = await this.cacheManager.get<Client>(cacheKey)
    if (cachedClient) {
      return cachedClient
    }

    // If not in cache, fetch from database
    const client = await this.clientRepository.findOne({
      where: { apiKey }
    })

    if (!client) {
      throw new BadRequestException('Invalid API key')
    }

    // Cache the result
    await this.cacheManager.set(cacheKey, client, 86400000) // Cache for 24 hours (in milliseconds)

    return client
  }

  async isDomainAllowed(apiKey: string, origin: string): Promise<boolean> {
    const client = await this.getClientByApiKey(apiKey)
    if (!client) return false
    return (
      client.enabledDomains.includes(origin) ||
      client.enabledDomains.includes('*') //let the client enable all domains
    )
  }
}
