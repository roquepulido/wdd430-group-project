import React from "react";
import ProductRating from "@/components/ui/ProductRating";
import {ProductDetail} from "@/types";

interface SellerProductListProps {
  product: ProductDetail;
  onEdit: (product: ProductDetail) => void;
}

export default function SellerProductList({ product, onEdit }: SellerProductListProps) {
  return (
        <div className="border rounded-lg p-4 flex items-center gap-4">
          {product.image ? (
            <img src={product.image} alt={product.name} className="w-20 h-20 object-cover rounded" />
          ) : (
            <div className="w-20 h-20 bg-gray-200 rounded" />
          )}
          <div className="flex-1">
            <div className="font-bold text-[#6B4F3B]">{product.name}</div>
            <div className="text-[#6B4F3B]">${product.price}</div>
            <ProductRating rating={product.rating} />
            <div className="text-xs text-gray-600 mt-1">Stock: {product.stock}</div>
            <div className={`text-xs font-bold mt-1 ${product.isAvailable ? 'text-green-600' : 'text-red-500'}`}>{product.isAvailable ? 'Available' : 'Not Available'}</div>
          </div>
          <button onClick={() => onEdit(product)}
                  className="bg-[#E8C07D] text-[#333333] px-3 py-1 rounded shadow hover:bg-[#cfa44e] font-bold">Edit</button>
        </div>
  );
}

