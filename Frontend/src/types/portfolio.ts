export interface Stock {
  id: string;
  particulars: string;
  purchasePrice: number;
  quantity: number;
  investment: number;
  portfolioPercentage: number;
  exchange: string;
  cmp: number;
  presentValue: number;
  gainLoss: number;
  peRatio: number;
  latestEarnings: number;
  sector: string;
}

export interface SectorSummary {
  sector: string;
  totalInvestment: number;
  totalPresentValue: number;
  gainLoss: number;
  stocks: Stock[];
}
