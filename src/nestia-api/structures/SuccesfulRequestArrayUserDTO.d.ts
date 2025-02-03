import type { UserDTO } from "./UserDTO";
export type SuccesfulRequestArrayUserDTO = {
    message: string;
    data: UserDTO[];
    status: true;
};
