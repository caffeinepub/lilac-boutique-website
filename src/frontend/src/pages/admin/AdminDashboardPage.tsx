import { Link } from '@tanstack/react-router';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { Package, Tag, Phone, MessageSquare, LogOut } from 'lucide-react';

export default function AdminDashboardPage() {
    const { clear, identity } = useInternetIdentity();
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await clear();
        queryClient.clear();
        navigate({ to: '/' });
    };

    const adminSections = [
        {
            title: 'Products',
            description: 'Manage abaya collection, images, and inventory',
            icon: Package,
            path: '/admin/products',
            color: 'text-primary'
        },
        {
            title: 'Offers & Banners',
            description: 'Manage promotional banners and discounts',
            icon: Tag,
            path: '/admin/offers',
            color: 'text-secondary'
        },
        {
            title: 'Contact Info',
            description: 'Update business contact information',
            icon: Phone,
            path: '/admin/contact',
            color: 'text-blue-600'
        },
        {
            title: 'Enquiries',
            description: 'View and manage customer enquiries',
            icon: MessageSquare,
            path: '/admin/enquiries',
            color: 'text-green-600'
        }
    ];

    return (
        <div className="min-h-screen bg-muted/30">
            <header className="bg-background border-b">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <div>
                        <h1 className="font-serif text-2xl font-bold">Admin Dashboard</h1>
                        <p className="text-sm text-muted-foreground">LilaC Boutique Management</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link to="/">
                            <Button variant="outline">View Site</Button>
                        </Link>
                        <Button variant="ghost" onClick={handleLogout}>
                            <LogOut size={18} className="mr-2" />
                            Logout
                        </Button>
                    </div>
                </div>
            </header>

            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                    {adminSections.map(section => (
                        <Link key={section.path} to={section.path}>
                            <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer h-full">
                                <div className="flex items-start gap-4">
                                    <div className={`w-12 h-12 rounded-lg bg-muted flex items-center justify-center flex-shrink-0 ${section.color}`}>
                                        <section.icon size={24} />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg mb-1">{section.title}</h3>
                                        <p className="text-sm text-muted-foreground">{section.description}</p>
                                    </div>
                                </div>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
