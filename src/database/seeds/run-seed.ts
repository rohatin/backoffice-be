import { NestFactory } from '@nestjs/core'
import { RoleSeedService } from './role/role-seed.service'
import { SeedModule } from './seed.module'
import { UserSeedService } from './user/user-seed.service'
import { PermissionSeedService } from './permission/permission-seed.service'
import { ClientSeedService } from '../client/client-seed.service'

const runSeed = async () => {
  const app = await NestFactory.create(SeedModule)

  // run
  await app.get(PermissionSeedService).run()
  await app.get(ClientSeedService).run()
  for (const client of await app.get(ClientSeedService).getAll()) {
    await app.get(RoleSeedService).run(client)
    await app.get(UserSeedService).run(client)
  }

  await app.close()
}

void runSeed()
