import React from "react";

interface Review {
  user: string;
  rating: number;
  comment: string;
}

interface ProductReviewsProps {
  reviews: Review[];
}

export default function ProductReviews({ reviews }: ProductReviewsProps) {
  return (
    <ul className="space-y-2 mb-2 max-h-32 overflow-y-auto">
      {reviews.length === 0 && <li className="text-gray-500">No reviews yet.</li>}
      {reviews.map((r, idx) => (
        <li key={idx} className="border-b pb-2">
          <div className="flex items-center gap-2">
            <span className="text-yellow-500">★</span>
            <span className="font-bold">{r.rating}</span>
            <span className="text-xs text-gray-500 ml-2">by {r.user}</span>
          </div>
          <div className="text-sm mt-1">{r.comment}</div>
        </li>
      ))}
    </ul>
  );
}

