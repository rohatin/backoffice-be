import { NestMiddleware } from '@nestjs/common'
import { NextFunction, Request, Response } from 'express'

export class SchedulerAuthMiddleware implements NestMiddleware {
  private readonly username = process.env.BULL_USER
  private readonly password = process.env.BULL_PASS
  private readonly encodedCreds = Buffer.from(
    this.username + ':' + this.password
  ).toString('base64')

  use(req: Request, res: Response, next: NextFunction) {
    const reqCreds = req.get('authorization')?.split('Basic ')?.[1] ?? null

    if (!reqCreds || reqCreds !== this.encodedCreds) {
      res.setHeader(
        'WWW-Authenticate',
        'Basic realm="Your realm", charset="UTF-8"'
      )
      res.sendStatus(401)
    } else {
      next()
    }
  }
}
