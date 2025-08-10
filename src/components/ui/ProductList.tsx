import React from "react";
import ProductCard from "./ProductCard";
import { ProductDetail } from "@/types";

interface ProductListProps {
  products: ProductDetail[];
  onProductClick: (product: ProductDetail) => void;
}

export default function ProductList({ products, onProductClick }: ProductListProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onClick={() => onProductClick(product)}
        />
      ))}
    </div>
  );
}

