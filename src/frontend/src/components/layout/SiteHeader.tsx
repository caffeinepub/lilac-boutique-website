import { Link, useNavigate } from '@tanstack/react-router';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../ui/button';

export function SiteHeader() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const navigate = useNavigate();

    const navLinks = [
        { label: 'Home', path: '/' },
        { label: 'Abaya Collection', path: '/collection' },
        { label: 'Current Offers', path: '/offers' },
        { label: 'Contact', path: '/contact' }
    ];

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto px-4">
                <div className="flex h-20 items-center justify-between">
                    <Link to="/" className="flex flex-col">
                        <span className="font-serif text-2xl md:text-3xl font-bold text-luxury">
                            LilaC Boutique
                        </span>
                        <span className="text-xs md:text-sm text-muted-foreground tracking-wider">
                            Tailoring & Embroidery
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-8">
                        {navLinks.map(link => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className="text-sm font-medium transition-colors hover:text-primary"
                                activeProps={{ className: 'text-primary' }}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Mobile Navigation */}
                {mobileMenuOpen && (
                    <nav className="md:hidden py-4 border-t">
                        {navLinks.map(link => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className="block py-3 text-sm font-medium transition-colors hover:text-primary"
                                activeProps={{ className: 'text-primary' }}
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>
                )}
            </div>
        </header>
    );
}
