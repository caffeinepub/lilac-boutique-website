import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';
import { useInternetIdentity } from './useInternetIdentity';

export function useAdminStatus() {
    const { actor, isFetching } = useActor();
    const { identity } = useInternetIdentity();

    return useQuery<boolean>({
        queryKey: ['adminStatus', identity?.getPrincipal().toString()],
        queryFn: async () => {
            if (!actor) return false;
            try {
                return await actor.isCallerAdmin();
            } catch (error) {
                console.error('Admin check failed:', error);
                return false;
            }
        },
        enabled: !!actor && !!identity && !isFetching,
        retry: false
    });
}
