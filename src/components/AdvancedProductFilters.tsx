
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { X, Filter } from 'lucide-react';

interface FilterState {
  category: string[];
  priceRange: [number, number];
  rating: number;
  inStock: boolean;
  searchTerm: string;
}

interface AdvancedProductFiltersProps {
  onFiltersChange: (filters: FilterState) => void;
  categories: string[];
}

export const AdvancedProductFilters = ({ onFiltersChange, categories }: AdvancedProductFiltersProps) => {
  const [filters, setFilters] = useState<FilterState>({
    category: [],
    priceRange: [0, 1000],
    rating: 0,
    inStock: false,
    searchTerm: ''
  });

  const [isExpanded, setIsExpanded] = useState(false);

  const updateFilters = (newFilters: Partial<FilterState>) => {
    const updated = { ...filters, ...newFilters };
    setFilters(updated);
    onFiltersChange(updated);
  };

  const clearFilters = () => {
    const cleared = {
      category: [],
      priceRange: [0, 1000] as [number, number],
      rating: 0,
      inStock: false,
      searchTerm: ''
    };
    setFilters(cleared);
    onFiltersChange(cleared);
  };

  const toggleCategory = (category: string) => {
    const newCategories = filters.category.includes(category)
      ? filters.category.filter(c => c !== category)
      : [...filters.category, category];
    updateFilters({ category: newCategories });
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Advanced Filters
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? 'Collapse' : 'Expand'}
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Search */}
        <div>
          <Label htmlFor="search">Search Products</Label>
          <Input
            id="search"
            placeholder="Search by name or description..."
            value={filters.searchTerm}
            onChange={(e) => updateFilters({ searchTerm: e.target.value })}
          />
        </div>

        {isExpanded && (
          <>
            {/* Categories */}
            <div>
              <Label>Categories</Label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {categories.map((category) => (
                  <div key={category} className="flex items-center space-x-2">
                    <Checkbox
                      id={category}
                      checked={filters.category.includes(category)}
                      onCheckedChange={() => toggleCategory(category)}
                    />
                    <Label htmlFor={category} className="text-sm">{category}</Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div>
              <Label>Price Range: ${filters.priceRange[0]} - ${filters.priceRange[1]}</Label>
              <Slider
                value={filters.priceRange}
                onValueChange={(value) => updateFilters({ priceRange: value as [number, number] })}
                max={1000}
                min={0}
                step={10}
                className="mt-2"
              />
            </div>

            {/* Rating */}
            <div>
              <Label>Minimum Rating: {filters.rating} stars</Label>
              <Slider
                value={[filters.rating]}
                onValueChange={(value) => updateFilters({ rating: value[0] })}
                max={5}
                min={0}
                step={0.5}
                className="mt-2"
              />
            </div>

            {/* In Stock */}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="inStock"
                checked={filters.inStock}
                onCheckedChange={(checked) => updateFilters({ inStock: checked as boolean })}
              />
              <Label htmlFor="inStock">In Stock Only</Label>
            </div>
          </>
        )}

        {/* Active Filters */}
        {(filters.category.length > 0 || filters.rating > 0 || filters.inStock) && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <Label>Active Filters</Label>
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                Clear All
              </Button>
            </div>
            <div className="flex flex-wrap gap-1">
              {filters.category.map((category) => (
                <Badge key={category} variant="secondary" className="flex items-center gap-1">
                  {category}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => toggleCategory(category)}
                  />
                </Badge>
              ))}
              {filters.rating > 0 && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  {filters.rating}+ stars
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => updateFilters({ rating: 0 })}
                  />
                </Badge>
              )}
              {filters.inStock && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  In Stock
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => updateFilters({ inStock: false })}
                  />
                </Badge>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
