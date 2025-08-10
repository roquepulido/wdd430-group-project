import React, { useState } from "react";

interface ProductReviewFormProps {
  onSubmit: (review: string, rating: number) => void;
}

export default function ProductReviewForm({ onSubmit }: ProductReviewFormProps) {
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(5);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!review) return;
    onSubmit(review, rating);
    setReview("");
    setRating(5);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 mt-2">
      <label className="font-bold text-[#6B4F3B]">Leave a review:</label>
      <div className="flex items-center gap-2">
        <select
          value={rating}
          onChange={e => setRating(Number(e.target.value))}
          className="border rounded px-2 py-1"
        >
          {[5, 4, 3, 2, 1].map(n => (
            <option key={n} value={n}>{n} ★</option>
          ))}
        </select>
        <input
          type="text"
          value={review}
          onChange={e => setReview(e.target.value)}
          placeholder="Write your review..."
          className="border rounded px-2 py-1 flex-1"
          maxLength={120}
        />
        <button
          type="submit"
          className="bg-[#E8C07D] text-[#6B4F3B] px-4 py-1 rounded font-bold hover:bg-[#d6a74e]"
        >
          Submit
        </button>
      </div>
    </form>
  );
}

