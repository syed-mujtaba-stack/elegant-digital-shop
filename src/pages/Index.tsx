
import Hero from '@/components/Hero';
import { FeaturedProductsCarousel } from '@/components/FeaturedProductsCarousel';
import { ProductRecommendations } from '@/components/ProductRecommendations';
import { RecentlyViewedProducts } from '@/components/RecentlyViewedProducts';
import PromotionalBanner from '@/components/PromotionalBanner';

const Index = () => {
  return (
    <div className="bg-white dark:bg-black min-h-screen">
      <PromotionalBanner />
      <Hero />
      <FeaturedProductsCarousel />
      <ProductRecommendations />
      <RecentlyViewedProducts />
    </div>
  );
};

export default Index;
