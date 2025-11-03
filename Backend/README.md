# Portfolio Dashboard Backend

This is the Node.js Express backend for the Portfolio Dashboard application.

## Setup

1. Install dependencies:
```bash
cd backend
npm install
```

2. Create a `.env` file:
```bash
cp .env.example .env
```

3. Start the server:
```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

The server will run on `http://localhost:5000`

## API Endpoints

### Get Portfolio Data
```
GET /api/portfolio
```
Returns all portfolio stocks with calculated values.

### Get Stock by Symbol
```
GET /api/stock/:symbol
```
Returns current market data for a specific stock symbol.

### Get Sector Summary
```
GET /api/portfolio/sectors
```
Returns list of sectors in the portfolio.

### Health Check
```
GET /health
```
Returns server status.

## Data Flow

Currently using mock data for demonstration. To integrate real APIs:

1. **Yahoo Finance**: Replace mock data in `mockStockData` with actual API calls
2. **Google Finance**: Add API integration for P/E ratio and earnings data

## Notes

- The application currently uses simulated data
- Real API integration requires handling rate limits and authentication
- Consider implementing caching to reduce API calls
- Add error handling and retry logic for production use
