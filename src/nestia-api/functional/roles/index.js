"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAll = findAll;
exports.create = create;
exports.updatePermissions = updatePermissions;
const PlainFetcher_1 = require("@nestia/fetcher/lib/PlainFetcher");
/**
 * @controller RoleController.findAll
 * @path GET /roles
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
        path: "/roles",
        request: null,
        response: {
            type: "application/json",
            encrypted: false,
        },
        status: 200,
    };
    findAll.path = () => "/roles";
})(findAll || (exports.findAll = findAll = {}));
/**
 * @controller RoleController.create
 * @path POST /roles
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
async function create(connection, createRoleDto) {
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
    }, createRoleDto);
}
(function (create) {
    create.METADATA = {
        method: "POST",
        path: "/roles",
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
    create.path = () => "/roles";
})(create || (exports.create = create = {}));
/**
 * @controller RoleController.updatePermissions
 * @path PATCH /roles
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
async function updatePermissions(connection, updatePermissionsDto) {
    return PlainFetcher_1.PlainFetcher.propagate({
        ...connection,
        headers: {
            ...connection.headers,
            "Content-Type": "application/json",
        },
    }, {
        ...updatePermissions.METADATA,
        template: updatePermissions.METADATA.path,
        path: updatePermissions.path(),
    }, updatePermissionsDto);
}
(function (updatePermissions) {
    updatePermissions.METADATA = {
        method: "PATCH",
        path: "/roles",
        request: {
            type: "application/json",
            encrypted: false,
        },
        response: {
            type: "application/json",
            encrypted: false,
        },
        status: 200,
    };
    updatePermissions.path = () => "/roles";
})(updatePermissions || (exports.updatePermissions = updatePermissions = {}));
