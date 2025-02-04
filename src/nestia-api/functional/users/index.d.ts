/**
 * @packageDocumentation
 * @module api.functional.users
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
import type { IConnection, IPropagation } from "@nestia/fetcher";
import type { FailedRequest } from "../../structures/FailedRequest";
import type { SuccesfulRequestUserDTO } from "../../structures/SuccesfulRequestUserDTO";
export * as all from "./all";
/**
 * @controller UserController.findById
 * @path GET /users/:userId
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
export declare function findById(connection: IConnection, targetUserId: number): Promise<findById.Output>;
export declare namespace findById {
    type Output = IPropagation<{
        200: SuccesfulRequestUserDTO | FailedRequest;
    }, 200>;
    const METADATA: {
        readonly method: "GET";
        readonly path: "/users/:userId";
        readonly request: null;
        readonly response: {
            readonly type: "application/json";
            readonly encrypted: false;
        };
        readonly status: 200;
    };
    const path: (targetUserId: number) => string;
}
