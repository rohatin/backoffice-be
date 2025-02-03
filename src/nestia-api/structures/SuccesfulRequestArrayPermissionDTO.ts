import type { PermissionDTO } from "./PermissionDTO";

export type SuccesfulRequestArrayPermissionDTO = {
  message: string;
  data: PermissionDTO[];
  status: true;
};
