import type { Format } from "typia/lib/tags/Format";
import { TransactionSubType } from "./transaction-subtype.enum";
import { TransactionType } from "./transaction-type.enum";
import { TransactionStatus } from "./transaction-status.enum";
export type TransactionDTO = {
    id: number;
    type: TransactionType;
    subType: TransactionSubType;
    amount: number;
    status: TransactionStatus;
    userId: number;
    description: null | string;
    createdAt: string & Format<"date-time">;
    updatedAt: string & Format<"date-time">;
};
