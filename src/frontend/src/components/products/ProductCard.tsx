import { Link } from '@tanstack/react-router';
import type { Product } from '../../backend';
import { formatPrice, formatRelativeDate } from '../../utils/format';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { createProductOrderMessage, createWhatsAppLink } from '../../utils/whatsapp';
import { SiWhatsapp } from 'react-icons/si';
import { MessageSquare } from 'lucide-react';
import { useState } from 'react';
import { EnquiryDialog } from '../enquiry/EnquiryDialog';

interface ProductCardProps {
    product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
    const [enquiryOpen, setEnquiryOpen] = useState(false);
    const hasDiscount = product.discountPrice !== undefined && product.oldPrice !== undefined;
    const displayPrice = hasDiscount ? product.discountPrice! : product.priceInAED;
    const imageUrl = product.images.length > 0 
        ? product.images[0].getDirectURL() 
        : '/assets/generated/product-placeholder.dim_800x800.png';

    const handleWhatsAppOrder = () => {
        const message = createProductOrderMessage(product.name);
        window.open(createWhatsAppLink(message), '_blank');
    };

    return (
        <>
            <div className="card-luxury group">
                <Link to="/product/$productId" params={{ productId: product.id.toString() }}>
                    <div className="relative aspect-[3/4] overflow-hidden bg-muted">
                        <img
                            src={imageUrl}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        {product.isNew && (
                            <Badge className="absolute top-3 left-3 bg-secondary text-secondary-foreground">
                                NEW
                            </Badge>
                        )}
                        {hasDiscount && (
                            <Badge className="absolute top-3 right-3 bg-destructive text-destructive-foreground">
                                SALE
                            </Badge>
                        )}
                        {!product.stockAvailable && (
                            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                                <Badge variant="outline" className="bg-white/90 text-foreground">
                                    Out of Stock
                                </Badge>
                            </div>
                        )}
                    </div>
                </Link>

                <div className="p-4">
                    <Link to="/product/$productId" params={{ productId: product.id.toString() }}>
                        <h3 className="font-serif text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                            {product.name}
                        </h3>
                    </Link>
                    
                    <div className="flex items-baseline gap-2 mb-3">
                        <span className="text-xl font-bold text-primary">
                            {formatPrice(displayPrice)}
                        </span>
                        {hasDiscount && (
                            <span className="text-sm text-muted-foreground line-through">
                                {formatPrice(product.oldPrice!)}
                            </span>
                        )}
                    </div>

                    {product.sizes.length > 0 && (
                        <p className="text-sm text-muted-foreground mb-3">
                            Sizes: {product.sizes.join(', ')}
                        </p>
                    )}

                    <p className="text-xs text-muted-foreground mb-4">
                        Added {formatRelativeDate(product.uploadDate)}
                    </p>

                    <div className="flex gap-2">
                        <Button
                            size="sm"
                            className="flex-1"
                            onClick={handleWhatsAppOrder}
                            disabled={!product.stockAvailable}
                        >
                            <SiWhatsapp className="mr-2" size={16} />
                            Order
                        </Button>
                        <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setEnquiryOpen(true)}
                        >
                            <MessageSquare size={16} />
                        </Button>
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
