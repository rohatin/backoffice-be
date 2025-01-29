import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException
} from '@nestjs/common'

@Injectable()
export class ApiKeyGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest()
    const apiKey = request.headers['x-api-key']

    if (apiKey && typeof apiKey === 'string' && apiKey.trim() !== '') {
      return true
    } else {
      throw new UnauthorizedException('Invalid API key')
    }
  }
}
