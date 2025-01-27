import { Injectable } from '@nestjs/common'

@Injectable()
export class HomeService {
  getAppName() {
    return 'Backoffice TODO'
  }
}
