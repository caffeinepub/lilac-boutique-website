export function formatDate(timestamp: bigint): string {
    const date = new Date(Number(timestamp) / 1000000);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

export function formatPrice(price: bigint): string {
    return `AED ${price.toString()}`;
}

export function formatRelativeDate(timestamp: bigint): string {
    const date = new Date(Number(timestamp) / 1000000);
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return 'Today';
    if (diffInDays === 1) return 'Yesterday';
    if (diffInDays < 7) return `${diffInDays} days ago`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
    
    return formatDate(timestamp);
}
