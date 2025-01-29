import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
  UseInterceptors
} from '@nestjs/common'
import { Observable, catchError, map, of } from 'rxjs'
import { RequestResponse } from '../types/request-response.type'

export function WrapResponse() {
  return UseInterceptors(new ResponseInterceptor())
}

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  private readonly logger = new Logger(ResponseInterceptor.name)
  intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Observable<RequestResponse> {
    return next.handle().pipe(
      map((data) => {
        return data
      }),
      catchError((err) => {
        this.logger.error(err)

        // Assuming err has a message property
        const response: RequestResponse = {
          data: null,
          message:
            err.message !== 'Http Exception'
              ? err.message
              : Object.values(err.response?.errors ?? {})
                  .filter(Boolean)
                  .join(', '),
          status: false
        }
        return of(response)
      })
    )
  }
}
