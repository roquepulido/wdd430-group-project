"use client";
import React, { useState, useEffect } from "react";
import ProductDetailModal from "@/components/ui/ProductDetailModal";
import { ProductDetail } from "@/types";
import { blankProductDetail } from "@/types/blanks";
import SidebarFilters from "@/components/ui/SidebarFilters";
import ProductList from "@/components/ui/ProductList";
import Header from "@/components/ui/Header";

export default function ProductsPage() {
  const [products, setProducts] = useState<ProductDetail[]>([]);
  const [categories, setCategories] = useState<string[]>(["All"]);
  const [materials, setMaterials] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([
    "All",
  ]);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState(100);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);
  // Actualizar el precio máximo cuando se cargan los productos
  useEffect(() => {
    if (products.length > 0) {
      const max = Math.max(...products.map(p => p.price));
      setMaxPrice(max);
      setPriceRange([0, max]);
    }
  }, [products]);
  const [selectedProduct, setSelectedProduct] =
    useState<ProductDetail>(blankProductDetail);
  const searchParams =
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search)
      : null;
  const initialSearch = searchParams?.get("search") || "";
  const [search, setSearch] = useState(initialSearch);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then(res => {
        setProducts(res);
      });
    fetch("/api/products/categories")
      .then((res) => res.json())
      .then((cats) => {
        setCategories(["All", ...cats]);
      });
    fetch("/api/products/materials")
      .then((res) => res.json())
      .then((materials) => {
        setMaterials(materials);
      });
    fetch("/api/products/tags")
      .then((res) => res.json())
      .then((tags) => {
        setTags(tags);
      });
  }, []);

  const filteredProducts = products.filter((p) => {
    const inCategory =
      selectedCategories.includes("All") ||
      selectedCategories.includes(p.category);
    const inMaterial =
      selectedMaterials.length === 0 ||
      (p.materials?.some((m: string) => selectedMaterials.includes(m)));
    const inTag =
      selectedTags.length === 0 ||
      (p.tags?.some((t: string) => selectedTags.includes(t)));
    const inPrice = p.price >= priceRange[0] && p.price <= priceRange[1];
    const inSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      (p.shopName?.toLowerCase().includes(search.toLowerCase()));
    return (
      inCategory && inMaterial && inTag && inPrice && (!search || inSearch)
    );
  });

  return (
    <div className="flex min-h-screen bg-[#F9F5F0]">
      <div className="fixed top-0 left-0 w-full z-50">
        <Header />
      </div>
      <div className="flex w-full pt-20">
        <SidebarFilters
          categories={categories}
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
          materials={materials}
          selectedMaterials={selectedMaterials}
          setSelectedMaterials={setSelectedMaterials}
          tags={tags}
          selectedTags={selectedTags}
          setSelectedTags={setSelectedTags}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          maxPrice={maxPrice}
          search={search}
          setSearch={setSearch}
        />
        {/* Main content */}
        <main className="flex-1 p-8">
          <h1 className="text-3xl font-bold text-[#6B4F3B] mb-8">
            Product Catalog
          </h1>
          <ProductList
            products={filteredProducts}
            onProductClick={setSelectedProduct}
          />
          {/* Product Detail Modal */}
          {selectedProduct && selectedProduct.id > 0 && (
            <ProductDetailModal
              product={selectedProduct}
              onClose={() => setSelectedProduct(blankProductDetail)}
            />
          )}
        </main>
      </div>
    </div>
  );
}
