import type { RoleDTO } from "./RoleDTO";

export type SuccesfulRequestArrayRoleDTO = {
  message: string;
  data: RoleDTO[];
  status: true;
};
