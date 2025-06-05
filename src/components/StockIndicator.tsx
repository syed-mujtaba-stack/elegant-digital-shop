
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Package } from 'lucide-react';

interface StockIndicatorProps {
  inStock: boolean;
  stockLevel?: number;
  showLevel?: boolean;
}

const StockIndicator = ({ inStock, stockLevel = 0, showLevel = false }: StockIndicatorProps) => {
  if (!inStock) {
    return (
      <Badge variant="destructive" className="flex items-center gap-1">
        <AlertTriangle className="h-3 w-3" />
        Out of Stock
      </Badge>
    );
  }

  if (showLevel && stockLevel <= 5) {
    return (
      <Badge variant="outline" className="text-orange-600 border-orange-600 flex items-center gap-1">
        <Package className="h-3 w-3" />
        Only {stockLevel} left
      </Badge>
    );
  }

  return (
    <Badge className="bg-green-600 flex items-center gap-1">
      <Package className="h-3 w-3" />
      In Stock
    </Badge>
  );
};

export default StockIndicator;
