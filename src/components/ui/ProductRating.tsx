import React from "react";

interface ProductRatingProps {
  rating: number;
  reviewsCount?: number;
}

export default function ProductRating({ rating, reviewsCount }: ProductRatingProps) {
  return (
    <div className="flex items-center gap-1">
      <span className="text-yellow-500">★</span>
      <span className="font-bold">{rating}</span>
      {typeof reviewsCount === "number" && (
        <span className="text-xs text-gray-500">({reviewsCount} reviews)</span>
      )}
    </div>
  );
}

