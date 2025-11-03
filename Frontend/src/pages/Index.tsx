import { useEffect, useState } from 'react';
import { Stock, SectorSummary as SectorSummaryType } from '@/types/portfolio';
import { fetchPortfolioData, updateStockPrices } from '@/services/portfolioService';
import { PortfolioStats } from '@/components/PortfolioStats';
import { SectorSummary } from '@/components/SectorSummary';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

const Index = () => {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [lastUpdated, setLastUpdated] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  const loadPortfolioData = async () => {
    try {
      const data = await fetchPortfolioData();
      setStocks(data);
      setLastUpdated(new Date().toLocaleTimeString());
      setIsLoading(false);
    } catch (error) {
      console.error('Error loading portfolio data:', error);
      setIsLoading(false);
    }
  };

  const refreshPrices = () => {
    setStocks(prevStocks => updateStockPrices(prevStocks));
    setLastUpdated(new Date().toLocaleTimeString());
  };

  useEffect(() => {
    loadPortfolioData();
  }, []);

  useEffect(() => {
    // Auto-refresh every 15 seconds
    const interval = setInterval(() => {
      refreshPrices();
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  // Group stocks by sector
  const sectorSummaries: SectorSummaryType[] = stocks.reduce((acc, stock) => {
    const existing = acc.find(s => s.sector === stock.sector);
    if (existing) {
      existing.stocks.push(stock);
      existing.totalInvestment += stock.investment;
      existing.totalPresentValue += stock.presentValue;
      existing.gainLoss += stock.gainLoss;
    } else {
      acc.push({
        sector: stock.sector,
        totalInvestment: stock.investment,
        totalPresentValue: stock.presentValue,
        gainLoss: stock.gainLoss,
        stocks: [stock]
      });
    }
    return acc;
  }, [] as SectorSummaryType[]);

  const totalInvestment = stocks.reduce((sum, stock) => sum + stock.investment, 0);
  const totalPresentValue = stocks.reduce((sum, stock) => sum + stock.presentValue, 0);
  const totalGainLoss = stocks.reduce((sum, stock) => sum + stock.gainLoss, 0);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <div className="text-lg text-muted-foreground">Loading portfolio data...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Portfolio Dashboard</h1>
            <p className="text-muted-foreground">Real-time portfolio tracking and analysis</p>
          </div>
          <Button onClick={refreshPrices} variant="outline" size="sm">
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh Now
          </Button>
        </div>

        <PortfolioStats
          totalInvestment={totalInvestment}
          totalPresentValue={totalPresentValue}
          totalGainLoss={totalGainLoss}
          lastUpdated={lastUpdated}
        />

        <div className="space-y-6">
          {sectorSummaries.map((sector) => (
            <SectorSummary key={sector.sector} sector={sector} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
