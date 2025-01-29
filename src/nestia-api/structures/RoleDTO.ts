import type { Format } from "typia/lib/tags/Format";

import type { PermissionDTO } from "./PermissionDTO";

export type RoleDTO = {
  id: number;
  name: string;
  description: null | string;
  permissions: PermissionDTO[];
  clientId: number;
  createdAt: string & Format<"date-time">;
  updatedAt: string & Format<"date-time">;
};
