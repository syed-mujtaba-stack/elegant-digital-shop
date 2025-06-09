
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bookmark, ShoppingCart, Trash2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface SavedItem {
  id: number;
  name: string;
  price: number;
  image: string;
  savedAt: Date;
}

interface SaveForLaterProps {
  onMoveToCart: (item: SavedItem) => void;
}

export const SaveForLater = ({ onMoveToCart }: SaveForLaterProps) => {
  const [savedItems, setSavedItems] = useState<SavedItem[]>([
    {
      id: 1,
      name: "Premium Wireless Headphones",
      price: 199.99,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
      savedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) // 2 days ago
    },
    {
      id: 2,
      name: "Smart Fitness Tracker",
      price: 149.99,
      image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400",
      savedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000) // 5 days ago
    }
  ]);

  const removeItem = (itemId: number) => {
    setSavedItems(prev => prev.filter(item => item.id !== itemId));
    toast({
      title: "Item removed",
      description: "Item has been removed from saved for later.",
    });
  };

  const moveToCart = (item: SavedItem) => {
    onMoveToCart(item);
    removeItem(item.id);
    toast({
      title: "Moved to cart",
      description: `${item.name} has been moved to your cart.`,
    });
  };

  const getDaysAgo = (date: Date) => {
    const diffTime = Date.now() - date.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    return diffDays === 0 ? 'Today' : `${diffDays} days ago`;
  };

  if (savedItems.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bookmark className="h-5 w-5" />
            Saved for Later
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            <Bookmark className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p>No items saved for later</p>
            <p className="text-sm">Items you save will appear here</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bookmark className="h-5 w-5" />
          Saved for Later ({savedItems.length})
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {savedItems.map((item) => (
          <div key={item.id} className="flex items-center gap-4 p-3 border rounded-lg">
            <img
              src={item.image}
              alt={item.name}
              className="w-16 h-16 object-cover rounded"
            />
            <div className="flex-1">
              <h3 className="font-medium">{item.name}</h3>
              <p className="text-lg font-bold text-blue-600">${item.price}</p>
              <Badge variant="secondary" className="text-xs">
                Saved {getDaysAgo(item.savedAt)}
              </Badge>
            </div>
            <div className="flex flex-col gap-2">
              <Button
                size="sm"
                onClick={() => moveToCart(item)}
              >
                <ShoppingCart className="h-4 w-4 mr-1" />
                Move to Cart
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => removeItem(item.id)}
              >
                <Trash2 className="h-4 w-4 mr-1" />
                Remove
              </Button>
            </div>
          </div>
        ))}
        
        {savedItems.length > 0 && (
          <div className="flex justify-between items-center pt-4 border-t">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Total saved: ${savedItems.reduce((sum, item) => sum + item.price, 0).toFixed(2)}
            </span>
            <Button 
              variant="outline"
              onClick={() => savedItems.forEach(item => moveToCart(item))}
            >
              Move All to Cart
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
