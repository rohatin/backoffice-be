"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = create;
exports.findAll = findAll;
exports.findAllForUser = findAllForUser;
const PlainFetcher_1 = require("@nestia/fetcher/lib/PlainFetcher");
/**
 * @controller TransactionController.create
 * @path POST /transactions
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
async function create(connection, body) {
    return PlainFetcher_1.PlainFetcher.propagate({
        ...connection,
        headers: {
            ...connection.headers,
            "Content-Type": "application/json",
        },
    }, {
        ...create.METADATA,
        template: create.METADATA.path,
        path: create.path(),
    }, body);
}
(function (create) {
    create.METADATA = {
        method: "POST",
        path: "/transactions",
        request: {
            type: "application/json",
            encrypted: false,
        },
        response: {
            type: "application/json",
            encrypted: false,
        },
        status: 201,
    };
    create.path = () => "/transactions";
})(create || (exports.create = create = {}));
/**
 * @controller TransactionController.findAll
 * @path GET /transactions
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
async function findAll(connection) {
    return PlainFetcher_1.PlainFetcher.propagate(connection, {
        ...findAll.METADATA,
        template: findAll.METADATA.path,
        path: findAll.path(),
    });
}
(function (findAll) {
    findAll.METADATA = {
        method: "GET",
        path: "/transactions",
        request: null,
        response: {
            type: "application/json",
            encrypted: false,
        },
        status: 200,
    };
    findAll.path = () => "/transactions";
})(findAll || (exports.findAll = findAll = {}));
/**
 * @controller TransactionController.findAllForUser
 * @path GET /transactions/:userId
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
async function findAllForUser(connection, targetUserId) {
    return PlainFetcher_1.PlainFetcher.propagate(connection, {
        ...findAllForUser.METADATA,
        template: findAllForUser.METADATA.path,
        path: findAllForUser.path(targetUserId),
    });
}
(function (findAllForUser) {
    findAllForUser.METADATA = {
        method: "GET",
        path: "/transactions/:userId",
        request: null,
        response: {
            type: "application/json",
            encrypted: false,
        },
        status: 200,
    };
    findAllForUser.path = (targetUserId) => { var _a; return `/transactions/${encodeURIComponent((_a = targetUserId === null || targetUserId === void 0 ? void 0 : targetUserId.toString()) !== null && _a !== void 0 ? _a : "null")}`; };
})(findAllForUser || (exports.findAllForUser = findAllForUser = {}));
