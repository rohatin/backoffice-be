export type PermissionDTO = {
    name: string;
    description: string;
    action: "view" | "create" | "update" | "delete";
    resource: "user" | "role" | "admin" | "transaction";
};
