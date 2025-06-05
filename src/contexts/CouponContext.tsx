
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Coupon {
  code: string;
  discount: number;
  type: 'percentage' | 'fixed';
  minAmount?: number;
}

const coupons: Coupon[] = [
  { code: 'SAVE10', discount: 10, type: 'percentage' },
  { code: 'WELCOME20', discount: 20, type: 'fixed', minAmount: 100 },
  { code: 'SUMMER15', discount: 15, type: 'percentage', minAmount: 50 },
];

interface CouponContextType {
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string, cartTotal: number) => boolean;
  removeCoupon: () => void;
  calculateDiscount: (total: number) => number;
}

const CouponContext = createContext<CouponContextType | null>(null);

export const CouponProvider = ({ children }: { children: ReactNode }) => {
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);

  const applyCoupon = (code: string, cartTotal: number): boolean => {
    const coupon = coupons.find(c => c.code.toLowerCase() === code.toLowerCase());
    if (!coupon) return false;
    
    if (coupon.minAmount && cartTotal < coupon.minAmount) return false;
    
    setAppliedCoupon(coupon);
    return true;
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  const calculateDiscount = (total: number): number => {
    if (!appliedCoupon) return 0;
    
    if (appliedCoupon.type === 'percentage') {
      return (total * appliedCoupon.discount) / 100;
    }
    return appliedCoupon.discount;
  };

  return (
    <CouponContext.Provider value={{
      appliedCoupon,
      applyCoupon,
      removeCoupon,
      calculateDiscount
    }}>
      {children}
    </CouponContext.Provider>
  );
};

export const useCoupon = () => {
  const context = useContext(CouponContext);
  if (!context) {
    throw new Error('useCoupon must be used within a CouponProvider');
  }
  return context;
};
