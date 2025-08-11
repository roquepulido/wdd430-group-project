import React from "react";
import { ProductDetail } from "@/types";
import ProductRating from "@/components/ui/ProductRating";
import Image from "next/image";

export default function ProductCard({
  product,
  onClick,
}: Readonly<{
  product: ProductDetail;
  onClick: () => void;
}>) {
  return (
    <button
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition flex flex-col"
      onClick={onClick}
    >
      <Image
        src={product.image}
        alt={product.name}
        width={400}
        height={200}
        className="w-full h-48 object-cover"
      />
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-bold text-[#6B4F3B] mb-2">
            {product.name}
          </h2>
          <p className="text-[#6B4F3B] mb-2">${product.price}</p>
          {product.shopName && (
            <p className="text-sm text-[#6B4F3B] italic mb-1">
              {product.shopName}
            </p>
          )}
        </div>
        <div className="flex items-center gap-2 mt-2">
          <ProductRating
            rating={product.rating}
            reviewsCount={product.reviewsLength ?? 0}
          />
        </div>
      </div>
    </button>
  );
}
