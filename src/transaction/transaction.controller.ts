import { Controller, UseGuards } from '@nestjs/common'
import { TransactionService } from './transaction.service'
import { TypedBody, TypedParam, TypedRoute } from '@nestia/core'
import { CreateTransactionDTO } from './dto/request/create-transaction.dto'
import { User, UserEntity } from '../utils/decorators/user.decorator'
import { WrapResponse } from '../utils/decorators/wrap-response'
import { RequestResponse } from '../utils/types/request-response.type'
import { TransactionDTO } from './dto/response/transaction.dto'
import { AuthGuard } from '@nestjs/passport'

@Controller('transactions')
@WrapResponse()
@UseGuards(AuthGuard('jwt'))
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @TypedRoute.Post()
  async create(
    @User() user: UserEntity,
    @TypedBody() body: CreateTransactionDTO
  ): Promise<RequestResponse<TransactionDTO>> {
    return {
      data: await this.transactionService.create(user.id, body),
      message: 'ok',
      status: true
    }
  }

  @TypedRoute.Get()
  async findAll(
    @User() user: UserEntity
  ): Promise<RequestResponse<Array<TransactionDTO>>> {
    return {
      data: await this.transactionService.findAll(user.id),
      message: 'ok',
      status: true
    }
  }

  @TypedRoute.Get(':userId')
  async findAllForUser(
    @User() user: UserEntity,
    @TypedParam('userId') targetUserId: number
  ): Promise<RequestResponse<Array<TransactionDTO>>> {
    return {
      data: await this.transactionService.findAllForUser(user.id, targetUserId),
      message: 'ok',
      status: true
    }
  }
}
