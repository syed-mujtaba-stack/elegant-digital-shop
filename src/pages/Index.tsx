import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, ShoppingCart, Star, Sparkles, TrendingUp, Award } from 'lucide-react';
import { products } from '@/data/products';
import { useCart } from '@/contexts/CartContext';
import Newsletter from '@/components/Newsletter';
import PromotionalBanner from '@/components/PromotionalBanner';
import StockIndicator from '@/components/StockIndicator';
import { RecentlyViewedProducts } from '@/components/RecentlyViewedProducts';

const Index = () => {
  const { addItem } = useCart();
  const featuredProducts = products.slice(0, 3);

  const handleAddToCart = (product: any) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image
    });
  };

  return (
    <div className="min-h-screen">
      {/* Promotional Banner */}
      <PromotionalBanner />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        
        {/* Hero Background Images */}
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1920&h=1080&fit=crop"
            alt="Modern workspace"
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Floating Product Images */}
        <div className="absolute top-10 right-10 opacity-30 animate-bounce">
          <img
            src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop"
            alt="Headphones"
            className="w-32 h-32 rounded-full shadow-2xl"
          />
        </div>
        
        <div className="absolute bottom-20 left-10 opacity-30 animate-pulse">
          <img
            src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop"
            alt="Smart watch"
            className="w-24 h-24 rounded-full shadow-2xl"
          />
        </div>
        
        <div className="absolute top-1/2 right-1/4 opacity-20 animate-float">
          <img
            src="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200&h=200&fit=crop"
            alt="Leather bag"
            className="w-28 h-28 rounded-full shadow-2xl"
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center space-y-8">
            <div className="flex items-center justify-center space-x-2 mb-6">
              <Sparkles className="h-8 w-8 text-yellow-400 animate-pulse" />
              <Badge className="bg-white/20 text-white border-white/30 text-lg px-4 py-2">
                Premium Collection 2024
              </Badge>
              <Sparkles className="h-8 w-8 text-yellow-400 animate-pulse" />
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Discover Premium
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                Shopping Experience
              </span>
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Explore our curated collection of premium products designed to elevate your lifestyle
              with unmatched quality and sophistication.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/products">
                <Button size="lg" className="bg-white text-blue-900 hover:bg-blue-50 font-semibold transform hover:scale-105 transition-all">
                  Shop Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/about">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-900 transform hover:scale-105 transition-all">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Hero Section Bottom Images */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-50 to-transparent">
          <div className="flex justify-center items-end space-x-8 h-full pb-4 opacity-60">
            <img
              src="https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=100&h=100&fit=crop"
              alt="Sunglasses"
              className="w-16 h-16 rounded-lg shadow-lg"
            />
            <img
              src="https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=100&h=100&fit=crop"
              alt="Keyboard"
              className="w-20 h-20 rounded-lg shadow-lg"
            />
            <img
              src="https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=100&h=100&fit=crop"
              alt="Camera lens"
              className="w-16 h-16 rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <TrendingUp className="h-8 w-8 text-blue-600 mx-auto" />
              <div className="text-3xl font-bold text-gray-900">50K+</div>
              <div className="text-gray-600">Happy Customers</div>
            </div>
            <div className="space-y-2">
              <Award className="h-8 w-8 text-purple-600 mx-auto" />
              <div className="text-3xl font-bold text-gray-900">1000+</div>
              <div className="text-gray-600">Premium Products</div>
            </div>
            <div className="space-y-2">
              <ShoppingCart className="h-8 w-8 text-green-600 mx-auto" />
              <div className="text-3xl font-bold text-gray-900">24/7</div>
              <div className="text-gray-600">Fast Delivery</div>
            </div>
            <div className="space-y-2">
              <Star className="h-8 w-8 text-yellow-500 mx-auto" />
              <div className="text-3xl font-bold text-gray-900">4.9/5</div>
              <div className="text-gray-600">Customer Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Star className="h-6 w-6 text-yellow-500" />
              <h2 className="text-3xl font-bold text-gray-900">Featured Products</h2>
              <Star className="h-6 w-6 text-yellow-500" />
            </div>
            <p className="text-lg text-gray-600">Discover our hand-picked selection of premium items</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <Card key={product.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2">
                <div className="relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                      <Sparkles className="h-3 w-3 mr-1" />
                      Featured
                    </Badge>
                  </div>
                  <div className="absolute top-4 right-4">
                    <StockIndicator inStock={product.inStock} stockLevel={Math.floor(Math.random() * 10) + 1} showLevel />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm text-gray-600 ml-1">{product.rating}</span>
                    </div>
                    <span className="text-sm text-gray-400">({product.reviews} reviews)</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-blue-600">${product.price}</span>
                    <div className="flex gap-2">
                      <Link to={`/products/${product.id}`}>
                        <Button variant="outline" size="sm" className="hover:scale-105 transition-transform">View</Button>
                      </Link>
                      <Button 
                        size="sm" 
                        onClick={() => handleAddToCart(product)}
                        className="bg-blue-600 hover:bg-blue-700 hover:scale-105 transition-transform"
                      >
                        <ShoppingCart className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/products">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 transform hover:scale-105 transition-all">
                View All Products
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Recently Viewed Products */}
      <RecentlyViewedProducts />

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose EliteShop?</h2>
            <p className="text-lg text-gray-600">Experience the difference with our premium service</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-4 group">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto group-hover:bg-blue-200 transition-colors">
                <ShoppingCart className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Premium Quality</h3>
              <p className="text-gray-600">
                Every product is carefully selected and tested to ensure the highest quality standards.
              </p>
            </div>
            
            <div className="text-center space-y-4 group">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto group-hover:bg-purple-200 transition-colors">
                <Star className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Customer Satisfaction</h3>
              <p className="text-gray-600">
                Our commitment to excellence ensures a satisfaction guarantee on every purchase.
              </p>
            </div>
            
            <div className="text-center space-y-4 group">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto group-hover:bg-green-200 transition-colors">
                <ArrowRight className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Fast Delivery</h3>
              <p className="text-gray-600">
                Quick and secure delivery to your doorstep with real-time tracking.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <Newsletter />
    </div>
  );
};

export default Index;
