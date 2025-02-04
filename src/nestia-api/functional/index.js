"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.transactions = exports.roles = exports.users = exports.auth = void 0;
exports.getHello = getHello;
const PlainFetcher_1 = require("@nestia/fetcher/lib/PlainFetcher");
exports.auth = __importStar(require("./auth"));
exports.users = __importStar(require("./users"));
exports.roles = __importStar(require("./roles"));
exports.transactions = __importStar(require("./transactions"));
/**
 * @controller HomeController.getHello
 * @path GET /
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
async function getHello(connection) {
    return PlainFetcher_1.PlainFetcher.propagate(connection, {
        ...getHello.METADATA,
        template: getHello.METADATA.path,
        path: getHello.path(),
    });
}
(function (getHello) {
    getHello.METADATA = {
        method: "GET",
        path: "/",
        request: null,
        response: {
            type: "application/json",
            encrypted: false,
        },
        status: 200,
    };
    getHello.path = () => "/";
})(getHello || (exports.getHello = getHello = {}));
