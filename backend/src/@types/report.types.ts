export type ReportType = {
  period: string;
  totalIncome: number;
  totalExpenses: number;
  availableBalance: number;
  savingRate: number;
  topSpendingCategories: Array<{
    name: string;
    percent: number;
  }>;
  insights: string[];
};
