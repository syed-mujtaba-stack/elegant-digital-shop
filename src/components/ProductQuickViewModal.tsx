import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { ShoppingCart, ExternalLink, X } from 'lucide-react';

// Define a more specific product type based on your actual data structure
export interface QuickViewProduct {
  id: string | number;
  name: string;
  price: number;
  image: string;
  description?: string;
  category?: string;
  inStock?: boolean;
  // Add other relevant fields like stock status, ratings etc.
}

interface ProductQuickViewModalProps {
  product: QuickViewProduct | null;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onAddToCart: (product: QuickViewProduct) => void; 
}

export const ProductQuickViewModal: React.FC<ProductQuickViewModalProps> = ({ product, isOpen, onOpenChange, onAddToCart }) => {
  if (!product) {
    return null;
  }

  const handleAddToCartClick = () => {
    onAddToCart(product);
    onOpenChange(false); // Optionally close modal after adding to cart
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[650px] p-0 overflow-hidden">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-2xl font-semibold">{product.name}</DialogTitle>
          {product.category && (
            <DialogDescription className="text-sm text-muted-foreground">
              Category: {product.category}
            </DialogDescription>
          )}
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
          <div className="overflow-hidden rounded-lg">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-auto object-cover aspect-square transition-transform duration-300 hover:scale-105"
            />
          </div>
          <div>
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-4">
              ${product.price.toFixed(2)}
            </p>
            {product.description && (
              <div className="mb-4">
                <h4 className="font-semibold mb-1 text-gray-800 dark:text-gray-200">Description:</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 max-h-24 overflow-y-auto">
                  {product.description}
                </p>
              </div>
            )}
            {typeof product.inStock !== 'undefined' && (
              <p className={`text-sm font-semibold mb-4 ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
                {product.inStock ? 'In Stock' : 'Out of Stock'}
              </p>
            )}
            <div className="flex flex-col space-y-3">
              <Button 
                onClick={handleAddToCartClick} 
                disabled={!product.inStock}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
              </Button>
              <Button variant="outline" className="w-full" asChild>
                <Link to={`/products/${product.id}`} onClick={() => onOpenChange(false)}>
                  <ExternalLink className="mr-2 h-4 w-4" /> View Full Details
                </Link>
              </Button>
            </div>
          </div>
        </div>
        <DialogFooter className="p-6 pt-0 sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="ghost" className="absolute top-4 right-4 p-2 h-auto">
              <X className="h-5 w-5" />
              <span className="sr-only">Close</span>
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
