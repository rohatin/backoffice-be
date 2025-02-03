import type { UserDTO } from "./UserDTO";
export type SuccesfulRequestUserDTO = {
    message: string;
    data: UserDTO;
    status: true;
};
