"use client";
import React, {useState} from "react";
import ProductDetailModal from "@/components/ui/ProductDetailModal";
import {ProductDetail} from "@/types";
import {blankProductDetail} from "@/types/blanks";
import SidebarFilters from "@/components/ui/SidebarFilters";
import ProductList from "@/components/ui/ProductList";
import Header from "@/components/ui/Header";

// Demo data
const demoProducts: ProductDetail[] = [
    {
        id: 1,
        name: "Wooden Bowl",
        price: 25,
        image: "https://picsum.photos/300?random=1",
        description: "Handcrafted wooden bowl.",
        category: "Wood",
        rating: 4.5,
        seller: {
            fullName: "John Doe",
            email: "john@emil.com",
            shopName: "John's Woodworks",
            description: "Specializing in handcrafted wooden items.",
            image: "https://picsum.photos/100?random=1"
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        reviews: [
            {user: "Alice", rating: 5, comment: "Beautiful and well made!"},
            {user: "Bob", rating: 4, comment: "Nice, but a bit small."},
        ],
        stock: 10,
        isAvailable: true,
        tags: ["bowl", "wooden", "handcrafted"],
        dimensions: {
            width: 10,
            height: 5,
            depth: 10,
        }
    },
    {
        id: 2,
        name: "Handmade Mug",
        price: 18,
        image: "https://picsum.photos/300?random=2",
        description: "Ceramic mug.",
        category: "Ceramic",
        rating: 4.0,
        seller: {
            fullName: "John Doe 2",
            email: "john2@emil.com",
            shopName: "John's Woodworks 2",
            description: "Specializing in handcrafted wooden items.",
            image: "https://picsum.photos/100?random=5"
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        reviews: [
            {user: "Carol", rating: 4, comment: "Great for coffee!"},
        ],
        stock: 0,
        isAvailable: false,
        tags: ["mug", "ceramic", "handmade"],
        dimensions: {
            width: 8,
            height: 10,
            depth: 8,
        }
    },
    {
        id: 3,
        name: "Macrame Wall Hanging",
        price: 40,
        image: "https://picsum.photos/300?random=3",
        description: "Boho macrame wall art.",
        category: "Textile",
        rating: 5.0,
        seller: {
            fullName: "John Doe 3",
            email: "john3@emil.com",
            shopName: "John's Woodworks 3",
            description: "Specializing in handcrafted wooden items.",
            image: "https://picsum.photos/100?random=7"
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        reviews: [
            {user: "Diana", rating: 5, comment: "Stunning piece!"},
        ],
        stock: 5,
        isAvailable: true,
        tags: ["macrame", "wall hanging", "boho"],
        dimensions: {
            width: 20,
            height: 30,
            depth: 2,
        }
    },

];

const categories = ["All", "Wood", "Ceramic", "Textile"];

export default function ProductsPage() {
    const [selectedCategories, setSelectedCategories] = useState<string[]>(["All"]);
    const [priceRange, setPriceRange] = useState([0, 100]);
    const [selectedProduct, setSelectedProduct] = useState<ProductDetail>(blankProductDetail);
    const searchParams = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : null;
    const initialSearch = searchParams?.get("search") || "";
    const [search, setSearch] = useState(initialSearch);

    const filteredProducts = demoProducts.filter((p) => {
        const inCategory = selectedCategories.includes("All") || selectedCategories.includes(p.category);
        const inPrice = p.price >= priceRange[0] && p.price <= priceRange[1];
        const inSearch =
            p.name.toLowerCase().includes(search.toLowerCase()) ||
            (p.seller.shopName && p.seller.shopName.toLowerCase().includes(search.toLowerCase()));
        return inCategory && inPrice && (!search || inSearch);
    });

    return (
        <div className="flex min-h-screen bg-[#F9F5F0]">
            <div className="fixed top-0 left-0 w-full z-50">
                <Header/>
            </div>
            <div className="flex w-full pt-20">
                <SidebarFilters
                    categories={categories}
                    selectedCategories={selectedCategories}
                    setSelectedCategories={setSelectedCategories}
                    priceRange={priceRange}
                    setPriceRange={setPriceRange}
                    search={search}
                    setSearch={setSearch}
                />
                {/* Main content */}
                <main className="flex-1 p-8">
                    <h1 className="text-3xl font-bold text-[#6B4F3B] mb-8">Product Catalog</h1>
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
