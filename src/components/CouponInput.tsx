
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { X, Tag } from 'lucide-react';
import { useCoupon } from '@/contexts/CouponContext';
import { toast } from '@/hooks/use-toast';

interface CouponInputProps {
  cartTotal: number;
}

export const CouponInput = ({ cartTotal }: CouponInputProps) => {
  const [couponCode, setCouponCode] = useState('');
  const { appliedCoupon, applyCoupon, removeCoupon, calculateDiscount } = useCoupon();

  const handleApplyCoupon = () => {
    if (!couponCode.trim()) return;
    
    const success = applyCoupon(couponCode, cartTotal);
    if (success) {
      toast({
        title: "Coupon applied!",
        description: `Discount code "${couponCode}" has been applied.`,
      });
      setCouponCode('');
    } else {
      toast({
        title: "Invalid coupon",
        description: "This coupon code is invalid or doesn't meet the requirements.",
        variant: "destructive",
      });
    }
  };

  const handleRemoveCoupon = () => {
    removeCoupon();
    toast({
      title: "Coupon removed",
      description: "The discount code has been removed.",
    });
  };

  const discount = calculateDiscount(cartTotal);

  return (
    <div className="space-y-3">
      {appliedCoupon ? (
        <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center gap-2">
            <Tag className="h-4 w-4 text-green-600" />
            <span className="font-medium text-green-800">{appliedCoupon.code}</span>
            <Badge className="bg-green-600">
              -{appliedCoupon.type === 'percentage' ? `${appliedCoupon.discount}%` : `$${appliedCoupon.discount}`}
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-800 font-medium">-${discount.toFixed(2)}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleRemoveCoupon}
              className="p-1 h-auto"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex gap-2">
          <Input
            placeholder="Enter coupon code"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleApplyCoupon()}
          />
          <Button onClick={handleApplyCoupon} disabled={!couponCode.trim()}>
            Apply
          </Button>
        </div>
      )}
      
      {/* Available Coupons Hint */}
      {!appliedCoupon && (
        <div className="text-xs text-gray-500">
          Try: SAVE10, WELCOME20, SUMMER15
        </div>
      )}
    </div>
  );
};
