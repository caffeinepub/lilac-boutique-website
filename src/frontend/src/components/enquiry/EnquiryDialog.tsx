import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { useSubmitEnquiry } from '../../hooks/useQueries';
import { Loader2 } from 'lucide-react';

interface EnquiryDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    productName?: string;
}

export function EnquiryDialog({ open, onOpenChange, productName }: EnquiryDialogProps) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState(productName ? `I'm interested in: ${productName}` : '');
    const [success, setSuccess] = useState(false);

    const submitEnquiry = useSubmitEnquiry();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        try {
            await submitEnquiry.mutateAsync({ name, email, message });
            setSuccess(true);
            setTimeout(() => {
                onOpenChange(false);
                setSuccess(false);
                setName('');
                setEmail('');
                setMessage('');
            }, 2000);
        } catch (error) {
            console.error('Failed to submit enquiry:', error);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle className="font-serif text-2xl">Enquire Now</DialogTitle>
                    <DialogDescription>
                        Fill in your details and we'll get back to you shortly.
                    </DialogDescription>
                </DialogHeader>

                {success ? (
                    <div className="py-8 text-center">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                            <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h3 className="font-semibold text-lg mb-2">Enquiry Submitted!</h3>
                        <p className="text-muted-foreground">We'll contact you soon.</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <div className="space-y-4 py-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Name *</Label>
                                <Input
                                    id="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    placeholder="Your name"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email / Phone *</Label>
                                <Input
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    placeholder="Your email or phone number"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="message">Message *</Label>
                                <Textarea
                                    id="message"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    required
                                    rows={4}
                                    placeholder="Tell us about your requirements..."
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                                Cancel
                            </Button>
                            <Button type="submit" disabled={submitEnquiry.isPending}>
                                {submitEnquiry.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Submit Enquiry
                            </Button>
                        </DialogFooter>
                    </form>
                )}
            </DialogContent>
        </Dialog>
    );
}
