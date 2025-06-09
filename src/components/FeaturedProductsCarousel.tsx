
import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight, Star, ShoppingCart, Heart } from 'lucide-react';
import { products } from '@/data/products';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

export const FeaturedProductsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const { addItem } = useCart();
  const { addToWishlist, isInWishlist } = useWishlist();
  const navigate = useNavigate();

  // Featured products (high rating products)
  const featuredProducts = products.filter(product => product.rating >= 4.5).slice(0, 8);
  const itemsPerView = 4;
  const maxIndex = Math.max(0, featuredProducts.length - itemsPerView);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, maxIndex]);

  const goToPrevious = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const goToNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

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

  const handleAddToWishlist = (product: any) => {
    if (!isInWishlist(product.id)) {
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

  if (featuredProducts.length === 0) return null;

  return (
    <section className="py-12 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Featured Products
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Discover our handpicked selection of premium products with exceptional ratings and customer satisfaction.
          </p>
        </div>

        <div className="relative">
          {/* Navigation Buttons */}
          <Button
            variant="outline"
            size="sm"
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm"
            onClick={goToPrevious}
            disabled={featuredProducts.length <= itemsPerView}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            size="sm"
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm"
            onClick={goToNext}
            disabled={featuredProducts.length <= itemsPerView}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>

          {/* Carousel Container */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
                width: `${(featuredProducts.length / itemsPerView) * 100}%`
              }}
            >
              {featuredProducts.map((product) => (
                <div
                  key={product.id}
                  className="w-full px-2"
                  style={{ width: `${100 / featuredProducts.length}%` }}
                >
                  <Card className="group hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-white dark:bg-gray-800">
                    <div className="relative aspect-square overflow-hidden rounded-t-lg">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3">
                        <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
                          ⭐ Featured
                        </Badge>
                      </div>
                      <div className="absolute top-3 right-3">
                        <Button
                          variant="outline"
                          size="sm"
                          className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm"
                          onClick={() => handleAddToWishlist(product)}
                        >
                          <Heart 
                            className={`h-4 w-4 ${
                              isInWishlist(product.id) 
                                ? 'text-red-500 fill-red-500' 
                                : 'text-gray-600'
                            }`} 
                          />
                        </Button>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <div className="mb-2">
                        <Badge variant="secondary" className="text-xs">
                          {product.category}
                        </Badge>
                      </div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {product.name}
                      </h3>
                      
                      <div className="flex items-center gap-1 mb-3">
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
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          {product.rating}
                        </span>
                        <span className="text-xs text-gray-500">
                          ({product.reviews})
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-xl font-bold text-blue-600">
                          ${product.price}
                        </span>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => navigate(`/products/${product.id}`)}
                          >
                            View
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => handleAddToCart(product)}
                            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                          >
                            <ShoppingCart className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center space-x-2 mt-6">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex
                    ? 'bg-blue-600'
                    : 'bg-gray-300 dark:bg-gray-600'
                }`}
                onClick={() => {
                  setIsAutoPlaying(false);
                  setCurrentIndex(index);
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
