import { ActionType } from '../../action-type.enum'
import { ResourceType } from '../../resource-type.enum'

export type PermissionDTO = {
  name: string
  description: string
  action: ActionType
  resource: ResourceType
}
