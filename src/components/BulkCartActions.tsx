
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trash2, Heart, ShoppingCart } from 'lucide-react';
import { CartItem } from '@/contexts/CartContext';
import { toast } from '@/hooks/use-toast';

interface BulkCartActionsProps {
  items: CartItem[];
  onBulkRemove: (itemIds: number[]) => void;
  onBulkMoveToWishlist: (items: CartItem[]) => void;
}

export const BulkCartActions = ({ items, onBulkRemove, onBulkMoveToWishlist }: BulkCartActionsProps) => {
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedItems(items.map(item => item.id));
    } else {
      setSelectedItems([]);
    }
  };

  const handleSelectItem = (itemId: number, checked: boolean) => {
    if (checked) {
      setSelectedItems(prev => [...prev, itemId]);
    } else {
      setSelectedItems(prev => prev.filter(id => id !== itemId));
    }
  };

  const handleBulkRemove = () => {
    if (selectedItems.length === 0) return;
    onBulkRemove(selectedItems);
    setSelectedItems([]);
    toast({
      title: "Items removed",
      description: `${selectedItems.length} items removed from cart.`,
    });
  };

  const handleBulkMoveToWishlist = () => {
    if (selectedItems.length === 0) return;
    const selectedCartItems = items.filter(item => selectedItems.includes(item.id));
    onBulkMoveToWishlist(selectedCartItems);
    setSelectedItems([]);
    toast({
      title: "Moved to wishlist",
      description: `${selectedItems.length} items moved to wishlist.`,
    });
  };

  if (items.length === 0) return null;

  return (
    <Card className="mb-6">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Bulk Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="select-all"
            checked={selectedItems.length === items.length && items.length > 0}
            onCheckedChange={handleSelectAll}
          />
          <label htmlFor="select-all" className="text-sm font-medium">
            Select All ({selectedItems.length} of {items.length} selected)
          </label>
        </div>

        {items.map((item) => (
          <div key={item.id} className="flex items-center space-x-2">
            <Checkbox
              id={`item-${item.id}`}
              checked={selectedItems.includes(item.id)}
              onCheckedChange={(checked) => handleSelectItem(item.id, checked as boolean)}
            />
            <div className="flex items-center space-x-3 flex-1">
              <img
                src={item.image}
                alt={item.name}
                className="w-12 h-12 object-cover rounded"
              />
              <div>
                <p className="font-medium text-sm">{item.name}</p>
                <p className="text-xs text-gray-600">Qty: {item.quantity} × ${item.price}</p>
              </div>
            </div>
          </div>
        ))}

        {selectedItems.length > 0 && (
          <div className="flex gap-2 pt-3 border-t">
            <Button
              variant="destructive"
              size="sm"
              onClick={handleBulkRemove}
              className="flex items-center gap-2"
            >
              <Trash2 className="h-4 w-4" />
              Remove ({selectedItems.length})
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleBulkMoveToWishlist}
              className="flex items-center gap-2"
            >
              <Heart className="h-4 w-4" />
              Move to Wishlist ({selectedItems.length})
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
