import { useState } from 'react';
import { useGetContactInfo, useSubmitEnquiry } from '../hooks/useQueries';
import { ScrollReveal } from '../components/ScrollReveal';
import { Card } from '../components/ui/card';
import { Label } from '../components/ui/label';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Button } from '../components/ui/button';
import { MapPin, Phone, Mail, Loader2 } from 'lucide-react';
import { SiWhatsapp } from 'react-icons/si';
import { createWhatsAppLink } from '../utils/whatsapp';

export default function ContactPage() {
    const { data: contactInfo } = useGetContactInfo();
    const submitEnquiry = useSubmitEnquiry();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [success, setSuccess] = useState(false);

    // Fallback to hardcoded values
    const businessName = contactInfo?.businessName || 'Lila Boutique – Tailoring & Embroidery';
    const address = contactInfo?.address || 'Al Khalidiya, Behind Muhairi Centre – Building 28, Abu Dhabi – UAE';
    const phone = contactInfo?.phone || '+971 585473939';

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        try {
            await submitEnquiry.mutateAsync({ name, email, message });
            setSuccess(true);
            setName('');
            setEmail('');
            setMessage('');
            setTimeout(() => setSuccess(false), 5000);
        } catch (error) {
            console.error('Failed to submit enquiry:', error);
        }
    };

    return (
        <div className="container mx-auto px-4 py-12">
            <ScrollReveal>
                <div className="text-center mb-12">
                    <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Visit our boutique or get in touch with us for custom tailoring services
                    </p>
                </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
                {/* Contact Information */}
                <ScrollReveal>
                    <div className="space-y-8">
                        <Card className="p-6">
                            <h2 className="font-serif text-2xl font-bold mb-6">{businessName}</h2>
                            
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                        <MapPin className="text-primary" size={20} />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold mb-1">Address</h3>
                                        <p className="text-muted-foreground">{address}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                        <Phone className="text-primary" size={20} />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold mb-1">Phone</h3>
                                        <a
                                            href={`tel:${phone}`}
                                            className="text-muted-foreground hover:text-primary transition-colors"
                                        >
                                            {phone}
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                        <SiWhatsapp className="text-primary" size={20} />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold mb-1">WhatsApp</h3>
                                        <a
                                            href={createWhatsAppLink('Hello, I would like to inquire about your services.')}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-muted-foreground hover:text-primary transition-colors"
                                        >
                                            Chat with us on WhatsApp
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </Card>

                        {/* Map */}
                        <Card className="p-0 overflow-hidden">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3631.0!2d54.3773!3d24.4539!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjTCsDI3JzE0LjAiTiA1NMKwMjInMzguMyJF!5e0!3m2!1sen!2sae!4v1234567890"
                                width="100%"
                                height="300"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="LilaC Boutique Location"
                            />
                        </Card>
                    </div>
                </ScrollReveal>

                {/* Contact Form */}
                <ScrollReveal>
                    <Card className="p-6">
                        <h2 className="font-serif text-2xl font-bold mb-6">Send us a Message</h2>
                        
                        {success ? (
                            <div className="py-8 text-center">
                                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                                    <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <h3 className="font-semibold text-lg mb-2">Message Sent!</h3>
                                <p className="text-muted-foreground">We'll get back to you soon.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="contact-name">Name *</Label>
                                    <Input
                                        id="contact-name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                        placeholder="Your name"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="contact-email">Email / Phone *</Label>
                                    <Input
                                        id="contact-email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        placeholder="Your email or phone number"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="contact-message">Message *</Label>
                                    <Textarea
                                        id="contact-message"
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        required
                                        rows={6}
                                        placeholder="Tell us how we can help you..."
                                    />
                                </div>

                                <Button type="submit" size="lg" className="w-full" disabled={submitEnquiry.isPending}>
                                    {submitEnquiry.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                    Send Message
                                </Button>
                            </form>
                        )}
                    </Card>
                </ScrollReveal>
            </div>
        </div>
    );
}
