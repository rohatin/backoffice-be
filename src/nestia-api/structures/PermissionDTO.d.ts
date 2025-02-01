export type PermissionDTO = {
    id: number;
    name: string;
    description: string;
    action: "view" | "create" | "update" | "delete";
    resource: "user" | "role" | "admin" | "transaction";
};
