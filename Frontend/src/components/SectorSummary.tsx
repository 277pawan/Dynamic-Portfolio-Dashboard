import { SectorSummary as SectorSummaryType } from '@/types/portfolio';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PortfolioTable } from './PortfolioTable';

interface SectorSummaryProps {
  sector: SectorSummaryType;
}

export const SectorSummary = ({ sector }: SectorSummaryProps) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <Card className="mb-6">
      <CardHeader className="bg-muted/30">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-semibold">{sector.sector}</CardTitle>
          <div className="flex gap-6 text-sm">
            <div>
              <span className="text-muted-foreground">Investment: </span>
              <span className="font-semibold">{formatCurrency(sector.totalInvestment)}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Present Value: </span>
              <span className="font-semibold">{formatCurrency(sector.totalPresentValue)}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Gain/Loss: </span>
              <span className={`font-semibold ${
                sector.gainLoss >= 0 ? 'text-success' : 'text-destructive'
              }`}>
                {sector.gainLoss >= 0 ? '+' : ''}{formatCurrency(sector.gainLoss)}
              </span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <PortfolioTable stocks={sector.stocks} />
      </CardContent>
    </Card>
  );
};
