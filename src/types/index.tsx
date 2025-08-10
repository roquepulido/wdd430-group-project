export interface Seller {
    id: number,
    userId: number,
    fullName:string,
    email:string,
    shopName:string,
    description:string,
    image:string
}

export interface ProductDetail{
    id: number;
    name: string;
    price: number;
    image: string ;
    description: string;
    category: string;
    rating: number;
    reviews: Review[];
    seller: Seller;
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
}

export interface Review {
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