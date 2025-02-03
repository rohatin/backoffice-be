import { Injectable, OnModuleInit } from '@nestjs/common'
import { InjectQueue } from '@nestjs/bull'
import { Queue } from 'bull'
import { BullQueue } from '../utils/enum/bull-queue.enum'
import { ScheduledJob } from '../utils/enum/scheduler.enum'
@Injectable()
export class SchedulerService implements OnModuleInit {
  constructor(
    @InjectQueue(BullQueue.Cron) private readonly generalCronJobsQueue: Queue
  ) {}

  async onModuleInit() {
    await this.scheduleJob({
      queue: this.generalCronJobsQueue,
      jobName: `${ScheduledJob.ChaosTransaction}`,
      cron: '*/5 * * * *' //every 5 minutes
    })
  }

  private async scheduleJob(options: {
    queue: Queue
    jobName: string
    cron: string
    data?: any
  }) {
    //test if the used cron is valid
    // const regex = /(((\d+,)+\d+|(\d+(\/|-)\d+)|\d+|\*) ?){5,7}/
    // if (!regex.test(options.cron)) {
    //   throw new Error('invalid cron provided: ' + options.cron)
    // }
    //remove old instances
    const allRepeatableJobs = await options.queue.getRepeatableJobs()
    const oldJobs = allRepeatableJobs.filter(
      (job) => job.name === options.jobName
    )
    for (const oldJob of oldJobs) {
      await options.queue.removeRepeatableByKey(oldJob.key)
    }
    //add the new instance of the job to redis
    await options.queue.add(options.jobName, options.data, {
      repeat: {
        cron: options.cron
      }
    })
  }
}
