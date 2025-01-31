import type { TransactionDTO } from "./TransactionDTO";
export type SuccesfulRequestArrayTransactionDTO = {
    message: string;
    data: TransactionDTO[];
    status: true;
};
