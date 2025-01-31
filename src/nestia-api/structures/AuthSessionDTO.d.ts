import type { UserDTO } from "./UserDTO";
export type AuthSessionDTO = {
    tokenExpires: number;
    token: string;
    refreshToken: string;
    user: UserDTO;
};
