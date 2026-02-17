import { useGetAllProducts, useGetOffers } from '../hooks/useQueries';
import { ProductCard } from '../components/products/ProductCard';
import { ScrollReveal } from '../components/ScrollReveal';
import { Loader2 } from 'lucide-react';
import { OfferBannerSlider } from '../components/offers/OfferBannerSlider';

export default function OffersPage() {
    const { data: products = [], isLoading: productsLoading } = useGetAllProducts();
    const { data: offers = [], isLoading: offersLoading } = useGetOffers();

    const discountedProducts = products.filter(
        p => p.discountPrice !== undefined && p.oldPrice !== undefined
    );

    if (productsLoading || offersLoading) {
        return (
            <div className="container mx-auto px-4 py-16 flex justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="min-h-screen">
            {/* Banner Slider */}
            <OfferBannerSlider offers={offers} />

            {/* Discounted Products */}
            <div className="container mx-auto px-4 py-12">
                <ScrollReveal>
                    <div className="text-center mb-12">
                        <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">Current Offers</h1>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Exclusive discounts on our premium abaya collection
                        </p>
                    </div>
                </ScrollReveal>

                {discountedProducts.length === 0 ? (
                    <div className="text-center py-16">
                        <p className="text-muted-foreground text-lg">No offers available at the moment.</p>
                        <p className="text-sm text-muted-foreground mt-2">Check back soon for exciting deals!</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {discountedProducts.map(product => (
                            <ScrollReveal key={Number(product.id)}>
                                <ProductCard product={product} />
                            </ScrollReveal>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
