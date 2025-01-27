import { Test, TestingModule } from '@nestjs/testing'
import { HomeController } from './home.controller'
import { HomeService } from './home.service'

describe('HomeController', () => {
  let homeController: HomeController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HomeController],
      providers: [HomeService]
    }).compile()

    homeController = module.get<HomeController>(HomeController)
  })

  describe('root', () => {
    it('should return app name from service', () => {
      expect(homeController.getHello()).toBe(process.env.APP_NAME)
    })
  })
})
