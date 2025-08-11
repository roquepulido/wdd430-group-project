'use client';
import Link from "next/link";
import {useEffect, useState} from "react";
import ProductModalSeller from "@/components/ui/ProductModalSeller";
import {ProductDB, ProductDetail, Seller} from "@/types";
import SellerProductList from "@/components/ui/SellerProductList";
import SellerProfileInfo from "@/components/ui/SellerProfileInfo";
import {blankProductDetail, blankSeller} from "@/types/blanks";
import { useSession } from "next-auth/react";

export default function SellerDashboard() {
    const { data: session } = useSession();
    const [showProductModal, setShowProductModal] = useState(false);
    const [editProduct, setEditProduct] = useState<ProductDetail>(blankProductDetail);
    const [profile, setProfile] = useState<Seller>(blankSeller);
    const [products, setProducts] = useState<ProductDetail[]>([]);

    const handleAddProduct = () => {
        setEditProduct(blankProductDetail);
        setShowProductModal(true);
    };
    const handleEditProduct = (product: ProductDetail) => {
        setEditProduct(product);
        setShowProductModal(true);
    };
    const handleDeleteProduct = async (productId: number) => {
        if (!confirm('Are you sure you want to delete this product?')) return;
        const res = await fetch(`/api/products?id=${productId}`, { method: 'DELETE' });
        // @ts-expect-error session.user is not typed
        if (res.ok && session?.user?.sellerId) {
        // @ts-expect-error session.user is not typed
            loadProducts(session.user.sellerId);
        }
    };
    const handleCloseModal = () => {
        setShowProductModal(false);
        setEditProduct(blankProductDetail);
    };
    const handleProductSubmit = async (prod: ProductDetail) => {
        // @ts-expect-error session.user is not typed
        const sellerId = session?.user?.sellerId;
        if (!sellerId) return;
        // @ts-expect-error session.user is not typed
        prod.seller_id = sellerId;
        // @ts-expect-error session.user is not typed
        prod.is_available = prod.isAvailable ?? false;
        if (prod.id && prod.id !== 0) {
            console.log("Product to create:", prod);
            // edit
            const res = await fetch(`/api/products?id=${prod.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(prod)
            });
            if (res.ok) {
                loadProducts(sellerId);
            }
        } else {
            // create
            console.log("Product to create:", prod);
            const res = await fetch('/api/products', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(prod)
            });
            if (res.ok) {
                loadProducts(sellerId);
            }
        }
        handleCloseModal();
    };

    const loadProfile = async () => {
        // get user id from session
        // @ts-expect-error session.user is not typed
        const sellerIdSession = session?.user?.sellerId;
        if (!sellerIdSession) return;
        const res = await fetch(`/api/seller/${sellerIdSession}`);
        if (res.ok) {
            const data = await res.json();
            setProfile({
                id: data.id,
                userId: data.user_id,
                fullName: data.full_name,
                email: data.email,
                shopName: data.shop_name,
                description: data.description,
                image: data.image || ""
            });
        }
    }

    const loadProducts = async (sellerId: string) => {
        const res = await fetch(`/api/products?sellerId=${sellerId}`);
        if (res.ok) {
            const data = await res.json();
            setProducts(data.map((d:ProductDB)=> {
                return {
                    id: d.id,
                    sellerId: d.seller_id,
                    name: d.name,
                    price: d.price,
                    image: d.image,
                    description: d.description,
                    category: d.category,
                    rating: d.rating || 0,
                    reviews: [],
                    createdAt: d.created_at,
                    updatedAt: d.updated_at,
                    stock: d.stock || 0,
                    isAvailable: d.is_available || false,
                    tags: d.tags,
                    dimensions: d.dimensions,
                    materials: d.materials
                }
            }));
        }
    };

    useEffect(() => {
        loadProfile();
        // @ts-expect-error session.user is not typed
        if (session?.user?.sellerId) {
            // @ts-expect-error session.user is not typed
           loadProducts(session.user.sellerId);
        }
    }, [session]);

    return (
        <div className="bg-[#F9F5F0] text-[#333333] min-h-screen">
            <div className="container mx-auto px-4 py-8">
                <header className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-[#6B4F3B] mb-2">Seller Dashboard</h1>
                    <p className="text-xl text-[#6B4F3B]">Manage your profile and products</p>
                </header>
                <div className="grid md:grid-cols-2 gap-8">
                    {/* Profile Section */}
                    <SellerProfileInfo profile={profile} setProfile={setProfile}/>
                    {/* Products Section */}
                    <section className="bg-white p-8 rounded-lg shadow-md flex flex-col">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-2xl font-bold text-[#6B4F3B]">Your Products</h2>
                            <button onClick={handleAddProduct}
                                    className="bg-[#E8C07D] text-[#333333] px-4 py-2 rounded shadow hover:bg-[#cfa44e] font-bold">Add
                                New Product
                            </button>
                        </div>
                        {/* Product list */}
                        <div className="flex flex-col gap-4">
                            {products.map((product) => (
                                <SellerProductList key={product.id} product={product} onEdit={handleEditProduct} onDelete={handleDeleteProduct}/>
                            ))}
                        </div>
                    </section>
                </div>
                {/* Product Modal */}
                <ProductModalSeller
                    show={showProductModal}
                    onClose={handleCloseModal}
                    onSubmit={handleProductSubmit}
                    product={editProduct}
                />
                <div className="flex justify-center mt-8">
                    <Link href="/"
                          className="bg-[#6B4F3B] text-white px-6 py-2 rounded shadow hover:bg-[#543c2a] transition">Back
                        to Home</Link>
                </div>
            </div>
        </div>
    );
}
