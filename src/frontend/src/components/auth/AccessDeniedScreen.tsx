import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { ShieldAlert } from 'lucide-react';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { useNavigate } from '@tanstack/react-router';
import { useQueryClient } from '@tanstack/react-query';

export function AccessDeniedScreen() {
    const { clear } = useInternetIdentity();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const handleLogout = async () => {
        await clear();
        queryClient.clear();
        navigate({ to: '/' });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4">
            <Card className="w-full max-w-md p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-destructive/10 flex items-center justify-center">
                    <ShieldAlert className="text-destructive" size={32} />
                </div>
                <h1 className="font-serif text-2xl font-bold mb-2">Access Denied</h1>
                <p className="text-muted-foreground mb-6">
                    You don't have permission to access the admin dashboard. Please contact the administrator if you believe this is an error.
                </p>
                <div className="flex gap-3 justify-center">
                    <Button onClick={handleLogout} variant="outline">
                        Logout
                    </Button>
                    <Button onClick={() => navigate({ to: '/' })}>
                        Go to Homepage
                    </Button>
                </div>
            </Card>
        </div>
    );
}
