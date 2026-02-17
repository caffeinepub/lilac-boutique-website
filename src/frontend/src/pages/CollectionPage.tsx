import { useState, useMemo } from 'react';
import { useGetAllProducts } from '../hooks/useQueries';
import { ProductCard } from '../components/products/ProductCard';
import { ProductFilters } from '../components/products/ProductFilters';
import { filterProducts, type ProductFilters as Filters } from '../utils/productFiltering';
import { ScrollReveal } from '../components/ScrollReveal';
import { Loader2 } from 'lucide-react';

export default function CollectionPage() {
    const { data: products = [], isLoading } = useGetAllProducts();
    const [filters, setFilters] = useState<Filters>({
        showNewOnly: false,
        showOffersOnly: false,
        sortBy: 'newest'
    });

    const filteredProducts = useMemo(() => {
        return filterProducts(products, filters);
    }, [products, filters]);

    if (isLoading) {
        return (
            <div className="container mx-auto px-4 py-16 flex justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <ScrollReveal>
                <div className="text-center mb-12">
                    <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">Abaya Collection</h1>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Explore our exquisite collection of elegant abayas with custom tailoring and embroidery
                    </p>
                </div>
            </ScrollReveal>

            <div className="flex flex-col lg:flex-row gap-8">
                <aside className="lg:w-64 flex-shrink-0">
                    <ProductFilters
                        filters={filters}
                        onFiltersChange={setFilters}
                        products={products}
                    />
                </aside>

                <div className="flex-1">
                    {filteredProducts.length === 0 ? (
                        <div className="text-center py-16">
                            <p className="text-muted-foreground text-lg">No products found matching your filters.</p>
                        </div>
                    ) : (
                        <>
                            <div className="mb-6 text-sm text-muted-foreground">
                                Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredProducts.map(product => (
                                    <ScrollReveal key={Number(product.id)}>
                                        <ProductCard product={product} />
                                    </ScrollReveal>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
