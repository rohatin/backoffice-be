export type CreateTransactionDTO = {
  type: "deposit" | "credit" | "withdraw" | "adminEnforced";
  subType: "reward" | "purchase" | "refund" | "bonus" | "fee";
  amount: number;
  status: "pending" | "success" | "failed";
  userId: number;
};
