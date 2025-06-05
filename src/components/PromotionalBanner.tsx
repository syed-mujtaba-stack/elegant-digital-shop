
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { X, ShoppingBag, Gift, Zap } from 'lucide-react';

const PromotionalBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Gift className="h-5 w-5 animate-bounce" />
            <div className="flex items-center space-x-2">
              <span className="font-semibold">Limited Time Offer!</span>
              <span className="hidden sm:inline">Get 20% off on orders over $100</span>
              <span className="inline sm:hidden">20% off orders $100+</span>
            </div>
            <Zap className="h-4 w-4 text-yellow-300" />
          </div>
          <div className="flex items-center space-x-4">
            <Button
              size="sm"
              variant="ghost"
              className="text-white hover:bg-white/20 hidden sm:flex"
            >
              <ShoppingBag className="h-4 w-4 mr-2" />
              Shop Now
            </Button>
            <button
              onClick={() => setIsVisible(false)}
              className="text-white hover:bg-white/20 p-1 rounded"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromotionalBanner;
