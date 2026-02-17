import { Label } from '../ui/label';
import { Checkbox } from '../ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Slider } from '../ui/slider';
import { Card } from '../ui/card';
import type { ProductFilters as Filters } from '../../utils/productFiltering';
import { getAvailableSizes, getAvailableColors } from '../../utils/productFiltering';
import type { Product } from '../../backend';
import { useState } from 'react';

interface ProductFiltersProps {
    filters: Filters;
    onFiltersChange: (filters: Filters) => void;
    products: Product[];
}

export function ProductFilters({ filters, onFiltersChange, products }: ProductFiltersProps) {
    const availableSizes = getAvailableSizes(products);
    const availableColors = getAvailableColors(products);
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);

    const maxPrice = Math.max(...products.map(p => Number(p.priceInAED)), 5000);

    const handlePriceChange = (values: number[]) => {
        setPriceRange([values[0], values[1]]);
        onFiltersChange({
            ...filters,
            minPrice: values[0],
            maxPrice: values[1]
        });
    };

    return (
        <Card className="p-6 space-y-6 sticky top-24">
            <div>
                <h3 className="font-semibold mb-4">Filters</h3>
            </div>

            {/* Sort */}
            <div className="space-y-2">
                <Label>Sort By</Label>
                <Select
                    value={filters.sortBy}
                    onValueChange={(value: any) => onFiltersChange({ ...filters, sortBy: value })}
                >
                    <SelectTrigger>
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="newest">Newest First</SelectItem>
                        <SelectItem value="price-low">Price: Low to High</SelectItem>
                        <SelectItem value="price-high">Price: High to Low</SelectItem>
                        <SelectItem value="name">Name</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Quick Filters */}
            <div className="space-y-3">
                <div className="flex items-center space-x-2">
                    <Checkbox
                        id="new"
                        checked={filters.showNewOnly}
                        onCheckedChange={(checked) =>
                            onFiltersChange({ ...filters, showNewOnly: checked as boolean })
                        }
                    />
                    <Label htmlFor="new" className="cursor-pointer">New Arrivals</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <Checkbox
                        id="offers"
                        checked={filters.showOffersOnly}
                        onCheckedChange={(checked) =>
                            onFiltersChange({ ...filters, showOffersOnly: checked as boolean })
                        }
                    />
                    <Label htmlFor="offers" className="cursor-pointer">Offers Only</Label>
                </div>
            </div>

            {/* Price Range */}
            <div className="space-y-3">
                <Label>Price Range (AED)</Label>
                <div className="px-2">
                    <Slider
                        min={0}
                        max={maxPrice}
                        step={50}
                        value={priceRange}
                        onValueChange={handlePriceChange}
                    />
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                    <span>AED {priceRange[0]}</span>
                    <span>AED {priceRange[1]}</span>
                </div>
            </div>

            {/* Size */}
            {availableSizes.length > 0 && (
                <div className="space-y-2">
                    <Label>Size</Label>
                    <Select
                        value={filters.selectedSize || 'all'}
                        onValueChange={(value) =>
                            onFiltersChange({ ...filters, selectedSize: value === 'all' ? undefined : value })
                        }
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="All Sizes" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Sizes</SelectItem>
                            {availableSizes.map(size => (
                                <SelectItem key={size} value={size}>{size}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            )}

            {/* Color */}
            {availableColors.length > 0 && (
                <div className="space-y-2">
                    <Label>Color</Label>
                    <Select
                        value={filters.selectedColor || 'all'}
                        onValueChange={(value) =>
                            onFiltersChange({ ...filters, selectedColor: value === 'all' ? undefined : value })
                        }
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="All Colors" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Colors</SelectItem>
                            {availableColors.map(color => (
                                <SelectItem key={color} value={color}>{color}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            )}
        </Card>
    );
}
