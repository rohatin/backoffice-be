import { Controller } from '@nestjs/common'
import { HomeService } from './home.service'
import { TypedRoute } from '@nestia/core'

@Controller()
export class HomeController {
  constructor(private readonly homeService: HomeService) {}

  @TypedRoute.Get()
  getHello(): string {
    return this.homeService.getAppName()
  }
}
