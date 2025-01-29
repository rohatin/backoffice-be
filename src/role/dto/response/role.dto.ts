import { PermissionDTO } from './permission.dto'

export interface RoleDTO {
  id: number
  name: string
  description: string | null
  permissions: Array<PermissionDTO>
  clientId: number
  createdAt: Date
  updatedAt: Date
}
