import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ShoppingCart, Star, Search, Heart, Eye } from 'lucide-react';
import { products, categories, Product } from '@/data/products';
import { ProductQuickViewModal } from '@/components/ProductQuickViewModal';
import { ProductCardSkeleton } from '@/components/LoadingSkeleton';
import StockIndicator from '@/components/StockIndicator';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { toast } from '@/hooks/use-toast';

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [isLoading, setIsLoading] = useState(false);
  const { addItem } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const [selectedProductForQuickView, setSelectedProductForQuickView] = useState<Product | null>(null);
  const [isQuickViewModalOpen, setIsQuickViewModalOpen] = useState(false);
  const [selectedProductIds, setSelectedProductIds] = useState<Set<number>>(new Set());

  const filteredProducts = products
    .filter(product => 
      (selectedCategory === 'All' || product.category === selectedCategory) &&
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      product.price >= priceRange.min && product.price <= priceRange.max
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        default:
          return a.name.localeCompare(b.name);
      }
    });

  const handleAddToCart = (product: Product) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image
    });
    toast({
      title: "Added to cart!",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const handleWishlistToggle = (product: any) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      toast({
        title: "Removed from wishlist",
        description: `${product.name} has been removed from your wishlist.`,
      });
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image
      });
      toast({
        title: "Added to wishlist!",
        description: `${product.name} has been added to your wishlist.`,
      });
    }
  };

  const handleProductSelectToggle = (productId: number, checked: boolean) => {
    setSelectedProductIds(prevSelectedIds => {
      const newSelectedIds = new Set(prevSelectedIds);
      if (checked) {
        newSelectedIds.add(productId);
      } else {
        newSelectedIds.delete(productId);
      }
      return newSelectedIds;
    });
  };

  const handleBulkAddToCart = () => {
    if (selectedProductIds.size === 0) {
      toast({
        title: "No products selected",
        description: "Please select products to add to cart.",
        variant: "destructive",
      });
      return;
    }

    let itemsAddedCount = 0;
    selectedProductIds.forEach(productId => {
      const productToAdd = products.find(p => p.id === productId);
      if (productToAdd && productToAdd.inStock) {
        addItem({
          id: productToAdd.id,
          name: productToAdd.name,
          price: productToAdd.price,
          image: productToAdd.image
        });
        itemsAddedCount++;
      }
    });

    if (itemsAddedCount > 0) {
      toast({
        title: "Products added to cart!",
        description: `${itemsAddedCount} product${itemsAddedCount > 1 ? 's' : ''} added to your cart.`,
      });
    } else if (selectedProductIds.size > 0 && itemsAddedCount === 0) {
        toast({
            title: "Selected products out of stock",
            description: "None of the selected products could be added as they are out of stock.",
            variant: "destructive",
        });
    }
    setSelectedProductIds(new Set()); // Clear selection
  };

  const handleOpenQuickView = (product: Product) => {
    setSelectedProductForQuickView(product);
    setIsQuickViewModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Our Products</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">Discover our premium collection of carefully curated products</p>
        </div>

        {/* Filters */}
        <div className="mb-8 flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
              />
            </div>

            {/* Category Filter */}
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full sm:w-48 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600">
                {categories.map(category => (
                  <SelectItem key={category} value={category} className="text-black dark:text-white">{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Price Range */}
            <div className="flex gap-2 items-center">
              <Input
                type="number"
                placeholder="Min"
                value={priceRange.min}
                onChange={(e) => setPriceRange(prev => ({ ...prev, min: Number(e.target.value) }))}
                className="w-20 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
              />
              <span className="text-gray-500">-</span>
              <Input
                type="number"
                placeholder="Max"
                value={priceRange.max}
                onChange={(e) => setPriceRange(prev => ({ ...prev, max: Number(e.target.value) }))}
                className="w-20 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
              />
            </div>
          </div>

          {/* Sort */}
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full sm:w-48 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600">
              <SelectItem value="name" className="text-black dark:text-white">Name A-Z</SelectItem>
              <SelectItem value="price-low" className="text-black dark:text-white">Price: Low to High</SelectItem>
              <SelectItem value="price-high" className="text-black dark:text-white">Price: High to Low</SelectItem>
              <SelectItem value="rating" className="text-black dark:text-white">Highest Rated</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Bulk Actions & Results Count */}
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-gray-600 dark:text-gray-300 mb-2 sm:mb-0">
            Showing {filteredProducts.length} of {products.length} products
          </p>
          {selectedProductIds.size > 0 && (
            <Button 
              onClick={() => {/* handleBulkAddToCart */}}
              disabled={selectedProductIds.size === 0}
              className="bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200"
            >
              Add Selected to Cart ({selectedProductIds.size})
            </Button>
          )}
        </div>

        {/* Products Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                <div className="relative overflow-hidden">
                  <div className="absolute top-3 left-3 z-10 bg-white/80 dark:bg-gray-800/80 p-1 rounded-sm">
                    <Checkbox 
                      id={`select-${product.id}`}
                      checked={selectedProductIds.has(product.id)}
                      onCheckedChange={(checked) => handleProductSelectToggle(product.id, !!checked)}
                      aria-label={`Select ${product.name}`}
                    />
                  </div>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300 filter grayscale"
                  />
                  <div className="absolute top-3 right-3 z-10">
                    <StockIndicator inStock={product.inStock} stockLevel={Math.floor(Math.random() * 10) + 1} showLevel />
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute bottom-3 right-3 p-2 bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-800"
                    onClick={() => handleWishlistToggle(product)}
                  >
                    <Heart 
                      className={`h-4 w-4 ${
                        isInWishlist(product.id) 
                          ? 'text-black dark:text-white fill-black dark:fill-white' 
                          : 'text-gray-600 dark:text-gray-400'
                      }`} 
                    />
                  </Button>
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center gap-1 mb-2">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-black dark:fill-white text-black dark:text-white" />
                      <span className="text-sm text-gray-600 dark:text-gray-300 ml-1">{product.rating}</span>
                    </div>
                    <span className="text-sm text-gray-400">({product.reviews})</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">{product.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-black dark:text-white">${product.price}</span>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleOpenQuickView(product)}
                        className="p-2 h-auto border-gray-300 dark:border-gray-600"
                        title="Quick view"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Link to={`/products/${product.id}`}>
                        <Button variant="outline" size="sm" className="border-gray-300 dark:border-gray-600">View</Button>
                      </Link>
                      <Button 
                        size="sm" 
                        onClick={() => handleAddToCart(product)}
                        disabled={!product.inStock}
                        className="bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 disabled:opacity-50 p-2 h-auto"
                        title="Add to cart"
                      >
                        <ShoppingCart className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* No Results */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No products found</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">Try adjusting your search or filter criteria</p>
            <Button onClick={() => { 
              setSearchTerm(''); 
              setSelectedCategory('All'); 
              setPriceRange({ min: 0, max: 1000 });
            }} className="bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200">
              Clear Filters
            </Button>
          </div>
        )}
      </div>
      {selectedProductForQuickView && (
        <ProductQuickViewModal
          product={selectedProductForQuickView}
          isOpen={isQuickViewModalOpen}
          onOpenChange={setIsQuickViewModalOpen}
          onAddToCart={handleAddToCart}
        />
      )}
    </div>
  );
};

export default Products;
