import type { RoleDTO } from "./RoleDTO";

export type SuccesfulRequestRoleDTO = {
  message: string;
  data: RoleDTO;
  status: true;
};
