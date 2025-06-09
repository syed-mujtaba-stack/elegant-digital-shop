import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { useCoupon } from '@/contexts/CouponContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Minus, Plus, Trash2, Heart, ShoppingCart, ArrowRight } from 'lucide-react';
import { CouponInput } from '@/components/CouponInput';
import { BulkDiscountCalculator } from '@/components/BulkDiscountCalculator';
import { SaveForLater } from '@/components/SaveForLater';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

const EnhancedCart = () => {
  const { cart, addItem, removeItem, clearCart, getTotal } = useCart();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const { discount, applyCoupon, removeCoupon } = useCoupon();
  const navigate = useNavigate();

  const handleIncrement = (item: any) => {
    addItem({ ...item, quantity: 1 });
  };

  const handleDecrement = (item: any) => {
    if (item.quantity > 1) {
      removeItem({ ...item, quantity: -1 });
    }
  };

  const handleRemoveFromCart = (item: any) => {
    removeItem(item);
  };

  const handleMoveToWishlist = (item: any) => {
    addToWishlist(item);
    handleRemoveFromCart(item);
    toast({
      title: "Moved to wishlist!",
      description: `${item.name} has been moved to your wishlist.`,
    });
  };

  const handleRemoveFromWishlist = (item: any) => {
    removeFromWishlist(item.id);
  };

  const subtotal = getTotal();
  const shippingCost = subtotal > 50 ? 0 : 10;
  const total = subtotal - discount + shippingCost;

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen">
      <div className="max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <Card className="shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 pt-4 pl-4 pr-4">
            <CardTitle className="text-2xl font-bold">Shopping Cart</CardTitle>
            <Badge variant="secondary">{cart.length} items</Badge>
          </CardHeader>
          <CardContent className="p-4">
            {cart.length === 0 ? (
              <div className="text-center py-8">
                <ShoppingCart className="mx-auto h-10 w-10 text-gray-400 dark:text-gray-600 mb-2" />
                <p className="text-gray-500 dark:text-gray-400">Your cart is empty.</p>
                <Button onClick={() => navigate('/products')} className="mt-4">
                  Continue Shopping
                </Button>
              </div>
            ) : (
              <>
                <ul className="space-y-4">
                  {cart.map((item) => (
                    <li key={item.id} className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700">
                      <div className="flex items-center">
                        <div className="w-20 h-20 mr-4">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-md" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-800 dark:text-white">{item.name}</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Price: ${item.price}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center border border-gray-300 dark:border-gray-700 rounded-md">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDecrement(item)}
                            disabled={item.quantity === 1}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="px-2 text-gray-700 dark:text-gray-300">{item.quantity}</span>
                          <Button variant="ghost" size="icon" onClick={() => handleIncrement(item)}>
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleRemoveFromCart(item)}
                          className="text-red-500 hover:bg-red-50 hover:text-red-600 dark:hover:bg-gray-800"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleMoveToWishlist(item)}
                          className="text-blue-500 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-gray-800"
                        >
                          <Heart className="h-4 w-4" />
                        </Button>
                      </div>
                    </li>
                  ))}
                </ul>

                <Separator className="my-6" />

                <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                  <CouponInput />
                  <Button
                    onClick={clearCart}
                    variant="destructive"
                    className="bg-red-500 hover:bg-red-600 text-white"
                  >
                    Clear Cart
                  </Button>
                </div>

                <Separator className="my-6" />

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 dark:text-gray-300">Subtotal:</span>
                    <span className="font-semibold text-gray-900 dark:text-white">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 dark:text-gray-300">Shipping:</span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}
                    </span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700 dark:text-gray-300">Discount:</span>
                      <span className="font-semibold text-green-500">- ${discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 dark:text-gray-300 font-bold">Total:</span>
                    <span className="text-xl font-bold text-gray-900 dark:text-white">${total.toFixed(2)}</span>
                  </div>
                </div>

                <Separator className="my-6" />

                <div className="flex justify-end">
                  <Button onClick={() => navigate('/checkout')} className="bg-blue-500 hover:bg-blue-600 text-white">
                    Proceed to Checkout <ArrowRight className="ml-2" />
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {wishlist.length > 0 && (
          <Card className="shadow-md mt-8">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 pt-4 pl-4 pr-4">
              <CardTitle className="text-2xl font-bold">Wishlist</CardTitle>
              <Badge variant="secondary">{wishlist.length} items</Badge>
            </CardHeader>
            <CardContent className="p-4">
              <ul className="space-y-4">
                {wishlist.map((item) => (
                  <li key={item.id} className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center">
                      <div className="w-20 h-20 mr-4">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-md" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800 dark:text-white">{item.name}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Price: ${item.price}</p>
                      </div>
                    </div>
                    <div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleRemoveFromWishlist(item.id)}
                        className="text-red-500 hover:bg-red-50 hover:text-red-600 dark:hover:bg-gray-800"
                      >
                        Remove
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default EnhancedCart;
