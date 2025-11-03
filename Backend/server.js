const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Mock data - In production, you would fetch this from Yahoo/Google Finance
const mockStockData = {
  'HDFCBANK': { cmp: 1580, peRatio: 18.5, latestEarnings: 12500 },
  'INFY': { cmp: 1465, peRatio: 22.3, latestEarnings: 15200 },
  'RELIANCE': { cmp: 2520, peRatio: 25.6, latestEarnings: 18900 },
  'TCS': { cmp: 3180, peRatio: 28.4, latestEarnings: 16800 },
  'ICICIBANK': { cmp: 875, peRatio: 16.2, latestEarnings: 9800 },
  'ASIANPAINT': { cmp: 2920, peRatio: 65.8, latestEarnings: 5600 },
  'WIPRO': { cmp: 410, peRatio: 19.5, latestEarnings: 7200 },
  'DRREDDY': { cmp: 4920, peRatio: 32.1, latestEarnings: 4500 }
};

// Routes

// Get all portfolio stocks
app.get('/api/portfolio', (req, res) => {
  try {
    const portfolioData = [
      {
        id: '1',
        particulars: 'HDFC Bank Ltd',
        symbol: 'HDFCBANK',
        purchasePrice: 1450,
        quantity: 50,
        exchange: 'NSE',
        sector: 'Financials'
      },
      {
        id: '2',
        particulars: 'Infosys Ltd',
        symbol: 'INFY',
        purchasePrice: 1420,
        quantity: 40,
        exchange: 'NSE',
        sector: 'Technology'
      },
      {
        id: '3',
        particulars: 'Reliance Industries',
        symbol: 'RELIANCE',
        purchasePrice: 2450,
        quantity: 30,
        exchange: 'NSE',
        sector: 'Energy'
      },
      {
        id: '4',
        particulars: 'TCS Ltd',
        symbol: 'TCS',
        purchasePrice: 3250,
        quantity: 25,
        exchange: 'NSE',
        sector: 'Technology'
      },
      {
        id: '5',
        particulars: 'ICICI Bank Ltd',
        symbol: 'ICICIBANK',
        purchasePrice: 820,
        quantity: 60,
        exchange: 'NSE',
        sector: 'Financials'
      },
      {
        id: '6',
        particulars: 'Asian Paints Ltd',
        symbol: 'ASIANPAINT',
        purchasePrice: 2850,
        quantity: 20,
        exchange: 'NSE',
        sector: 'Consumer Goods'
      },
      {
        id: '7',
        particulars: 'Wipro Ltd',
        symbol: 'WIPRO',
        purchasePrice: 425,
        quantity: 100,
        exchange: 'NSE',
        sector: 'Technology'
      },
      {
        id: '8',
        particulars: 'Dr. Reddy\'s Labs',
        symbol: 'DRREDDY',
        purchasePrice: 4850,
        quantity: 10,
        exchange: 'NSE',
        sector: 'Healthcare'
      }
    ];

    // Calculate derived fields
    const enrichedData = portfolioData.map(stock => {
      const marketData = mockStockData[stock.symbol];
      const investment = stock.purchasePrice * stock.quantity;
      const presentValue = marketData.cmp * stock.quantity;
      const gainLoss = presentValue - investment;
      const totalInvestment = portfolioData.reduce((sum, s) => sum + (s.purchasePrice * s.quantity), 0);
      
      return {
        ...stock,
        investment,
        portfolioPercentage: (investment / totalInvestment) * 100,
        cmp: marketData.cmp,
        presentValue,
        gainLoss,
        peRatio: marketData.peRatio,
        latestEarnings: marketData.latestEarnings
      };
    });

    res.json({
      success: true,
      data: enrichedData
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch portfolio data'
    });
  }
});

// Get stock data by symbol
app.get('/api/stock/:symbol', (req, res) => {
  const { symbol } = req.params;
  
  try {
    const stockData = mockStockData[symbol];
    
    if (!stockData) {
      return res.status(404).json({
        success: false,
        error: 'Stock not found'
      });
    }

    // Simulate price fluctuation
    const priceChange = (Math.random() - 0.5) * 0.04; // +/- 2%
    const updatedCmp = stockData.cmp * (1 + priceChange);

    res.json({
      success: true,
      data: {
        symbol,
        cmp: Math.round(updatedCmp * 100) / 100,
        peRatio: stockData.peRatio,
        latestEarnings: stockData.latestEarnings,
        lastUpdated: new Date().toISOString()
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch stock data'
    });
  }
});

// Get sector-wise summary
app.get('/api/portfolio/sectors', (req, res) => {
  try {
    // This would aggregate portfolio data by sector
    res.json({
      success: true,
      data: {
        sectors: ['Financials', 'Technology', 'Energy', 'Consumer Goods', 'Healthcare']
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch sector data'
    });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`API available at http://localhost:${PORT}/api`);
});

module.exports = app;
