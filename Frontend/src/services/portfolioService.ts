import { Stock } from '@/types/portfolio';

// Mock data for demonstration
// In production, this would fetch from your Node.js backend
export const fetchPortfolioData = async (): Promise<Stock[]> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return [
    {
      id: '1',
      particulars: 'HDFC Bank Ltd',
      purchasePrice: 1450,
      quantity: 50,
      investment: 72500,
      portfolioPercentage: 15.2,
      exchange: 'NSE',
      cmp: 1580,
      presentValue: 79000,
      gainLoss: 6500,
      peRatio: 18.5,
      latestEarnings: 12500,
      sector: 'Financials'
    },
    {
      id: '2',
      particulars: 'Infosys Ltd',
      purchasePrice: 1420,
      quantity: 40,
      investment: 56800,
      portfolioPercentage: 11.9,
      exchange: 'NSE',
      cmp: 1465,
      presentValue: 58600,
      gainLoss: 1800,
      peRatio: 22.3,
      latestEarnings: 15200,
      sector: 'Technology'
    },
    {
      id: '3',
      particulars: 'Reliance Industries',
      purchasePrice: 2450,
      quantity: 30,
      investment: 73500,
      portfolioPercentage: 15.4,
      exchange: 'NSE',
      cmp: 2520,
      presentValue: 75600,
      gainLoss: 2100,
      peRatio: 25.6,
      latestEarnings: 18900,
      sector: 'Energy'
    },
    {
      id: '4',
      particulars: 'TCS Ltd',
      purchasePrice: 3250,
      quantity: 25,
      investment: 81250,
      portfolioPercentage: 17.1,
      exchange: 'NSE',
      cmp: 3180,
      presentValue: 79500,
      gainLoss: -1750,
      peRatio: 28.4,
      latestEarnings: 16800,
      sector: 'Technology'
    },
    {
      id: '5',
      particulars: 'ICICI Bank Ltd',
      purchasePrice: 820,
      quantity: 60,
      investment: 49200,
      portfolioPercentage: 10.3,
      exchange: 'NSE',
      cmp: 875,
      presentValue: 52500,
      gainLoss: 3300,
      peRatio: 16.2,
      latestEarnings: 9800,
      sector: 'Financials'
    },
    {
      id: '6',
      particulars: 'Asian Paints Ltd',
      purchasePrice: 2850,
      quantity: 20,
      investment: 57000,
      portfolioPercentage: 12.0,
      exchange: 'NSE',
      cmp: 2920,
      presentValue: 58400,
      gainLoss: 1400,
      peRatio: 65.8,
      latestEarnings: 5600,
      sector: 'Consumer Goods'
    },
    {
      id: '7',
      particulars: 'Wipro Ltd',
      purchasePrice: 425,
      quantity: 100,
      investment: 42500,
      portfolioPercentage: 8.9,
      exchange: 'NSE',
      cmp: 410,
      presentValue: 41000,
      gainLoss: -1500,
      peRatio: 19.5,
      latestEarnings: 7200,
      sector: 'Technology'
    },
    {
      id: '8',
      particulars: 'Dr. Reddy\'s Labs',
      purchasePrice: 4850,
      quantity: 10,
      investment: 48500,
      portfolioPercentage: 10.2,
      exchange: 'NSE',
      cmp: 4920,
      presentValue: 49200,
      gainLoss: 700,
      peRatio: 32.1,
      latestEarnings: 4500,
      sector: 'Healthcare'
    }
  ];
};

// Simulate real-time price updates
export const updateStockPrices = (stocks: Stock[]): Stock[] => {
  return stocks.map(stock => {
    // Random price change between -2% and +2%
    const changePercent = (Math.random() - 0.5) * 0.04;
    const newCmp = stock.cmp * (1 + changePercent);
    const newPresentValue = newCmp * stock.quantity;
    const newGainLoss = newPresentValue - stock.investment;
    
    return {
      ...stock,
      cmp: Math.round(newCmp * 100) / 100,
      presentValue: Math.round(newPresentValue * 100) / 100,
      gainLoss: Math.round(newGainLoss * 100) / 100
    };
  });
};
