
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Sparkles } from 'lucide-react';
import { products } from '@/data/products';
import { useCart } from '@/contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

interface ProductRecommendationsProps {
  currentProductId?: number;
  userId?: string;
  limit?: number;
}

export const ProductRecommendations = ({ 
  currentProductId, 
  userId, 
  limit = 4 
}: ProductRecommendationsProps) => {
  const { addItem } = useCart();
  const navigate = useNavigate();

  // Simple recommendation algorithm based on category and rating
  const getRecommendations = () => {
    let recommendedProducts = [...products];

    if (currentProductId) {
      const currentProduct = products.find(p => p.id === currentProductId);
      if (currentProduct) {
        // Filter by same category, exclude current product
        recommendedProducts = products.filter(p => 
          p.category === currentProduct.category && p.id !== currentProductId
        );
        
        // If not enough in same category, add other high-rated products
        if (recommendedProducts.length < limit) {
          const otherProducts = products
            .filter(p => p.category !== currentProduct.category && p.rating >= 4)
            .slice(0, limit - recommendedProducts.length);
          recommendedProducts = [...recommendedProducts, ...otherProducts];
        }
      }
    } else {
      // General recommendations - highest rated products
      recommendedProducts = products
        .filter(p => p.rating >= 4)
        .sort((a, b) => b.rating - a.rating);
    }

    return recommendedProducts.slice(0, limit);
  };

  const recommendations = getRecommendations();

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

  if (recommendations.length === 0) return null;

  return (
    <section className="py-8">
      <div className="flex items-center gap-2 mb-6">
        <Sparkles className="h-6 w-6 text-yellow-500" />
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          {currentProductId ? 'You might also like' : 'Recommended for you'}
        </h2>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {recommendations.map((product) => (
          <Card key={product.id} className="group hover:shadow-lg transition-shadow">
            <div className="aspect-square overflow-hidden rounded-t-lg relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <Badge className="absolute top-2 right-2 bg-yellow-500 text-black">
                Recommended
              </Badge>
            </div>
            <CardContent className="p-3">
              <h3 className="font-medium text-sm text-gray-900 dark:text-white mb-1 line-clamp-2">
                {product.name}
              </h3>
              <div className="flex items-center gap-1 mb-2">
                <span className="text-xs text-yellow-500">★</span>
                <span className="text-xs text-gray-600 dark:text-gray-400">{product.rating}</span>
              </div>
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
    </section>
  );
};
