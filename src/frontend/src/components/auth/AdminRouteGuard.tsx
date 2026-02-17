import { type ReactNode } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { useAdminStatus } from '../../hooks/useAdminStatus';
import { AccessDeniedScreen } from './AccessDeniedScreen';
import { Loader2 } from 'lucide-react';
import { useEffect } from 'react';

interface AdminRouteGuardProps {
    children: ReactNode;
}

export function AdminRouteGuard({ children }: AdminRouteGuardProps) {
    const { identity, isInitializing } = useInternetIdentity();
    const { data: isAdmin, isLoading: adminCheckLoading } = useAdminStatus();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isInitializing && !identity) {
            navigate({ to: '/admin/login' });
        }
    }, [identity, isInitializing, navigate]);

    if (isInitializing || adminCheckLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    if (!identity) {
        return null;
    }

    if (isAdmin === false) {
        return <AccessDeniedScreen />;
    }

    return <>{children}</>;
}
