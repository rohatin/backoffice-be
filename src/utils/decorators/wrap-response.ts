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

/**
 * Use this decorator to wrap the response of a controller method.
 *
 * By default, Nest will return the response as is. If you want to wrap the
 * response in a standardized format, you can use this decorator. This
 * decorator will return the response in the following format:
 *
 * {
 *   success: boolean;
 *   data?: any;
 *   errors?: any[];
 * }
 *
 * If the response is an error, the `success` property will be `false` and
 * the `errors` property will contain the error message. If the response is
 * not an error, the `success` property will be `true` and the `data`
 * property will contain the response data.
 */
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
