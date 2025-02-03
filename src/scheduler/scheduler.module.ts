import { DynamicModule, MiddlewareConsumer, Module } from '@nestjs/common'
import { SchedulerService } from './scheduler.service'
import { BullModule, InjectQueue } from '@nestjs/bull'
import { Queue } from 'bull'
import { ExpressAdapter } from '@bull-board/express'
import { BullAdapter } from '@bull-board/api/bullAdapter'
import { createBullBoard } from '@bull-board/api'
import { BullBoardModule } from '@bull-board/nestjs'
import { SchedulerAuthMiddleware } from './scheduler-auth.middleware'
import { SchedulerProcessor } from './scheduler.processor'
import { BullQueue } from '../utils/enum/bull-queue.enum'
import { TransactionModule } from '../transaction/transaction.module'

@Module({
  imports: [
    BullModule.registerQueue({ name: BullQueue.Cron }),
    BullBoardModule.forFeature({
      name: BullQueue.Cron,
      adapter: BullAdapter
    }),
    TransactionModule
  ],
  controllers: [],
  providers: [SchedulerService, SchedulerProcessor],
  exports: []
})
export class SchedulerModule {
  static register(): DynamicModule {
    const cronQueue = BullModule.registerQueue({ name: BullQueue.Cron })

    if (!cronQueue.providers || !cronQueue.exports) {
      throw new Error('Unable to build queues')
    }

    return {
      module: SchedulerModule,
      imports: [
        BullModule.forRoot({
          defaultJobOptions: {
            attempts: 3,
            backoff: {
              type: 'exponential',
              delay: 1000
            }
          }
        }),
        cronQueue
      ],
      providers: [...cronQueue.providers],
      exports: [...cronQueue.exports]
    }
  }

  constructor(@InjectQueue(BullQueue.Cron) private readonly cronQueue: Queue) {}

  configure(consumer: MiddlewareConsumer) {
    const serverAdapter = new ExpressAdapter()
    serverAdapter.setBasePath('/api/queues')

    createBullBoard({
      queues: [new BullAdapter(this.cronQueue)],
      serverAdapter
    })

    consumer
      .apply(SchedulerAuthMiddleware, serverAdapter.getRouter())
      .forRoutes('/queues')
  }
}
