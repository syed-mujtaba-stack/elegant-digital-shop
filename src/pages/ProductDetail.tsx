import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ShoppingCart, Star, ArrowLeft, Check, Heart, GitCompare, ZoomIn } from 'lucide-react';
import { products } from '@/data/products';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { useComparison } from '@/contexts/ComparisonContext';
import { useRecentlyViewed } from '@/contexts/RecentlyViewedContext';
import { toast } from '@/hooks/use-toast';
import ProductReviews from '@/components/ProductReviews';
import { SocialSharing } from '@/components/SocialSharing';
import { ProductRecommendations } from '@/components/ProductRecommendations';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { addToComparison, isInComparison } = useComparison();
  const { addToRecentlyViewed } = useRecentlyViewed();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isZoomed, setIsZoomed] = useState(false);

  const product = products.find(p => p.id === parseInt(id!));

  useEffect(() => {
    if (product) {
      addToRecentlyViewed(product);
    }
  }, [product, addToRecentlyViewed]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Product not found</h1>
          <Button onClick={() => navigate('/products')} className="bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200">Back to Products</Button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity
    });
    toast({
      title: "Added to cart!",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const handleWishlistToggle = () => {
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

  const handleComparisonToggle = () => {
    if (isInComparison(product.id)) {
      toast({
        title: "Already in comparison",
        description: "This product is already in your comparison list.",
      });
    } else {
      addToComparison(product);
      toast({
        title: "Added to comparison!",
        description: `${product.name} has been added to comparison.`,
      });
    }
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/cart');
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate('/products')}
          className="mb-6 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Products
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover cursor-zoom-in filter grayscale"
                onClick={() => setIsZoomed(!isZoomed)}
              />
              <Button
                variant="outline"
                size="sm"
                className="absolute top-4 right-4 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                onClick={() => setIsZoomed(!isZoomed)}
              >
                <ZoomIn className="h-4 w-4" />
              </Button>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square rounded-lg overflow-hidden ${
                    selectedImage === index ? 'ring-2 ring-black dark:ring-white' : ''
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover filter grayscale"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary" className="bg-gray-100 dark:bg-gray-800 text-black dark:text-white">{product.category}</Badge>
                {product.inStock ? (
                  <Badge className="bg-black dark:bg-white text-white dark:text-black">In Stock</Badge>
                ) : (
                  <Badge variant="destructive" className="bg-gray-600 text-white">Out of Stock</Badge>
                )}
              </div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{product.name}</h1>
              
              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating)
                          ? 'text-black dark:text-white fill-black dark:fill-white'
                          : 'text-gray-300 dark:text-gray-600'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-lg font-medium text-black dark:text-white">{product.rating}</span>
                <span className="text-gray-500 dark:text-gray-400">({product.reviews} reviews)</span>
              </div>

              <p className="text-3xl font-bold text-black dark:text-white mb-6">${product.price}</p>
            </div>

            <Separator className="bg-gray-200 dark:bg-gray-700" />

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold mb-3 text-black dark:text-white">Description</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{product.description}</p>
            </div>

            {/* Features */}
            <div>
              <h3 className="text-lg font-semibold mb-3 text-black dark:text-white">Features</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-black dark:text-white" />
                    <span className="text-gray-600 dark:text-gray-400">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Separator className="bg-gray-200 dark:bg-gray-700" />

            {/* Quantity and Actions */}
            <div className="space-y-4">
              <div>
                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Quantity
                </label>
                <select
                  id="quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                  className="border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 w-24 dark:bg-gray-800 dark:text-white bg-white"
                >
                  {[...Array(10)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className="flex-1 bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200"
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
                <Button
                  onClick={handleWishlistToggle}
                  variant="outline"
                  className="px-4 border-gray-300 dark:border-gray-600"
                >
                  <Heart 
                    className={`h-4 w-4 ${
                      isInWishlist(product.id) 
                        ? 'text-black dark:text-white fill-black dark:fill-white' 
                        : 'text-gray-600 dark:text-gray-400'
                    }`} 
                  />
                </Button>
                <Button
                  onClick={handleComparisonToggle}
                  variant="outline"
                  className="px-4 border-gray-300 dark:border-gray-600"
                >
                  <GitCompare 
                    className={`h-4 w-4 ${
                      isInComparison(product.id) 
                        ? 'text-black dark:text-white' 
                        : 'text-gray-600 dark:text-gray-400'
                    }`} 
                  />
                </Button>
                <Button
                  onClick={handleBuyNow}
                  disabled={!product.inStock}
                  variant="outline"
                  className="flex-1 border-gray-300 dark:border-gray-600"
                >
                  Buy Now
                </Button>
              </div>
            </div>

            {/* Social Sharing */}
            <div className="pt-4 border-t">
              <SocialSharing 
                url={window.location.href}
                title={product.name}
                description={product.description}
                image={product.image}
              />
            </div>
          </div>
        </div>

        {/* Product Reviews */}
        <div className="mb-16">
          <ProductReviews productId={product.id} />
        </div>

        {/* Product Recommendations */}
        <ProductRecommendations currentProductId={product.id} limit={4} />
      </div>
    </div>
  );
};

export default ProductDetail;
