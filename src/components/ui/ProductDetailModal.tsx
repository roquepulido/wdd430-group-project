import React, {useState} from "react";
import {useSession} from "next-auth/react";
import {ProductDetail} from "@/types";
import ProductReviews from "@/components/ui/ProductReviews";
import ProductReviewForm from "@/components/ui/ProductReviewForm";

export default function ProductDetailModal({product, onClose}: { product: ProductDetail; onClose: () => void }) {
    const {data: session} = useSession();
    const [reviews, setReviews] = useState(product.reviews || []);
    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
             onClick={handleBackdropClick}>
            <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 relative">
                <button
                    className="absolute top-2 right-2 text-[#6B4F3B] text-2xl font-bold"
                    onClick={onClose}
                >
                    ×
                </button>
                <img src={product.image} alt={product.name} className="w-full h-56 object-cover rounded mb-4"/>
                <h2 className="text-2xl font-bold text-[#6B4F3B] mb-2">{product.name}</h2>
                <p className="text-[#6B4F3B] mb-2">${product.price}</p>
                <p className="mb-4">{product.description}</p>
                <div className="mb-4">
                    <h3 className="font-bold text-[#6B4F3B] mb-2">Reviews & Ratings</h3>
                    <ProductReviews reviews={reviews}/>
                    {session ? (
                        <ProductReviewForm onSubmit={(review, rating) => {
                            setReviews([
                                ...reviews,
                                {user: "Anonymous", rating, comment: review},
                            ]);
                        }}/>
                    ) : (
                        <div className="text-sm text-gray-500 mt-2">You must be logged in to leave a review.</div>
                    )}
                </div>
            </div>
        </div>
    );
}
