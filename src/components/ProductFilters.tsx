
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { X, Filter } from 'lucide-react';

interface FilterState {
  categories: string[];
  priceRange: [number, number];
  rating: number;
  inStock: boolean;
}

interface ProductFiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  categories: string[];
  maxPrice: number;
}

export const ProductFilters = ({ 
  filters, 
  onFiltersChange, 
  categories, 
  maxPrice 
}: ProductFiltersProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleCategoryChange = (category: string, checked: boolean) => {
    const newCategories = checked
      ? [...filters.categories, category]
      : filters.categories.filter(c => c !== category);
    
    onFiltersChange({ ...filters, categories: newCategories });
  };

  const clearFilters = () => {
    onFiltersChange({
      categories: [],
      priceRange: [0, maxPrice],
      rating: 0,
      inStock: false
    });
  };

  const hasActiveFilters = 
    filters.categories.length > 0 || 
    filters.priceRange[0] > 0 || 
    filters.priceRange[1] < maxPrice ||
    filters.rating > 0 ||
    filters.inStock;

  return (
    <Card className="mb-6">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters
            {hasActiveFilters && (
              <Badge variant="secondary" className="ml-2">
                {filters.categories.length + (filters.rating > 0 ? 1 : 0) + (filters.inStock ? 1 : 0)}
              </Badge>
            )}
          </CardTitle>
          <div className="flex gap-2">
            {hasActiveFilters && (
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                <X className="h-4 w-4 mr-1" />
                Clear
              </Button>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? 'Hide' : 'Show'} Filters
            </Button>
          </div>
        </div>
      </CardHeader>
      
      {isExpanded && (
        <CardContent className="space-y-6">
          {/* Categories */}
          <div>
            <h4 className="font-medium mb-3">Categories</h4>
            <div className="space-y-2">
              {categories.map((category) => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox
                    id={`category-${category}`}
                    checked={filters.categories.includes(category)}
                    onCheckedChange={(checked) => 
                      handleCategoryChange(category, checked as boolean)
                    }
                  />
                  <label htmlFor={`category-${category}`} className="text-sm">
                    {category}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <h4 className="font-medium mb-3">
              Price Range: ${filters.priceRange[0]} - ${filters.priceRange[1]}
            </h4>
            <Slider
              value={filters.priceRange}
              onValueChange={(value) => 
                onFiltersChange({ ...filters, priceRange: value as [number, number] })
              }
              max={maxPrice}
              step={10}
              className="w-full"
            />
          </div>

          {/* Rating */}
          <div>
            <h4 className="font-medium mb-3">Minimum Rating</h4>
            <Slider
              value={[filters.rating]}
              onValueChange={(value) => 
                onFiltersChange({ ...filters, rating: value[0] })
              }
              max={5}
              step={0.5}
              className="w-full"
            />
            <div className="text-sm text-gray-600 mt-1">
              {filters.rating > 0 ? `${filters.rating}+ stars` : 'Any rating'}
            </div>
          </div>

          {/* Stock Status */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="in-stock"
              checked={filters.inStock}
              onCheckedChange={(checked) => 
                onFiltersChange({ ...filters, inStock: checked as boolean })
              }
            />
            <label htmlFor="in-stock" className="text-sm">
              In stock only
            </label>
          </div>
        </CardContent>
      )}
    </Card>
  );
};
