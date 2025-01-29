import { RoleDTO } from '../../../role/dto/response/role.dto'

export type UserDTO = {
  id: number
  email: string
  roles: Array<RoleDTO>
  createdAt: Date
  updatedAt: Date
}
