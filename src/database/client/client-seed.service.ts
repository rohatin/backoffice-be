import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { v4 as uuidv4 } from 'uuid'
import { Client } from '../../client/entities/client.entity'
import { name } from 'typia/lib/reflect'

@Injectable()
export class ClientSeedService {
  constructor(
    @InjectRepository(Client)
    private repository: Repository<Client>
  ) {}

  async run() {
    // Create web client
    const webClientExists = await this.repository.count({
      where: { name: 'Web Client' }
    })

    if (!webClientExists) {
      const apiKey = uuidv4()
      await this.repository.save(
        this.repository.create({
          name: 'Spinanda',
          apiKey: apiKey,
          enabledDomains: ['*'],
          isActive: true
        })
      )
      console.log('Generated new client with api key', {
        apiKey,
        name: 'Web Client'
      })
    }

    // Create mobile client
    const mobileClientExists = await this.repository.count({
      where: { name: 'Mobile Client' }
    })

    if (!mobileClientExists) {
      const apiKey = uuidv4()
      await this.repository.save(
        this.repository.create({
          name: 'The fairy tale casino',
          apiKey: apiKey,
          enabledDomains: ['*'],
          isActive: true
        })
      )
      console.log('Generated new client with api key', {
        apiKey,
        name: 'The fairy tale casino'
      })
    }
  }

  async getAll() {
    return this.repository.find()
  }
}
