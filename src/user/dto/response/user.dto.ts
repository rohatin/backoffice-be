import { RoleDTO } from '../../../role/dto/response/role.dto'

export type UserDTO = {
  id: number
  email: string
  roles: Array<RoleDTO>
  firstName: string
  lastName: string
  createdAt: Date
  updatedAt: Date
}
