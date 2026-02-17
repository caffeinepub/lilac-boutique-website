import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Product, Offer, Enquiry, ContactInfo, EnquiryStatus } from '../backend';

export function useGetAllProducts() {
    const { actor, isFetching } = useActor();

    return useQuery<Product[]>({
        queryKey: ['products'],
        queryFn: async () => {
            if (!actor) return [];
            return actor.getAllProducts();
        },
        enabled: !!actor && !isFetching
    });
}

export function useGetProduct(id: string) {
    const { actor, isFetching } = useActor();

    return useQuery<Product>({
        queryKey: ['product', id],
        queryFn: async () => {
            if (!actor) throw new Error('Actor not available');
            return actor.getProduct(BigInt(id));
        },
        enabled: !!actor && !isFetching && !!id
    });
}

export function useGetOffers() {
    const { actor, isFetching } = useActor();

    return useQuery<Offer[]>({
        queryKey: ['offers'],
        queryFn: async () => {
            if (!actor) return [];
            return actor.getOffers();
        },
        enabled: !!actor && !isFetching
    });
}

export function useGetContactInfo() {
    const { actor, isFetching } = useActor();

    return useQuery<ContactInfo>({
        queryKey: ['contactInfo'],
        queryFn: async () => {
            if (!actor) throw new Error('Actor not available');
            return actor.getContactInfo();
        },
        enabled: !!actor && !isFetching
    });
}

export function useSubmitEnquiry() {
    const { actor } = useActor();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ name, email, message }: { name: string; email: string; message: string }) => {
            if (!actor) throw new Error('Actor not available');
            return actor.submitEnquiry(name, email, message);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['enquiries'] });
        }
    });
}
