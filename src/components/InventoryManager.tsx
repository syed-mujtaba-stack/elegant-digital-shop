
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Package, AlertTriangle, TrendingDown, TrendingUp } from 'lucide-react';
import { products } from '@/data/products';

interface InventoryItem {
  id: number;
  name: string;
  currentStock: number;
  lowStockThreshold: number;
  reorderPoint: number;
  lastRestocked: Date;
  dailySales: number;
  estimatedDaysLeft: number;
}

// Mock inventory data based on products
const inventoryData: InventoryItem[] = products.slice(0, 8).map((product, index) => ({
  id: product.id,
  name: product.name,
  currentStock: Math.floor(Math.random() * 100) + 10,
  lowStockThreshold: 20,
  reorderPoint: 30,
  lastRestocked: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000),
  dailySales: Math.floor(Math.random() * 10) + 1,
  estimatedDaysLeft: Math.floor(Math.random() * 30) + 5
}));

export const InventoryManager = () => {
  const [inventory, setInventory] = useState<InventoryItem[]>(inventoryData);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'all' | 'low' | 'out'>('all');

  const filteredInventory = inventory.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = 
      filter === 'all' ? true :
      filter === 'low' ? item.currentStock <= item.lowStockThreshold :
      filter === 'out' ? item.currentStock === 0 : true;
    
    return matchesSearch && matchesFilter;
  });

  const updateStock = (itemId: number, newStock: number) => {
    setInventory(prev => prev.map(item => 
      item.id === itemId 
        ? { 
            ...item, 
            currentStock: Math.max(0, newStock),
            estimatedDaysLeft: Math.floor(newStock / item.dailySales)
          }
        : item
    ));
  };

  const getStockStatus = (item: InventoryItem) => {
    if (item.currentStock === 0) return { status: 'out', color: 'bg-red-600', text: 'Out of Stock' };
    if (item.currentStock <= item.lowStockThreshold) return { status: 'low', color: 'bg-yellow-600', text: 'Low Stock' };
    return { status: 'good', color: 'bg-green-600', text: 'In Stock' };
  };

  const lowStockItems = inventory.filter(item => 
    item.currentStock > 0 && item.currentStock <= item.lowStockThreshold
  );
  const outOfStockItems = inventory.filter(item => item.currentStock === 0);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Package className="h-8 w-8 mx-auto mb-2 text-blue-600" />
            <div className="text-2xl font-bold">{inventory.length}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Total Products</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <TrendingUp className="h-8 w-8 mx-auto mb-2 text-green-600" />
            <div className="text-2xl font-bold">{inventory.filter(i => getStockStatus(i).status === 'good').length}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">In Stock</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <AlertTriangle className="h-8 w-8 mx-auto mb-2 text-yellow-600" />
            <div className="text-2xl font-bold">{lowStockItems.length}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Low Stock</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <TrendingDown className="h-8 w-8 mx-auto mb-2 text-red-600" />
            <div className="text-2xl font-bold">{outOfStockItems.length}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Out of Stock</div>
          </CardContent>
        </Card>
      </div>

      {/* Alerts */}
      {(lowStockItems.length > 0 || outOfStockItems.length > 0) && (
        <div className="space-y-3">
          {outOfStockItems.length > 0 && (
            <Alert className="border-red-200 bg-red-50 dark:bg-red-900/20">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <AlertDescription>
                <strong>{outOfStockItems.length} items</strong> are out of stock and need immediate restocking.
              </AlertDescription>
            </Alert>
          )}
          {lowStockItems.length > 0 && (
            <Alert className="border-yellow-200 bg-yellow-50 dark:bg-yellow-900/20">
              <AlertTriangle className="h-4 w-4 text-yellow-600" />
              <AlertDescription>
                <strong>{lowStockItems.length} items</strong> are running low on stock.
              </AlertDescription>
            </Alert>
          )}
        </div>
      )}

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle>Inventory Management</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <Label htmlFor="search">Search Products</Label>
              <Input
                id="search"
                placeholder="Search by product name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div>
              <Label>Filter</Label>
              <div className="flex gap-2 mt-1">
                <Button
                  variant={filter === 'all' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilter('all')}
                >
                  All
                </Button>
                <Button
                  variant={filter === 'low' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilter('low')}
                >
                  Low Stock
                </Button>
                <Button
                  variant={filter === 'out' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilter('out')}
                >
                  Out of Stock
                </Button>
              </div>
            </div>
          </div>

          {/* Inventory Table */}
          <div className="space-y-3">
            {filteredInventory.map((item) => {
              const stockStatus = getStockStatus(item);
              return (
                <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <h3 className="font-medium">{item.name}</h3>
                    <div className="flex items-center gap-4 mt-1 text-sm text-gray-600 dark:text-gray-400">
                      <span>Current: {item.currentStock} units</span>
                      <span>Daily Sales: {item.dailySales}</span>
                      <span>Days Left: {item.estimatedDaysLeft}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className={stockStatus.color}>
                      {stockStatus.text}
                    </Badge>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateStock(item.id, item.currentStock - 1)}
                        disabled={item.currentStock === 0}
                      >
                        -1
                      </Button>
                      <span className="w-12 text-center">{item.currentStock}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateStock(item.id, item.currentStock + 1)}
                      >
                        +1
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => updateStock(item.id, item.reorderPoint + 50)}
                      >
                        Restock
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
