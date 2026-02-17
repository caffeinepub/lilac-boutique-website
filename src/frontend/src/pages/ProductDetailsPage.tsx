import { useParams, Link } from '@tanstack/react-router';
import { useGetProduct } from '../hooks/useQueries';
import { formatPrice, formatDate } from '../utils/format';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Textarea } from '../components/ui/textarea';
import { createProductOrderMessage, createWhatsAppLink } from '../utils/whatsapp';
import { SiWhatsapp } from 'react-icons/si';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { EnquiryDialog } from '../components/enquiry/EnquiryDialog';

export default function ProductDetailsPage() {
    const { productId } = useParams({ from: '/product/$productId' });
    const { data: product, isLoading } = useGetProduct(productId);
    const [selectedSize, setSelectedSize] = useState<string>('');
    const [tailoringRequest, setTailoringRequest] = useState('');
    const [enquiryOpen, setEnquiryOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    if (isLoading) {
        return (
            <div className="container mx-auto px-4 py-16 flex justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    if (!product) {
        return (
            <div className="container mx-auto px-4 py-16 text-center">
                <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
                <Link to="/collection">
                    <Button>Back to Collection</Button>
                </Link>
            </div>
        );
    }

    const hasDiscount = product.discountPrice !== undefined && product.oldPrice !== undefined;
    const displayPrice: bigint = hasDiscount ? product.discountPrice! : product.priceInAED;
    const images = product.images.length > 0 
        ? product.images.map(img => img.getDirectURL())
        : ['/assets/generated/product-placeholder.dim_800x800.png'];

    const handleWhatsAppOrder = () => {
        const message = createProductOrderMessage(product.name, selectedSize, tailoringRequest);
        window.open(createWhatsAppLink(message), '_blank');
    };

    return (
        <>
            <div className="container mx-auto px-4 py-8">
                <Link to="/collection" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8">
                    <ArrowLeft size={16} className="mr-2" />
                    Back to Collection
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Images */}
                    <div className="space-y-4">
                        <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-muted">
                            <img
                                src={images[currentImageIndex]}
                                alt={product.name}
                                className="w-full h-full object-cover"
                            />
                            {product.isNew && (
                                <Badge className="absolute top-4 left-4 bg-secondary text-secondary-foreground">
                                    NEW
                                </Badge>
                            )}
                            {hasDiscount && (
                                <Badge className="absolute top-4 right-4 bg-destructive text-destructive-foreground">
                                    SALE
                                </Badge>
                            )}
                        </div>
                        {images.length > 1 && (
                            <div className="grid grid-cols-4 gap-2">
                                {images.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setCurrentImageIndex(idx)}
                                        className={`aspect-square rounded overflow-hidden border-2 transition-colors ${
                                            idx === currentImageIndex ? 'border-primary' : 'border-transparent'
                                        }`}
                                    >
                                        <img src={img} alt={`${product.name} ${idx + 1}`} className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Details */}
                    <div className="space-y-6">
                        <div>
                            <h1 className="font-serif text-3xl md:text-4xl font-bold mb-4">{product.name}</h1>
                            <div className="flex items-baseline gap-3 mb-4">
                                <span className="text-3xl font-bold text-primary">
                                    {formatPrice(displayPrice)}
                                </span>
                                {hasDiscount && product.oldPrice && (
                                    <span className="text-xl text-muted-foreground line-through">
                                        {formatPrice(product.oldPrice)}
                                    </span>
                                )}
                            </div>
                            <p className="text-sm text-muted-foreground">
                                Added on {formatDate(product.uploadDate)}
                            </p>
                        </div>

                        {!product.stockAvailable && (
                            <Badge variant="destructive" className="text-base px-4 py-2">
                                Out of Stock
                            </Badge>
                        )}

                        {/* Details */}
                        <div className="space-y-4 border-t border-b py-6">
                            {product.fabricDetails && (
                                <div>
                                    <h3 className="font-semibold mb-2">Fabric Details</h3>
                                    <p className="text-muted-foreground">{product.fabricDetails}</p>
                                </div>
                            )}
                            {product.embroideryDetails && (
                                <div>
                                    <h3 className="font-semibold mb-2">Embroidery Details</h3>
                                    <p className="text-muted-foreground">{product.embroideryDetails}</p>
                                </div>
                            )}
                            {product.colors.length > 0 && (
                                <div>
                                    <h3 className="font-semibold mb-2">Available Colors</h3>
                                    <p className="text-muted-foreground">{product.colors.join(', ')}</p>
                                </div>
                            )}
                        </div>

                        {/* Order Form */}
                        <div className="space-y-4">
                            <h3 className="font-semibold text-lg">Quick Order</h3>
                            
                            {product.sizes.length > 0 && (
                                <div className="space-y-2">
                                    <Label>Select Size</Label>
                                    <Select value={selectedSize} onValueChange={setSelectedSize}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Choose a size" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {product.sizes.map(size => (
                                                <SelectItem key={size} value={size}>{size}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            )}

                            <div className="space-y-2">
                                <Label>Custom Tailoring Request (Optional)</Label>
                                <Textarea
                                    value={tailoringRequest}
                                    onChange={(e) => setTailoringRequest(e.target.value)}
                                    placeholder="Any special requirements or measurements..."
                                    rows={3}
                                />
                            </div>

                            <div className="flex gap-3">
                                <Button
                                    size="lg"
                                    className="flex-1"
                                    onClick={handleWhatsAppOrder}
                                    disabled={!product.stockAvailable}
                                >
                                    <SiWhatsapp className="mr-2" size={20} />
                                    Order on WhatsApp
                                </Button>
                                <Button
                                    size="lg"
                                    variant="outline"
                                    onClick={() => setEnquiryOpen(true)}
                                >
                                    Enquire Now
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <EnquiryDialog
                open={enquiryOpen}
                onOpenChange={setEnquiryOpen}
                productName={product.name}
            />
        </>
    );
}
