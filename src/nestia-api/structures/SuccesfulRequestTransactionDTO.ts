import type { TransactionDTO } from "./TransactionDTO";

export type SuccesfulRequestTransactionDTO = {
  message: string;
  data: TransactionDTO;
  status: true;
};
