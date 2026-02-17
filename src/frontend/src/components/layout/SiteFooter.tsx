import { Heart, Phone, Mail, MapPin } from 'lucide-react';
import { SiWhatsapp } from 'react-icons/si';
import { createWhatsAppLink } from '../../utils/whatsapp';

export function SiteFooter() {
    const currentYear = new Date().getFullYear();
    const appIdentifier = encodeURIComponent(window.location.hostname || 'lilac-boutique');

    return (
        <footer className="bg-muted/30 border-t mt-16">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Brand */}
                    <div>
                        <h3 className="font-serif text-2xl font-bold text-luxury mb-2">
                            LilaC Boutique
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4">
                            Tailoring & Embroidery
                        </p>
                        <p className="text-sm text-muted-foreground">
                            Elegant abaya collection in Abu Dhabi with custom tailoring and embroidery services.
                        </p>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="font-semibold mb-4">Contact Us</h4>
                        <div className="space-y-3 text-sm">
                            <div className="flex items-start gap-2">
                                <MapPin size={16} className="mt-1 text-primary flex-shrink-0" />
                                <span className="text-muted-foreground">
                                    Al Khalidiya, Behind Muhairi Centre – Building 28<br />
                                    Abu Dhabi – UAE
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Phone size={16} className="text-primary flex-shrink-0" />
                                <a href="tel:+971585473939" className="text-muted-foreground hover:text-primary transition-colors">
                                    +971 585473939
                                </a>
                            </div>
                            <div className="flex items-center gap-2">
                                <SiWhatsapp size={16} className="text-primary flex-shrink-0" />
                                <a
                                    href={createWhatsAppLink('Hello, I would like to inquire about your abaya collection.')}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-muted-foreground hover:text-primary transition-colors"
                                >
                                    WhatsApp Us
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-semibold mb-4">Quick Links</h4>
                        <div className="space-y-2 text-sm">
                            <a href="/" className="block text-muted-foreground hover:text-primary transition-colors">
                                Home
                            </a>
                            <a href="/collection" className="block text-muted-foreground hover:text-primary transition-colors">
                                Abaya Collection
                            </a>
                            <a href="/offers" className="block text-muted-foreground hover:text-primary transition-colors">
                                Current Offers
                            </a>
                            <a href="/contact" className="block text-muted-foreground hover:text-primary transition-colors">
                                Contact
                            </a>
                        </div>
                    </div>
                </div>

                <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
                    <p className="flex items-center justify-center gap-1">
                        © {currentYear} LilaC Boutique. Built with <Heart size={14} className="text-red-500 fill-red-500" /> using{' '}
                        <a
                            href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appIdentifier}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-primary transition-colors"
                        >
                            caffeine.ai
                        </a>
                    </p>
                </div>
            </div>
        </footer>
    );
}
