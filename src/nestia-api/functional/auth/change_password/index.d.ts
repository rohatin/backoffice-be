/**
 * @packageDocumentation
 * @module api.functional.auth.change_password
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
import type { IConnection, IPropagation } from "@nestia/fetcher";
import type { ChangePasswordDTO } from "../../../structures/ChangePasswordDTO";
import type { FailedRequest } from "../../../structures/FailedRequest";
import type { SuccesfulRequestnull } from "../../../structures/SuccesfulRequestnull";
/**
 * @controller AuthController.changePassword
 * @path POST /auth/change-password
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
export declare function changePassword(connection: IConnection, body: changePassword.Input): Promise<changePassword.Output>;
export declare namespace changePassword {
    type Input = ChangePasswordDTO;
    type Output = IPropagation<{
        201: SuccesfulRequestnull | FailedRequest;
    }, 201>;
    const METADATA: {
        readonly method: "POST";
        readonly path: "/auth/change-password";
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
