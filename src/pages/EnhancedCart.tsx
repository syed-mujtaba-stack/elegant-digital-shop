
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/contexts/CartContext';
import { useCoupon } from '@/contexts/CouponContext';
import { BulkDiscountCalculator } from '@/components/BulkDiscountCalculator';
import { GiftCardManager } from '@/components/GiftCardManager';
import { SaveForLater } from '@/components/SaveForLater';
import CouponInput from '@/components/CouponInput';
import { ShoppingCart, Minus, Plus, Trash2, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const EnhancedCart = () => {
  const { state, updateQuantity, removeItem, clearCart } = useCart();
  const { calculateDiscount } = useCoupon();
  const navigate = useNavigate();
  
  const [bulkDiscount, setBulkDiscount] = useState(0);
  const [appliedGiftCards, setAppliedGiftCards] = useState<{ code: string; amount: number }[]>([]);

  const subtotal = state.total;
  const couponDiscount = calculateDiscount(subtotal);
  const giftCardDiscount = appliedGiftCards.reduce((sum, gc) => sum + gc.amount, 0);
  const totalDiscount = couponDiscount + bulkDiscount + giftCardDiscount;
  const tax = (subtotal - totalDiscount) * 0.08;
  const finalTotal = Math.max(0, subtotal - totalDiscount + tax);

  const handleBulkDiscountChange = (discount: number, tier: any) => {
    setBulkDiscount(discount);
  };

  const handleGiftCardApplied = (amount: number, code: string) => {
    setAppliedGiftCards(prev => [...prev, { code, amount }]);
  };

  const handleGiftCardRemoved = (code: string) => {
    setAppliedGiftCards(prev => prev.filter(gc => gc.code !== code));
  };

  const handleSaveForLater = (item: any) => {
    // This would typically save to a saved items context
    removeItem(item.id);
  };

  const handleMoveToCart = (item: any) => {
    // Add saved item back to cart
    updateQuantity(item.id, 1);
  };

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <Card>
            <CardContent className="text-center py-16">
              <ShoppingCart className="h-16 w-16 mx-auto mb-4 text-gray-400" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Your cart is empty</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">Add some products to get started</p>
              <Button onClick={() => navigate('/products')}>Continue Shopping</Button>
            </CardContent>
          </Card>
          <div className="mt-8">
            <SaveForLater onMoveToCart={handleMoveToCart} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Cart Items ({state.items.length})</span>
                  <Button variant="outline" size="sm" onClick={clearCart}>
                    Clear All
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {state.items.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 p-4 border rounded-lg">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 dark:text-white">{item.name}</h3>
                      <p className="text-lg font-semibold text-blue-600">${item.price}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleSaveForLater(item)}
                      >
                        <Heart className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <SaveForLater onMoveToCart={handleMoveToCart} />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <BulkDiscountCalculator
              totalItems={state.items.reduce((sum, item) => sum + item.quantity, 0)}
              subtotal={subtotal}
              onDiscountChange={handleBulkDiscountChange}
            />

            <CouponInput />

            <GiftCardManager
              onGiftCardApplied={handleGiftCardApplied}
              onGiftCardRemoved={handleGiftCardRemoved}
              appliedGiftCards={appliedGiftCards}
              cartTotal={subtotal}
            />

            {/* Order Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                
                {couponDiscount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Coupon Discount</span>
                    <span>-${couponDiscount.toFixed(2)}</span>
                  </div>
                )}
                
                {bulkDiscount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Bulk Discount</span>
                    <span>-${bulkDiscount.toFixed(2)}</span>
                  </div>
                )}
                
                {giftCardDiscount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Gift Card</span>
                    <span>-${giftCardDiscount.toFixed(2)}</span>
                  </div>
                )}
                
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                
                <Separator />
                
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>${finalTotal.toFixed(2)}</span>
                </div>

                {totalDiscount > 0 && (
                  <div className="text-sm text-green-600 text-center">
                    You saved ${totalDiscount.toFixed(2)}!
                  </div>
                )}

                <Button 
                  className="w-full bg-blue-600 hover:bg-blue-700 mt-4"
                  onClick={() => navigate('/checkout')}
                >
                  Proceed to Checkout
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedCart;
