/**
 * @packageDocumentation
 * @module api.functional.auth
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
import type { IConnection, IPropagation } from "@nestia/fetcher";
import type { FailedRequest } from "../../structures/FailedRequest";
import type { InitiateLoginDTO } from "../../structures/InitiateLoginDTO";
import type { SuccesfulRequestAuthSessionDTO } from "../../structures/SuccesfulRequestAuthSessionDTO";
import type { SuccesfulRequestnull } from "../../structures/SuccesfulRequestnull";
export * as admin_register from "./admin_register";
export * as change_password from "./change_password";
/**
 * @controller AuthController.login
 * @path POST /auth/login
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
export declare function login(connection: IConnection, body: login.Input): Promise<login.Output>;
export declare namespace login {
    type Input = InitiateLoginDTO;
    type Output = IPropagation<{
        201: SuccesfulRequestAuthSessionDTO | FailedRequest;
    }, 201>;
    const METADATA: {
        readonly method: "POST";
        readonly path: "/auth/login";
        readonly request: {
            readonly type: "application/json";
            readonly encrypted: false;
        };
        readonly response: {
            readonly type: "application/json";
            readonly encrypted: false;
        };
        readonly status: 201;
    };
    const path: () => string;
}
/**
 * @controller AuthController.refresh
 * @path GET /auth/refresh
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
export declare function refresh(connection: IConnection): Promise<refresh.Output>;
export declare namespace refresh {
    type Output = IPropagation<{
        200: SuccesfulRequestAuthSessionDTO | FailedRequest;
    }, 200>;
    const METADATA: {
        readonly method: "GET";
        readonly path: "/auth/refresh";
        readonly request: null;
        readonly response: {
            readonly type: "application/json";
            readonly encrypted: false;
        };
        readonly status: 200;
    };
    const path: () => string;
}
/**
 * @controller AuthController.logout
 * @path POST /auth/logout
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
export declare function logout(connection: IConnection): Promise<logout.Output>;
export declare namespace logout {
    type Output = IPropagation<{
        201: SuccesfulRequestnull | FailedRequest;
    }, 201>;
    const METADATA: {
        readonly method: "POST";
        readonly path: "/auth/logout";
        readonly request: null;
        readonly response: {
            readonly type: "application/json";
            readonly encrypted: false;
        };
        readonly status: 201;
    };
    const path: () => string;
}
