import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Transaction } from './entities/transaction.entity'
import { Repository } from 'typeorm'
import { RoleService } from '../role/role.service'
import { ActionType } from '../role/action-type.enum'
import { ResourceType } from '../role/resource-type.enum'
import { CreateTransactionDTO } from './dto/request/create-transaction.dto'

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
    private readonly roleService: RoleService
  ) {}

  async create(
    userId: number,
    transaction: CreateTransactionDTO
  ): Promise<Transaction> {
    if (userId !== transaction.userId) {
      await this.roleService.checkAccessFor(
        userId,
        ActionType.create,
        ResourceType.transaction
      )
    }
    return this.transactionRepository.save(transaction)
  }

  async findAll(userId: number): Promise<Transaction[]> {
    await this.roleService.checkAccessFor(
      userId,
      ActionType.view,
      ResourceType.transaction
    )
    return this.transactionRepository.find()
  }

  async findAllForUser(
    userId: number,
    targetUserId: number
  ): Promise<Transaction[]> {
    if (userId !== targetUserId) {
      await this.roleService.checkAccessFor(
        userId,
        ActionType.view,
        ResourceType.transaction
      )
    }
    return this.transactionRepository.find({
      where: { userId: targetUserId }
    })
  }
}
