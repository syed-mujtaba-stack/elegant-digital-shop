
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { useCoupon } from '@/contexts/CouponContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Minus, Plus, Trash2, Heart, ShoppingCart, ArrowRight } from 'lucide-react';
import { CouponInput } from '@/components/CouponInput';
import { BulkCartActions } from '@/components/BulkCartActions';
import { StockLevelIndicator } from '@/components/StockLevelIndicator';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

const EnhancedCart = () => {
  const { state: cartState, addItem, removeItem, clearCart } = useCart();
  const { state: wishlistState, addToWishlist, removeFromWishlist } = useWishlist();
  const { calculateDiscount } = useCoupon();
  const navigate = useNavigate();

  const cart = cartState.items;
  const wishlist = wishlistState.items;
  const subtotal = cartState.total;
  const discount = calculateDiscount(subtotal);

  const handleIncrement = (item: any) => {
    addItem({ ...item, quantity: 1 });
  };

  const handleDecrement = (item: any) => {
    if (item.quantity > 1) {
      const newItem = { ...item, quantity: item.quantity - 1 };
      removeItem(item.id);
      addItem(newItem);
    }
  };

  const handleRemoveFromCart = (item: any) => {
    removeItem(item.id);
  };

  const handleMoveToWishlist = (item: any) => {
    addToWishlist(item);
    handleRemoveFromCart(item);
    toast({
      title: "Moved to wishlist!",
      description: `${item.name} has been moved to your wishlist.`,
    });
  };

  const handleBulkRemove = (itemIds: number[]) => {
    itemIds.forEach(id => removeItem(id));
  };

  const handleBulkMoveToWishlist = (items: any[]) => {
    items.forEach(item => {
      addToWishlist(item);
      removeItem(item.id);
    });
  };

  const handleRemoveFromWishlist = (item: any) => {
    removeFromWishlist(item.id);
  };

  const shippingCost = subtotal > 50 ? 0 : 10;
  const total = subtotal - discount + shippingCost;

  return (
    <div className="bg-background min-h-screen">
      <div className="max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <Card className="shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 pt-4 pl-4 pr-4">
            <CardTitle className="text-2xl font-bold">Shopping Cart</CardTitle>
            <Badge variant="secondary">{cart.length} items</Badge>
          </CardHeader>
          <CardContent className="p-4">
            {cart.length === 0 ? (
              <div className="text-center py-8">
                <ShoppingCart className="mx-auto h-10 w-10 text-muted-foreground mb-2" />
                <p className="text-muted-foreground">Your cart is empty.</p>
                <Button onClick={() => navigate('/products')} className="mt-4">
                  Continue Shopping
                </Button>
              </div>
            ) : (
              <>
                {/* Bulk Actions */}
                <BulkCartActions 
                  items={cart}
                  onBulkRemove={handleBulkRemove}
                  onBulkMoveToWishlist={handleBulkMoveToWishlist}
                />

                <ul className="space-y-4">
                  {cart.map((item) => (
                    <li key={item.id} className="flex items-center justify-between py-3 border-b border-border">
                      <div className="flex items-center flex-1">
                        <div className="w-20 h-20 mr-4">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-md" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground">{item.name}</h3>
                          <p className="text-sm text-muted-foreground">Price: ${item.price}</p>
                          <div className="mt-2">
                            <StockLevelIndicator 
                              currentStock={Math.floor(Math.random() * 50) + 5}
                              size="sm"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center border border-border rounded-md">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDecrement(item)}
                            disabled={item.quantity === 1}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="px-2 text-foreground">{item.quantity}</span>
                          <Button variant="ghost" size="icon" onClick={() => handleIncrement(item)}>
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleRemoveFromCart(item)}
                          className="text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleMoveToWishlist(item)}
                          className="text-primary hover:bg-primary/10"
                        >
                          <Heart className="h-4 w-4" />
                        </Button>
                      </div>
                    </li>
                  ))}
                </ul>

                <Separator className="my-6" />

                <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                  <CouponInput cartTotal={subtotal} />
                  <Button
                    onClick={clearCart}
                    variant="destructive"
                  >
                    Clear Cart
                  </Button>
                </div>

                <Separator className="my-6" />

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-foreground">Subtotal:</span>
                    <span className="font-semibold text-foreground">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-foreground">Shipping:</span>
                    <span className="font-semibold text-foreground">
                      {shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}
                    </span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between items-center">
                      <span className="text-foreground">Discount:</span>
                      <span className="font-semibold text-green-500">- ${discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center">
                    <span className="text-foreground font-bold">Total:</span>
                    <span className="text-xl font-bold text-foreground">${total.toFixed(2)}</span>
                  </div>
                </div>

                <Separator className="my-6" />

                <div className="flex justify-end">
                  <Button onClick={() => navigate('/checkout')} className="bg-primary hover:bg-primary/90 text-primary-foreground">
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
                  <li key={item.id} className="flex items-center justify-between py-3 border-b border-border">
                    <div className="flex items-center">
                      <div className="w-20 h-20 mr-4">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-md" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">Price: ${item.price}</p>
                      </div>
                    </div>
                    <div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleRemoveFromWishlist(item)}
                        className="text-destructive hover:bg-destructive/10"
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
