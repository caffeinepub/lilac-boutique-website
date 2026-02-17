import { Link } from '@tanstack/react-router';
import { Button } from '../components/ui/button';
import { ScrollReveal } from '../components/ScrollReveal';
import { createGeneralWhatsAppLink } from '../utils/whatsapp';
import { useGetAllProducts } from '../hooks/useQueries';
import { ProductCard } from '../components/products/ProductCard';
import { ArrowRight, Sparkles, Package, Phone } from 'lucide-react';

export default function HomePage() {
    const { data: products = [], isLoading } = useGetAllProducts();
    const newArrivals = products.filter(p => p.isNew).slice(0, 3);
    const featuredProducts = products.slice(0, 6);

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section
                className="relative h-[600px] md:h-[700px] flex items-center justify-center text-center"
                style={{
                    backgroundImage: 'url(/assets/generated/hero-bg.dim_1920x1080.png)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
            >
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
                <div className="relative z-10 container mx-auto px-4">
                    <ScrollReveal>
                        <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
                            Elegant Abaya Collection in Abu Dhabi
                        </h1>
                        <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                            Custom Tailoring & Embroidery – Latest Designs & Offers
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link to="/collection">
                                <Button size="lg" className="btn-luxury text-lg px-10 py-6">
                                    View Collection
                                    <ArrowRight className="ml-2" size={20} />
                                </Button>
                            </Link>
                            <a href={createGeneralWhatsAppLink()} target="_blank" rel="noopener noreferrer">
                                <Button size="lg" variant="outline" className="text-lg px-10 py-6 bg-white/10 backdrop-blur border-white/30 text-white hover:bg-white/20">
                                    <Phone className="mr-2" size={20} />
                                    Order on WhatsApp
                                </Button>
                            </a>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* Features */}
            <section className="py-16 bg-muted/30">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <ScrollReveal>
                            <div className="text-center p-6">
                                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                                    <Sparkles className="text-primary" size={32} />
                                </div>
                                <h3 className="font-serif text-xl font-semibold mb-2">Premium Quality</h3>
                                <p className="text-muted-foreground">
                                    Finest fabrics and exquisite embroidery crafted with attention to detail
                                </p>
                            </div>
                        </ScrollReveal>
                        <ScrollReveal>
                            <div className="text-center p-6">
                                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                                    <Package className="text-primary" size={32} />
                                </div>
                                <h3 className="font-serif text-xl font-semibold mb-2">Custom Tailoring</h3>
                                <p className="text-muted-foreground">
                                    Personalized fitting and custom designs to match your style
                                </p>
                            </div>
                        </ScrollReveal>
                        <ScrollReveal>
                            <div className="text-center p-6">
                                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                                    <Phone className="text-primary" size={32} />
                                </div>
                                <h3 className="font-serif text-xl font-semibold mb-2">Easy Ordering</h3>
                                <p className="text-muted-foreground">
                                    Quick WhatsApp ordering for your convenience
                                </p>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* New Arrivals */}
            {newArrivals.length > 0 && (
                <section className="py-16">
                    <div className="container mx-auto px-4">
                        <ScrollReveal>
                            <div className="text-center mb-12">
                                <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">New Arrivals</h2>
                                <p className="text-muted-foreground max-w-2xl mx-auto">
                                    Discover our latest collection of elegant abayas
                                </p>
                            </div>
                        </ScrollReveal>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {newArrivals.map(product => (
                                <ScrollReveal key={Number(product.id)}>
                                    <ProductCard product={product} />
                                </ScrollReveal>
                            ))}
                        </div>
                        <div className="text-center mt-8">
                            <Link to="/collection">
                                <Button variant="outline" size="lg">
                                    View All Products
                                    <ArrowRight className="ml-2" size={18} />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </section>
            )}

            {/* Featured Collection */}
            {featuredProducts.length > 0 && (
                <section className="py-16 bg-muted/30">
                    <div className="container mx-auto px-4">
                        <ScrollReveal>
                            <div className="text-center mb-12">
                                <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">Featured Collection</h2>
                                <p className="text-muted-foreground max-w-2xl mx-auto">
                                    Handpicked designs from our exclusive collection
                                </p>
                            </div>
                        </ScrollReveal>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {featuredProducts.map(product => (
                                <ScrollReveal key={Number(product.id)}>
                                    <ProductCard product={product} />
                                </ScrollReveal>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* CTA Section */}
            <section className="py-20 luxury-gradient text-white">
                <div className="container mx-auto px-4 text-center">
                    <ScrollReveal>
                        <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">
                            Ready to Find Your Perfect Abaya?
                        </h2>
                        <p className="text-lg mb-8 text-white/90 max-w-2xl mx-auto">
                            Browse our collection or contact us for custom tailoring services
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link to="/collection">
                                <Button size="lg" variant="secondary" className="text-lg px-10 py-6">
                                    Browse Collection
                                </Button>
                            </Link>
                            <Link to="/contact">
                                <Button size="lg" variant="outline" className="text-lg px-10 py-6 border-white text-white hover:bg-white/10">
                                    Contact Us
                                </Button>
                            </Link>
                        </div>
                    </ScrollReveal>
                </div>
            </section>
        </div>
    );
}
