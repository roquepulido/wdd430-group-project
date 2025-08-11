export interface Seller {
    id: number | null,
    userId: number,
    fullName:string,
    email:string,
    shopName:string,
    description:string,
    image:string
}

export interface ProductDetail{
    id: number;
    sellerId: number;
    name: string;
    price: number;
    image: string ;
    description: string;
    category: string;
    rating: number;
    reviews: Review[];
    createdAt: string;
    updatedAt: string;
    stock: number;
    isAvailable: boolean;
    tags?: string[];
    dimensions?: {
        width: number;
        height: number;
        depth: number;
    };
    materials?: string[];
    shopName?: string;
    reviewsLength?: number;
}

export interface Review {
    id: number;
    user: string;
    rating: number;
    comment: string;
}

export interface UserDB {
    id: number;
    email: string;
    password_hash: string;
    role: 'user' | 'admin' | 'seller';
    created_at: string;
    updated_at: string;
}
export interface ProductDB {
    id: number;
    name: string;
    price: number;
    image: string;
    description: string;
    category: string;
    rating: number;
    stock: number;
    is_available: boolean;
    seller_id: number;
    created_at: string;
    updated_at: string;
    dimensions?: {
        width: number;
        height: number;
        depth: number;
    };
    tags?: string[];
    materials?: string[];
}