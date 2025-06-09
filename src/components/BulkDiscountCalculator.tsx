
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calculator, Percent } from 'lucide-react';

interface BulkDiscountTier {
  minQuantity: number;
  discountPercent: number;
  label: string;
}

const discountTiers: BulkDiscountTier[] = [
  { minQuantity: 3, discountPercent: 5, label: "5% off 3+ items" },
  { minQuantity: 5, discountPercent: 10, label: "10% off 5+ items" },
  { minQuantity: 10, discountPercent: 15, label: "15% off 10+ items" },
  { minQuantity: 20, discountPercent: 25, label: "25% off 20+ items" }
];

interface BulkDiscountCalculatorProps {
  totalItems: number;
  subtotal: number;
  onDiscountChange: (discount: number, tier: BulkDiscountTier | null) => void;
}

export const BulkDiscountCalculator = ({ 
  totalItems, 
  subtotal, 
  onDiscountChange 
}: BulkDiscountCalculatorProps) => {
  const [activeTier, setActiveTier] = useState<BulkDiscountTier | null>(null);

  useEffect(() => {
    // Find the highest applicable discount tier
    const applicableTier = discountTiers
      .filter(tier => totalItems >= tier.minQuantity)
      .sort((a, b) => b.discountPercent - a.discountPercent)[0] || null;

    setActiveTier(applicableTier);
    
    const discount = applicableTier 
      ? (subtotal * applicableTier.discountPercent) / 100 
      : 0;
    
    onDiscountChange(discount, applicableTier);
  }, [totalItems, subtotal, onDiscountChange]);

  if (totalItems === 0) return null;

  return (
    <Card className="border-dashed border-green-300 bg-green-50 dark:bg-green-900/20">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-green-700 dark:text-green-400">
          <Calculator className="h-4 w-4" />
          Bulk Discount Calculator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="text-sm text-gray-600 dark:text-gray-300">
          Current cart: {totalItems} items
        </div>

        {/* Show current discount if applicable */}
        {activeTier && (
          <div className="flex items-center justify-between p-2 bg-green-100 dark:bg-green-800 rounded-md">
            <Badge className="bg-green-600">
              <Percent className="h-3 w-3 mr-1" />
              {activeTier.label}
            </Badge>
            <span className="text-green-700 dark:text-green-300 font-medium">
              -${((subtotal * activeTier.discountPercent) / 100).toFixed(2)}
            </span>
          </div>
        )}

        {/* Show available tiers */}
        <div className="space-y-2">
          <div className="text-xs font-medium text-gray-700 dark:text-gray-300">
            Available Discounts:
          </div>
          {discountTiers.map((tier) => {
            const isActive = activeTier?.minQuantity === tier.minQuantity;
            const isUnlocked = totalItems >= tier.minQuantity;
            const itemsNeeded = Math.max(0, tier.minQuantity - totalItems);

            return (
              <div
                key={tier.minQuantity}
                className={`flex items-center justify-between text-xs p-2 rounded ${
                  isActive
                    ? 'bg-green-200 dark:bg-green-700 text-green-800 dark:text-green-200'
                    : isUnlocked
                    ? 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                    : 'bg-gray-50 dark:bg-gray-800 text-gray-400'
                }`}
              >
                <span>{tier.label}</span>
                {isActive ? (
                  <Badge variant="secondary" className="text-xs">Active</Badge>
                ) : !isUnlocked ? (
                  <span>Need {itemsNeeded} more</span>
                ) : (
                  <span>Eligible</span>
                )}
              </div>
            );
          })}
        </div>

        {/* Next tier motivation */}
        {!activeTier && totalItems > 0 && (
          <div className="text-xs text-gray-600 dark:text-gray-400 text-center">
            Add {3 - totalItems} more items to unlock 5% discount!
          </div>
        )}
      </CardContent>
    </Card>
  );
};
