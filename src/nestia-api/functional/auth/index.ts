/**
 * @packageDocumentation
 * @module api.functional.auth
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
//================================================================
import type { IConnection, IPropagation } from "@nestia/fetcher";
import { PlainFetcher } from "@nestia/fetcher/lib/PlainFetcher";

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
export async function login(
  connection: IConnection,
  body: login.Input,
): Promise<login.Output> {
  return PlainFetcher.propagate<any, any>(
    {
      ...connection,
      headers: {
        ...connection.headers,
        "Content-Type": "application/json",
      },
    },
    {
      ...login.METADATA,
      template: login.METADATA.path,
      path: login.path(),
    },
    body,
  );
}
export namespace login {
  export type Input = InitiateLoginDTO;
  export type Output = IPropagation<
    {
      201: SuccesfulRequestAuthSessionDTO | FailedRequest;
    },
    201
  >;

  export const METADATA = {
    method: "POST",
    path: "/auth/login",
    request: {
      type: "application/json",
      encrypted: false,
    },
    response: {
      type: "application/json",
      encrypted: false,
    },
    status: 201,
  } as const;

  export const path = () => "/auth/login";
}

/**
 * @controller AuthController.refresh
 * @path GET /auth/refresh
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
export async function refresh(
  connection: IConnection,
): Promise<refresh.Output> {
  return PlainFetcher.propagate<any>(connection, {
    ...refresh.METADATA,
    template: refresh.METADATA.path,
    path: refresh.path(),
  });
}
export namespace refresh {
  export type Output = IPropagation<
    {
      200: SuccesfulRequestAuthSessionDTO | FailedRequest;
    },
    200
  >;

  export const METADATA = {
    method: "GET",
    path: "/auth/refresh",
    request: null,
    response: {
      type: "application/json",
      encrypted: false,
    },
    status: 200,
  } as const;

  export const path = () => "/auth/refresh";
}

/**
 * @controller AuthController.logout
 * @path POST /auth/logout
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
export async function logout(connection: IConnection): Promise<logout.Output> {
  return PlainFetcher.propagate<any, any>(connection, {
    ...logout.METADATA,
    template: logout.METADATA.path,
    path: logout.path(),
  });
}
export namespace logout {
  export type Output = IPropagation<
    {
      201: SuccesfulRequestnull | FailedRequest;
    },
    201
  >;

  export const METADATA = {
    method: "POST",
    path: "/auth/logout",
    request: null,
    response: {
      type: "application/json",
      encrypted: false,
    },
    status: 201,
  } as const;

  export const path = () => "/auth/logout";
}
