import { useState, useEffect } from 'react';
import type { Offer } from '../../backend';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../ui/button';

interface OfferBannerSliderProps {
    offers: Offer[];
}

export function OfferBannerSlider({ offers }: OfferBannerSliderProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Fallback banners if no offers configured
    const fallbackBanners = [
        '/assets/generated/offer-banner-1.dim_1600x500.png',
        '/assets/generated/offer-banner-2.dim_1600x500.png',
        '/assets/generated/offer-banner-3.dim_1600x500.png'
    ];

    const slides = offers.length > 0
        ? offers.map(offer => ({
            image: offer.image.getDirectURL(),
            text: offer.bannerText
        }))
        : fallbackBanners.map((img, idx) => ({
            image: img,
            text: `Special Offer ${idx + 1}`
        }));

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % slides.length);
        }, 5000);

        return () => clearInterval(timer);
    }, [slides.length]);

    const goToPrevious = () => {
        setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
    };

    const goToNext = () => {
        setCurrentIndex((prev) => (prev + 1) % slides.length);
    };

    if (slides.length === 0) return null;

    return (
        <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px] overflow-hidden bg-muted">
            {slides.map((slide, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-700 ${
                        index === currentIndex ? 'opacity-100' : 'opacity-0'
                    }`}
                >
                    <img
                        src={slide.image}
                        alt={slide.text}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end justify-center pb-12">
                        <h2 className="font-serif text-3xl md:text-5xl font-bold text-white text-center px-4">
                            {slide.text}
                        </h2>
                    </div>
                </div>
            ))}

            {slides.length > 1 && (
                <>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white backdrop-blur"
                        onClick={goToPrevious}
                    >
                        <ChevronLeft size={24} />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white backdrop-blur"
                        onClick={goToNext}
                    >
                        <ChevronRight size={24} />
                    </Button>

                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                        {slides.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`w-2 h-2 rounded-full transition-all ${
                                    index === currentIndex ? 'bg-white w-8' : 'bg-white/50'
                                }`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
