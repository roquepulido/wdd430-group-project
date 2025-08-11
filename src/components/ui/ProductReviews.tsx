import { Review } from "@/types";
import React from "react";

interface ProductReviewsProps {
  readonly reviews: Review[];
}

export default function ProductReviews({ reviews }: ProductReviewsProps) {
  const safeReviews = Array.isArray(reviews) ? reviews : [];
  return (
    <ul className="space-y-2 mb-2 max-h-32 overflow-y-auto">
      {safeReviews.length === 0 && <li className="text-gray-500">No reviews yet.</li>}
      {safeReviews.map((r) => (
        <li key={r.id} className="border-b pb-2">
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

