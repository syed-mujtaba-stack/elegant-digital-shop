
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, Star, ShoppingCart } from 'lucide-react';
import { useComparison } from '@/contexts/ComparisonContext';
import { useCart } from '@/contexts/CartContext';
import { toast } from '@/hooks/use-toast';

interface ProductComparisonModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ProductComparisonModal = ({ isOpen, onOpenChange }: ProductComparisonModalProps) => {
  const { state, removeFromComparison, clearComparison } = useComparison();
  const { addItem } = useCart();

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
    return (
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Product Comparison</DialogTitle>
          </DialogHeader>
          <div className="text-center py-8">
            <p className="text-gray-500">No products to compare yet.</p>
            <p className="text-sm text-gray-400 mt-2">Add products to comparison from the product pages.</p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>Compare Products ({state.items.length}/3)</DialogTitle>
            <Button variant="outline" size="sm" onClick={clearComparison}>
              Clear All
            </Button>
          </div>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {state.items.map((product) => (
            <div key={product.id} className="border rounded-lg p-4 relative">
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-2 right-2 p-1"
                onClick={() => removeFromComparison(product.id)}
              >
                <X className="h-4 w-4" />
              </Button>
              
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              
              <div className="space-y-3">
                <div>
                  <Badge variant="secondary" className="mb-2">{product.category}</Badge>
                  <h3 className="font-semibold text-lg">{product.name}</h3>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(product.rating)
                            ? 'text-yellow-400 fill-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">{product.rating}</span>
                </div>
                
                <p className="text-2xl font-bold text-blue-600">${product.price}</p>
                
                <div className="space-y-2 text-sm">
                  <div><strong>Description:</strong></div>
                  <p className="text-gray-600 line-clamp-3">{product.description}</p>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div><strong>Key Features:</strong></div>
                  <ul className="space-y-1">
                    {product.features.slice(0, 3).map((feature, index) => (
                      <li key={index} className="text-gray-600">• {feature}</li>
                    ))}
                  </ul>
                </div>
                
                <Button
                  onClick={() => handleAddToCart(product)}
                  disabled={!product.inStock}
                  className="w-full"
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};
