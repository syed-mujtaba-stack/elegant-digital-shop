
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye, ShoppingCart } from 'lucide-react';
import { useRecentlyViewed } from '@/contexts/RecentlyViewedContext';
import { useCart } from '@/contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

export const RecentlyViewedProducts = () => {
  const { state } = useRecentlyViewed();
  const { addItem } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = (product: any) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    });
    toast({
      title: "Added to cart!",
      description: `${product.name} has been added to your cart.`,
    });
  };

  if (state.items.length === 0) {
    return null;
  }

  return (
    <section className="py-8 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 mb-6">
          <Eye className="h-6 w-6 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Recently Viewed</h2>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {state.items.map((product) => (
            <Card key={product.id} className="group hover:shadow-lg transition-shadow">
              <div className="aspect-square overflow-hidden rounded-t-lg">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardContent className="p-3">
                <h3 className="font-medium text-sm text-gray-900 dark:text-white mb-1 line-clamp-2">
                  {product.name}
                </h3>
                <p className="text-lg font-bold text-blue-600 mb-2">${product.price}</p>
                <div className="flex gap-1">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 text-xs"
                    onClick={() => navigate(`/products/${product.id}`)}
                  >
                    View
                  </Button>
                  <Button
                    size="sm"
                    className="px-2"
                    onClick={() => handleAddToCart(product)}
                  >
                    <ShoppingCart className="h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
