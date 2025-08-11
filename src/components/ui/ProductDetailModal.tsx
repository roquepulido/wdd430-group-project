import React, {useState, useEffect} from "react";
import {useSession} from "next-auth/react";
import {ProductDetail, Review} from "@/types";
import ProductReviews from "@/components/ui/ProductReviews";
import ProductReviewForm from "@/components/ui/ProductReviewForm";
import Image from "next/image";

export default function ProductDetailModal({product, onClose}: {
    readonly product: ProductDetail;
    readonly onClose: () => void
}) {
    const {data: session} = useSession();
    const [reviews, setReviews] = useState<Review[]>(product.reviews || []);
    const [avgRating, setAvgRating] = useState<number>(product.rating || 0);
    const [hasReviewed, setHasReviewed] = useState<boolean>(false);

    // Load reviews from the endpoint
    useEffect(() => {
        fetch(`/api/products/${product.id}/reviews`)
            .then(res => res.json())
            .then(data => {
                setReviews(data);
                setHasReviewed(session && data.some((r:Review) => r.user === session.user?.name))
            });
    }, [product.id]);

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
                <Image src={product.image} width={500} height={300} alt={product.name}
                       className="w-full h-56 object-cover rounded mb-4"/>
                <h2 className="text-2xl font-bold text-[#6B4F3B] mb-2">{product.name}</h2>
                <p className="text-[#6B4F3B] mb-2">${product.price}</p>
                <p className="mb-4">{product.description}</p>
                <div className="mb-4">
                    <h3 className="font-bold text-[#6B4F3B] mb-2">Reviews & Ratings</h3>
                    <ProductReviews reviews={reviews}/>
                    {(() => {
                        if (!session) {
                            return <div className="text-sm text-gray-500 mt-2">You must be logged in to leave a
                                review.</div>;
                        }
                        // If the logged-in user is the seller of the product, they cannot leave a review
                        // @ts-expect-error session.user is not typed
                        if (session?.user?.sellerId == product.seller_id) {
                            return <div className="text-sm text-gray-500 mt-2">You cannot review your own
                                product.</div>;
                        }
                        if (!hasReviewed) {
                            return (
                                <ProductReviewForm onSubmit={async (review, rating) => {
                                    // Save review in the backend
                                    const res = await fetch(`/api/products/${product.id}/reviews`, {
                                        method: "POST",
                                        headers: {"Content-Type": "application/json"},
                                        // @ts-expect-error session.user is not typed
                                        body: JSON.stringify({user: session.user.sellerId, rating, comment: review})
                                    });
                                    if (res.ok) {
                                        // Reload reviews and average rating
                                        const reviewsRes = await fetch(`/api/products/${product.id}/reviews`);
                                        const reviewsData = await reviewsRes.json();
                                        setReviews(reviewsData);
                                        const {avg} = await res.json();
                                        setAvgRating(avg);
                                    }
                                }}/>
                            );
                        }
                    })()}
                </div>
            </div>
        </div>
    );
}
