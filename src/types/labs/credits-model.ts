import { Pageable, Sort } from "../common-model";

export interface CreditsPurchaseHistorySummary {
  content: CreditsPurchaseHistory[];
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  number_of_elements: number;
  pageable: Pageable;
  size: number;
  sort: Sort;
  total_elements: number;
  total_pages: number;
}

export interface CreditsPurchaseHistory {
  status: string;
  value: number;
  credit_amount: number;
  via: string;
  created_at: string;
}

export interface CreditsUsageHistorySummary {
  content: CreditsUsageHistory[];
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  number_of_elements: number;
  pageable: Pageable;
  size: number;
  sort: Sort;
  total_elements: number;
  total_pages: number;
}

export interface CreditsUsageHistory {
  created_at: string;
  credit_amount: number;
  credit_balance: number;
  description: string;
  price: number;
  type: PurchaseStatus;
  via: string;
}

export type PurchaseStatus = "PENDING" | "REJECTED" | "FAILED" | "PAID";
