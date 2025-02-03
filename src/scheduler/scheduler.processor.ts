/* eslint-disable @typescript-eslint/no-unused-vars */
import { Process, Processor } from '@nestjs/bull'
import { Job } from 'bull'
import { Logger } from '@nestjs/common'
import { TransactionService } from '../transaction/transaction.service'
import { ScheduledJob } from '../utils/enum/scheduler.enum'
import { BullQueue } from '../utils/enum/bull-queue.enum'

@Processor(BullQueue.Cron)
export class SchedulerProcessor {
  private readonly logger = new Logger(SchedulerProcessor.name)

  constructor(private readonly transactionService: TransactionService) {}

  @Process({
    name: ScheduledJob.ChaosTransaction,
    concurrency: 5
  })
  async handleChaosTransaction(job: Job) {
    try {
      this.logger.log('Starting chaos transaction processing')
      await this.transactionService.processRandomPendingTransactions()
      this.logger.log('Completed chaos transaction processing')
    } catch (error) {
      this.logger.error('Error processing chaos transactions:', error)
    }
  }
}
