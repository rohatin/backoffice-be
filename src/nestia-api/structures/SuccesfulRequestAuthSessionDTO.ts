import type { AuthSessionDTO } from "./AuthSessionDTO";

export type SuccesfulRequestAuthSessionDTO = {
  message: string;
  data: AuthSessionDTO;
  status: true;
};
