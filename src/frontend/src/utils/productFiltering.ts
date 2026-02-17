import type { Product } from '../backend';

export interface ProductFilters {
    showNewOnly: boolean;
    showOffersOnly: boolean;
    minPrice?: number;
    maxPrice?: number;
    selectedSize?: string;
    selectedColor?: string;
    sortBy: 'newest' | 'price-low' | 'price-high' | 'name';
}

export function filterProducts(products: Product[], filters: ProductFilters): Product[] {
    let filtered = [...products];

    if (filters.showNewOnly) {
        filtered = filtered.filter(p => p.isNew);
    }

    if (filters.showOffersOnly) {
        filtered = filtered.filter(p => p.discountPrice !== undefined && p.oldPrice !== undefined);
    }

    if (filters.minPrice !== undefined) {
        filtered = filtered.filter(p => Number(p.priceInAED) >= filters.minPrice!);
    }

    if (filters.maxPrice !== undefined) {
        filtered = filtered.filter(p => Number(p.priceInAED) <= filters.maxPrice!);
    }

    if (filters.selectedSize) {
        filtered = filtered.filter(p => p.sizes.includes(filters.selectedSize!));
    }

    if (filters.selectedColor) {
        filtered = filtered.filter(p => p.colors.includes(filters.selectedColor!));
    }

    // Sort
    filtered.sort((a, b) => {
        switch (filters.sortBy) {
            case 'newest':
                return Number(b.uploadDate - a.uploadDate);
            case 'price-low':
                return Number(a.priceInAED - b.priceInAED);
            case 'price-high':
                return Number(b.priceInAED - a.priceInAED);
            case 'name':
                return a.name.localeCompare(b.name);
            default:
                return 0;
        }
    });

    return filtered;
}

export function getAvailableSizes(products: Product[]): string[] {
    const sizes = new Set<string>();
    products.forEach(p => p.sizes.forEach(s => sizes.add(s)));
    return Array.from(sizes).sort();
}

export function getAvailableColors(products: Product[]): string[] {
    const colors = new Set<string>();
    products.forEach(p => p.colors.forEach(c => colors.add(c)));
    return Array.from(colors).sort();
}
