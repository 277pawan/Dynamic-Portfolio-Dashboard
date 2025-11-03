import { Stock } from '@/types/portfolio';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface PortfolioTableProps {
  stocks: Stock[];
}

export const PortfolioTable = ({ stocks }: PortfolioTableProps) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const formatNumber = (value: number, decimals: number = 2) => {
    return value.toFixed(decimals);
  };

  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="font-semibold">Particulars</TableHead>
            <TableHead className="font-semibold text-right">Purchase Price</TableHead>
            <TableHead className="font-semibold text-right">Qty</TableHead>
            <TableHead className="font-semibold text-right">Investment</TableHead>
            <TableHead className="font-semibold text-right">Portfolio %</TableHead>
            <TableHead className="font-semibold">Exchange</TableHead>
            <TableHead className="font-semibold text-right">CMP</TableHead>
            <TableHead className="font-semibold text-right">Present Value</TableHead>
            <TableHead className="font-semibold text-right">Gain/Loss</TableHead>
            <TableHead className="font-semibold text-right">P/E Ratio</TableHead>
            <TableHead className="font-semibold text-right">Latest Earnings</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {stocks.map((stock) => (
            <TableRow key={stock.id} className="hover:bg-muted/30 transition-colors">
              <TableCell className="font-medium">{stock.particulars}</TableCell>
              <TableCell className="text-right">{formatCurrency(stock.purchasePrice)}</TableCell>
              <TableCell className="text-right">{stock.quantity}</TableCell>
              <TableCell className="text-right">{formatCurrency(stock.investment)}</TableCell>
              <TableCell className="text-right">{formatNumber(stock.portfolioPercentage)}%</TableCell>
              <TableCell>
                <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-primary/10 text-primary">
                  {stock.exchange}
                </span>
              </TableCell>
              <TableCell className="text-right font-medium">{formatCurrency(stock.cmp)}</TableCell>
              <TableCell className="text-right">{formatCurrency(stock.presentValue)}</TableCell>
              <TableCell className={`text-right font-semibold ${
                stock.gainLoss >= 0 ? 'text-success' : 'text-destructive'
              }`}>
                {stock.gainLoss >= 0 ? '+' : ''}{formatCurrency(stock.gainLoss)}
              </TableCell>
              <TableCell className="text-right">{formatNumber(stock.peRatio)}</TableCell>
              <TableCell className="text-right">{formatCurrency(stock.latestEarnings)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
