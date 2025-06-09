
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
  inStock: boolean;
  rating: number;
}

interface AdvancedFiltersProps {
  onFiltersChange: (filters: FilterState) => void;
  categories: string[];
}

export const AdvancedFilters = ({ onFiltersChange, categories }: AdvancedFiltersProps) => {
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    priceRange: [0, 1000],
    inStock: false,
    rating: 0
  });

  const updateFilters = (newFilters: Partial<FilterState>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    onFiltersChange(updatedFilters);
  };

  const handleCategoryChange = (category: string, checked: boolean) => {
    const newCategories = checked
      ? [...filters.categories, category]
      : filters.categories.filter(c => c !== category);
    updateFilters({ categories: newCategories });
  };

  const clearFilters = () => {
    const resetFilters = {
      categories: [],
      priceRange: [0, 1000] as [number, number],
      inStock: false,
      rating: 0
    };
    setFilters(resetFilters);
    onFiltersChange(resetFilters);
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Filter className="h-5 w-5" />
          Filters
        </CardTitle>
        <Button variant="ghost" size="sm" onClick={clearFilters}>
          Clear All
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Categories */}
        <div>
          <h4 className="font-medium mb-3">Categories</h4>
          <div className="space-y-2">
            {categories.map((category) => (
              <div key={category} className="flex items-center space-x-2">
                <Checkbox
                  id={category}
                  checked={filters.categories.includes(category)}
                  onCheckedChange={(checked) => 
                    handleCategoryChange(category, checked as boolean)
                  }
                />
                <label htmlFor={category} className="text-sm">{category}</label>
              </div>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div>
          <h4 className="font-medium mb-3">Price Range</h4>
          <div className="space-y-3">
            <Slider
              value={filters.priceRange}
              onValueChange={(value) => updateFilters({ priceRange: value as [number, number] })}
              max={1000}
              min={0}
              step={10}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-600">
              <span>${filters.priceRange[0]}</span>
              <span>${filters.priceRange[1]}</span>
            </div>
          </div>
        </div>

        {/* Stock Status */}
        <div className="flex items-center space-x-2">
          <Checkbox
            id="inStock"
            checked={filters.inStock}
            onCheckedChange={(checked) => updateFilters({ inStock: checked as boolean })}
          />
          <label htmlFor="inStock" className="text-sm">In Stock Only</label>
        </div>

        {/* Minimum Rating */}
        <div>
          <h4 className="font-medium mb-3">Minimum Rating</h4>
          <div className="space-y-2">
            {[4, 3, 2, 1].map((rating) => (
              <div key={rating} className="flex items-center space-x-2">
                <Checkbox
                  id={`rating-${rating}`}
                  checked={filters.rating === rating}
                  onCheckedChange={(checked) => 
                    updateFilters({ rating: checked ? rating : 0 })
                  }
                />
                <label htmlFor={`rating-${rating}`} className="text-sm">
                  {rating}+ Stars
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Active Filters */}
        {(filters.categories.length > 0 || filters.inStock || filters.rating > 0) && (
          <div>
            <h4 className="font-medium mb-2">Active Filters</h4>
            <div className="flex flex-wrap gap-2">
              {filters.categories.map((category) => (
                <Badge key={category} variant="secondary" className="flex items-center gap-1">
                  {category}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-4 w-4 p-0"
                    onClick={() => handleCategoryChange(category, false)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
              {filters.inStock && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  In Stock
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-4 w-4 p-0"
                    onClick={() => updateFilters({ inStock: false })}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              )}
              {filters.rating > 0 && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  {filters.rating}+ Stars
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-4 w-4 p-0"
                    onClick={() => updateFilters({ rating: 0 })}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
