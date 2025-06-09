
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

interface StockLevelIndicatorProps {
  currentStock: number;
  maxStock?: number;
  threshold?: {
    low: number;
    medium: number;
  };
  showProgress?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const StockLevelIndicator = ({ 
  currentStock, 
  maxStock = 100, 
  threshold = { low: 10, medium: 30 },
  showProgress = false,
  size = 'md'
}: StockLevelIndicatorProps) => {
  const getStockStatus = () => {
    if (currentStock <= 0) {
      return {
        status: 'out-of-stock',
        label: 'Out of Stock',
        color: 'bg-red-500',
        textColor: 'text-red-600',
        icon: XCircle,
        badge: 'destructive' as const
      };
    } else if (currentStock <= threshold.low) {
      return {
        status: 'low-stock',
        label: 'Low Stock',
        color: 'bg-orange-500',
        textColor: 'text-orange-600',
        icon: AlertTriangle,
        badge: 'destructive' as const
      };
    } else if (currentStock <= threshold.medium) {
      return {
        status: 'medium-stock',
        label: 'Limited Stock',
        color: 'bg-yellow-500',
        textColor: 'text-yellow-600',
        icon: AlertTriangle,
        badge: 'secondary' as const
      };
    } else {
      return {
        status: 'in-stock',
        label: 'In Stock',
        color: 'bg-green-500',
        textColor: 'text-green-600',
        icon: CheckCircle,
        badge: 'default' as const
      };
    }
  };

  const stockStatus = getStockStatus();
  const Icon = stockStatus.icon;
  const stockPercentage = Math.min((currentStock / maxStock) * 100, 100);

  const sizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  };

  const iconSizes = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-5 w-5'
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Badge variant={stockStatus.badge} className={sizeClasses[size]}>
          <Icon className={`${iconSizes[size]} mr-1`} />
          {stockStatus.label}
        </Badge>
        {currentStock > 0 && (
          <span className={`${sizeClasses[size]} ${stockStatus.textColor} font-medium`}>
            {currentStock} left
          </span>
        )}
      </div>

      {showProgress && currentStock > 0 && (
        <div className="space-y-1">
          <Progress 
            value={stockPercentage} 
            className="h-2"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>Stock Level</span>
            <span>{currentStock}/{maxStock}</span>
          </div>
        </div>
      )}

      {/* Urgency Message */}
      {currentStock > 0 && currentStock <= threshold.low && (
        <p className={`${sizeClasses[size]} ${stockStatus.textColor} font-medium`}>
          ⚡ Only {currentStock} left! Order soon.
        </p>
      )}
    </div>
  );
};
