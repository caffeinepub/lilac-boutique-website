import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export type Time = bigint;
export interface Offer {
    bannerText: string;
    image: ExternalBlob;
}
export interface Enquiry {
    id: bigint;
    status: EnquiryStatus;
    name: string;
    createdAt: Time;
    email: string;
    message: string;
}
export interface ContactInfo {
    businessName: string;
    address: string;
    phone: string;
}
export interface UserProfile {
    name: string;
}
export interface Product {
    id: bigint;
    embroideryDetails: string;
    name: string;
    priceInAED: bigint;
    sizes: Array<string>;
    discountPrice?: bigint;
    oldPrice?: bigint;
    isNew: boolean;
    colors: Array<string>;
    fabricDetails: string;
    uploadDate: Time;
    stockAvailable: boolean;
    images: Array<ExternalBlob>;
}
export enum EnquiryStatus {
    new_ = "new",
    ordered = "ordered",
    contacted = "contacted"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addOffer(bannerText: string, image: ExternalBlob): Promise<void>;
    addProduct(name: string, priceInAED: bigint, sizes: Array<string>, colors: Array<string>, fabricDetails: string, embroideryDetails: string, stockAvailable: boolean, isNew: boolean, discountPrice: bigint | null, oldPrice: bigint | null, images: Array<ExternalBlob>): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    deleteOffer(id: bigint): Promise<void>;
    deleteProduct(id: bigint): Promise<void>;
    deleteProductImage(_path: string): Promise<void>;
    getAllProducts(): Promise<Array<Product>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getContactInfo(): Promise<ContactInfo>;
    getCustomerList(): Promise<Array<[string, string]>>;
    getEnquiries(): Promise<Array<Enquiry>>;
    getNewArrivals(count: bigint): Promise<Array<Product>>;
    getOffers(): Promise<Array<Offer>>;
    getProduct(id: bigint): Promise<Product>;
    getProductsByPriceRange(minPrice: bigint, maxPrice: bigint): Promise<Array<Product>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    searchProductsByName(name: string): Promise<Array<Product>>;
    submitEnquiry(name: string, email: string, message: string): Promise<void>;
    updateContactInfo(newContactInfo: ContactInfo): Promise<void>;
    updateEnquiryStatus(id: bigint, status: EnquiryStatus): Promise<void>;
    updateOffer(id: bigint, bannerText: string, image: ExternalBlob): Promise<void>;
    updateProduct(id: bigint, name: string, priceInAED: bigint, sizes: Array<string>, colors: Array<string>, fabricDetails: string, embroideryDetails: string, stockAvailable: boolean, isNew: boolean, discountPrice: bigint | null, oldPrice: bigint | null, images: Array<ExternalBlob>): Promise<void>;
    uploadProductImage(blob: ExternalBlob): Promise<ExternalBlob>;
}
