import type { Format } from "typia/lib/tags/Format";

import type { RoleDTO } from "./RoleDTO";

export type UserDTO = {
  id: number;
  email: string;
  roles: RoleDTO[];
  firstName: string;
  lastName: string;
  createdAt: string & Format<"date-time">;
  updatedAt: string & Format<"date-time">;
};
