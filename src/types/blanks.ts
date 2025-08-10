import {Seller, ProductDetail, Review} from "./index";

export const blankSeller: Seller = {
    id: 0,
    userId: 0,
    fullName: "",
    email: "",
    shopName: "",
    description: "",
    image: "",
};
export const blankReview: Review = {
    user: "",
    rating: 0,
    comment: "",
}

export const blankProductDetail: ProductDetail = {
    id: 0,
    sellerId:0,
    name: "",
    price: 0,
    image: "",
    description: "",
    category: "",
    rating: 0,
    reviews: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    stock: 0,
    isAvailable: false,
    tags: [],
    dimensions: {
        width: 0,
        height: 0,
        depth: 0,
    },
    materials: []
};