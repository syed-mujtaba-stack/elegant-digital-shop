
import Hero from '@/components/Hero';
import { FeaturedProductsCarousel } from '@/components/FeaturedProductsCarousel';
import { ProductRecommendations } from '@/components/ProductRecommendations';
import { RecentlyViewedProducts } from '@/components/RecentlyViewedProducts';
import PromotionalBanner from '@/components/PromotionalBanner';
import { EnhancedSearch } from '@/components/EnhancedSearch';
import { ProductQuickView } from '@/components/ProductQuickView';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Users, Package, Star } from 'lucide-react';

const Index = () => {
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  const handleSearchResults = (query: string, results: any[]) => {
    console.log('Search results for:', query, results);
    // Here you could navigate to a search results page or update state
  };

  const stats = [
    { label: 'Happy Customers', value: '10,000+', icon: Users, color: 'text-blue-600' },
    { label: 'Products Sold', value: '50,000+', icon: Package, color: 'text-green-600' },
    { label: 'Average Rating', value: '4.9/5', icon: Star, color: 'text-yellow-600' },
    { label: 'Growth Rate', value: '+23%', icon: TrendingUp, color: 'text-purple-600' },
  ];

  return (
    <div className="bg-background min-h-screen">
      <PromotionalBanner />
      
      {/* Enhanced Search Section */}
      <section className="py-8 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-6">Find Your Perfect Product</h2>
            <EnhancedSearch 
              onSearchResults={handleSearchResults}
              placeholder="Search for electronics, gadgets, and more..."
            />
          </div>
        </div>
      </section>

      <Hero />

      {/* Stats Section */}
      <section className="py-12 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index} className="text-center">
                  <CardContent className="pt-6">
                    <div className="flex justify-center mb-2">
                      <Icon className={`h-8 w-8 ${stat.color}`} />
                    </div>
                    <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <FeaturedProductsCarousel />
      <ProductRecommendations />
      <RecentlyViewedProducts />

      {/* Quick View Modal */}
      <ProductQuickView 
        product={quickViewProduct}
        isOpen={isQuickViewOpen}
        onClose={() => {
          setIsQuickViewOpen(false);
          setQuickViewProduct(null);
        }}
      />
    </div>
  );
};

export default Index;
