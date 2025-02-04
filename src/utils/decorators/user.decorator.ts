import { ExecutionContext, createParamDecorator } from '@nestjs/common'
export interface UserEntity {
  id: number
}

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest()
    return request.user
  }
)
