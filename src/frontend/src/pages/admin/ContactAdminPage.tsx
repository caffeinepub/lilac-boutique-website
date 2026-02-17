import { Link } from '@tanstack/react-router';
import { ArrowLeft } from 'lucide-react';

export default function ContactAdminPage() {
    return (
        <div className="min-h-screen bg-muted/30">
            <header className="bg-background border-b">
                <div className="container mx-auto px-4 py-4">
                    <Link to="/admin" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-2">
                        <ArrowLeft size={16} className="mr-2" />
                        Back to Dashboard
                    </Link>
                    <h1 className="font-serif text-2xl font-bold">Contact Information</h1>
                </div>
            </header>
            <div className="container mx-auto px-4 py-8">
                <p className="text-muted-foreground">Contact info management interface coming soon...</p>
            </div>
        </div>
    );
}
