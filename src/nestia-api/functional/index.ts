/**
 * @packageDocumentation
 * @module api.functional
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
//================================================================
import type { IConnection, IPropagation } from "@nestia/fetcher";
import { PlainFetcher } from "@nestia/fetcher/lib/PlainFetcher";

export * as auth from "./auth";
export * as roles from "./roles";
export * as transactions from "./transactions";

/**
 * @controller HomeController.getHello
 * @path GET /
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
export async function getHello(
  connection: IConnection,
): Promise<getHello.Output> {
  return PlainFetcher.propagate<any>(connection, {
    ...getHello.METADATA,
    template: getHello.METADATA.path,
    path: getHello.path(),
  });
}
export namespace getHello {
  export type Output = IPropagation<
    {
      200: string;
    },
    200
  >;

  export const METADATA = {
    method: "GET",
    path: "/",
    request: null,
    response: {
      type: "application/json",
      encrypted: false,
    },
    status: 200,
  } as const;

  export const path = () => "/";
}
