const WHATSAPP_NUMBER = '+971585473939';

export function createWhatsAppLink(message: string): string {
    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${WHATSAPP_NUMBER.replace(/[^0-9]/g, '')}?text=${encodedMessage}`;
}

export function createProductOrderMessage(productName: string, size?: string, tailoringRequest?: string): string {
    let message = `Hello, I want to order this abaya model: ${productName}`;
    
    if (size) {
        message += `\nSize: ${size}`;
    }
    
    if (tailoringRequest) {
        message += `\nCustom tailoring request: ${tailoringRequest}`;
    }
    
    return message;
}

export function createGeneralWhatsAppLink(): string {
    return createWhatsAppLink('Hello, I would like to inquire about your abaya collection.');
}
