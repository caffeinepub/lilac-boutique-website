import { useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { useAdminStatus } from '../../hooks/useAdminStatus';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { Loader2, LogIn } from 'lucide-react';

export default function AdminLoginPage() {
    const { login, clear, loginStatus, identity } = useInternetIdentity();
    const { data: isAdmin, isLoading: adminCheckLoading } = useAdminStatus();
    const navigate = useNavigate();

    useEffect(() => {
        if (identity && isAdmin === true) {
            navigate({ to: '/admin' });
        }
    }, [identity, isAdmin, navigate]);

    const handleLogin = async () => {
        try {
            await login();
        } catch (error: any) {
            console.error('Login error:', error);
            if (error.message === 'User is already authenticated') {
                await clear();
                setTimeout(() => login(), 300);
            }
        }
    };

    const isLoading = loginStatus === 'logging-in' || adminCheckLoading;

    return (
        <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4">
            <Card className="w-full max-w-md p-8">
                <div className="text-center mb-8">
                    <h1 className="font-serif text-3xl font-bold mb-2">Admin Login</h1>
                    <p className="text-muted-foreground">
                        Sign in with Internet Identity to access the admin dashboard
                    </p>
                </div>

                {identity && isAdmin === false && (
                    <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                        <p className="text-sm text-destructive text-center">
                            You don't have admin access. Please contact the administrator.
                        </p>
                    </div>
                )}

                <Button
                    onClick={handleLogin}
                    disabled={isLoading}
                    size="lg"
                    className="w-full"
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            {loginStatus === 'logging-in' ? 'Logging in...' : 'Checking access...'}
                        </>
                    ) : (
                        <>
                            <LogIn className="mr-2 h-5 w-5" />
                            Login with Internet Identity
                        </>
                    )}
                </Button>
            </Card>
        </div>
    );
}
