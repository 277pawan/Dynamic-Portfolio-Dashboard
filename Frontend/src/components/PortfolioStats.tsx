import { Card, CardContent } from '@/components/ui/card';

interface PortfolioStatsProps {
  totalInvestment: number;
  totalPresentValue: number;
  totalGainLoss: number;
  lastUpdated: string;
}

export const PortfolioStats = ({ 
  totalInvestment, 
  totalPresentValue, 
  totalGainLoss,
  lastUpdated 
}: PortfolioStatsProps) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const gainLossPercentage = ((totalGainLoss / totalInvestment) * 100).toFixed(2);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <Card>
        <CardContent className="pt-6">
          <div className="text-sm text-muted-foreground mb-1">Total Investment</div>
          <div className="text-2xl font-bold">{formatCurrency(totalInvestment)}</div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
          <div className="text-sm text-muted-foreground mb-1">Present Value</div>
          <div className="text-2xl font-bold">{formatCurrency(totalPresentValue)}</div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
          <div className="text-sm text-muted-foreground mb-1">Total Gain/Loss</div>
          <div className={`text-2xl font-bold ${
            totalGainLoss >= 0 ? 'text-success' : 'text-destructive'
          }`}>
            {totalGainLoss >= 0 ? '+' : ''}{formatCurrency(totalGainLoss)}
          </div>
          <div className={`text-sm ${
            totalGainLoss >= 0 ? 'text-success' : 'text-destructive'
          }`}>
            {totalGainLoss >= 0 ? '+' : ''}{gainLossPercentage}%
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
          <div className="text-sm text-muted-foreground mb-1">Last Updated</div>
          <div className="text-lg font-semibold">{lastUpdated}</div>
          <div className="text-xs text-muted-foreground mt-1">Auto-refresh: 15s</div>
        </CardContent>
      </Card>
    </div>
  );
};
