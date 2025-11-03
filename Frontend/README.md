# Dynamic Portfolio Dashboard

A real-time portfolio tracking application built with React, TypeScript, Tailwind CSS, and Node.js Express.

## Features

- **Real-time Portfolio Tracking**: View all your stock holdings with live price updates
- **Sector-wise Grouping**: Stocks organized by sectors with summary statistics
- **Automatic Updates**: Prices refresh every 15 seconds
- **Comprehensive Metrics**: 
  - Purchase Price & Current Market Price (CMP)
  - Investment & Present Value
  - Gain/Loss with percentage
  - P/E Ratio & Latest Earnings
- **Color-coded Performance**: Green for gains, red for losses
- **Responsive Design**: Works on all device sizes

## Tech Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **shadcn/ui** for UI components
- **React Query** for data fetching
- **Vite** for build tooling

### Backend
- **Node.js** with Express
- **CORS** enabled for cross-origin requests
- **Axios** for HTTP requests

## Project Structure

```
portfolio-dashboard/
├── backend/
│   ├── server.js           # Express server
│   ├── package.json        # Backend dependencies
│   └── README.md           # Backend documentation
├── src/
│   ├── components/         # React components
│   │   ├── PortfolioTable.tsx
│   │   ├── SectorSummary.tsx
│   │   └── PortfolioStats.tsx
│   ├── pages/
│   │   └── Index.tsx       # Main dashboard page
│   ├── services/
│   │   └── portfolioService.ts
│   ├── types/
│   │   └── portfolio.ts    # TypeScript interfaces
│   └── index.css           # Global styles
└── README.md
```

## Installation & Setup

### Frontend Setup

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:8080`

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install backend dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Start the backend server:
```bash
# Development mode
npm run dev

# Production mode
npm start
```

The API will be available at `http://localhost:5000`

## Usage

1. Start both frontend and backend servers
2. Open `http://localhost:8080` in your browser
3. View your portfolio dashboard with real-time updates
4. Click "Refresh Now" for manual updates
5. Data automatically refreshes every 15 seconds

## API Integration

### Current Implementation
- Using mock data for demonstration
- Simulated price updates every 15 seconds
- All calculations done in real-time

### Integrating Real APIs

To connect to Yahoo Finance and Google Finance:

1. **Yahoo Finance** (for CMP):
   - Use unofficial libraries like `yahoo-finance2` or `node-yahoo-finance`
   - Or implement web scraping with `puppeteer` or `cheerio`

2. **Google Finance** (for P/E Ratio & Earnings):
   - Use web scraping techniques
   - Or find unofficial API wrappers

Example implementation in `backend/server.js`:

```javascript
// Install: npm install yahoo-finance2
const yahooFinance = require('yahoo-finance2').default;

app.get('/api/stock/:symbol', async (req, res) => {
  try {
    const quote = await yahooFinance.quote(req.params.symbol);
    res.json({
      success: true,
      data: {
        cmp: quote.regularMarketPrice,
        peRatio: quote.trailingPE,
        // ... other fields
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});
```

## Key Features Explained

### Auto-refresh Mechanism
```typescript
useEffect(() => {
  const interval = setInterval(() => {
    refreshPrices();
  }, 15000); // 15 seconds
  
  return () => clearInterval(interval);
}, []);
```

### Sector Grouping
Stocks are automatically grouped by sector with aggregated statistics:
- Total Investment per sector
- Total Present Value per sector
- Gain/Loss per sector

### Color Coding
- **Green**: Positive gains
- **Red**: Losses
- Applies to both individual stocks and sector summaries

## Technical Challenges Addressed

1. **API Limitations**: Using mock data initially, with structure ready for real API integration
2. **Rate Limiting**: Implemented 15-second refresh interval to avoid excessive API calls
3. **Data Transformation**: Clean separation between raw API data and displayed data
4. **Error Handling**: Try-catch blocks and user-friendly error messages
5. **Performance**: Memoization and efficient re-rendering strategies
6. **Responsiveness**: Tailwind CSS for mobile-first responsive design

## Deployment

### Frontend Deployment (Vercel)
```bash
npm run build
# Deploy the dist/ folder to Vercel
```

### Backend Deployment (Railway/Render)
```bash
# Push backend folder to your hosting platform
# Set environment variables
# Start with: npm start
```

## Environment Variables

### Backend (.env)
```
PORT=5000
YAHOO_FINANCE_API_KEY=your_key_here
GOOGLE_FINANCE_API_KEY=your_key_here
```

## Development Notes

- The application currently uses simulated data for demonstration
- Real API integration requires handling authentication and rate limits
- Consider implementing caching for production use
- Add comprehensive error handling for network failures
- Implement user authentication for personalized portfolios

## Future Enhancements

- [ ] User authentication and personalized portfolios
- [ ] Historical performance charts
- [ ] Portfolio alerts and notifications
- [ ] Export data to CSV/Excel
- [ ] Advanced filtering and search
- [ ] Multiple portfolio support
- [ ] Dividend tracking
- [ ] Tax calculation features

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is open source and available for educational purposes.

## Support

For issues or questions, please create an issue in the repository.

---

**Note**: This application is for educational purposes. Always verify financial data from official sources before making investment decisions.
