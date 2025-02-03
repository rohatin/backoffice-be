import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Transaction } from './entities/transaction.entity'
import { Repository } from 'typeorm'
import { RoleService } from '../role/role.service'
import { ActionType } from '../role/action-type.enum'
import { ResourceType } from '../role/resource-type.enum'
import { CreateTransactionDTO } from './dto/request/create-transaction.dto'
import { TransactionStatus } from './enum/transaction-status.enum'

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

  async processRandomPendingTransactions(): Promise<void> {
    // Get 5 random pending transactions
    const pendingTransactions = await this.transactionRepository.find({
      where: { status: TransactionStatus.pending },
      take: 5,
      order: { createdAt: 'DESC' }
    })

    if (pendingTransactions.length === 0) {
      return
    }

    const transactionIds = pendingTransactions.map((t) => t.id)
    const possibleStatuses = [
      TransactionStatus.success,
      TransactionStatus.failed
    ]

    for (const txId of transactionIds) {
      // Update each transaction with a random status
      await this.transactionRepository.update(
        { id: txId },
        {
          status:
            possibleStatuses[
              Math.floor(Math.random() * possibleStatuses.length)
            ]
        }
      )
    }
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
