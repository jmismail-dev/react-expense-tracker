export type Transaction = {
  id: string;
  category: string;
  description?: string | null;
  amount: number;
  timestamp: number;
};
