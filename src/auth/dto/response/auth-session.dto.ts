import { UserDTO } from '../../../user/dto/response/user.dto'

export type AuthSessionDTO = {
  tokenExpires: number
  token: string
  refreshToken: string
  user: UserDTO
}
