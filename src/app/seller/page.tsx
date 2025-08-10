'use client';
import Link from "next/link";
import {useEffect, useState} from "react";
import ProductModalSeller from "@/components/ui/ProductModalSeller";
import {ProductDetail, Seller} from "@/types";
import SellerProductList from "@/components/ui/SellerProductList";
import SellerProfileInfo from "@/components/ui/SellerProfileInfo";
import {blankProductDetail, blankSeller} from "@/types/blanks";
import { useSession } from "next-auth/react";

export default function SellerDashboard() {
    const { data: session } = useSession();
    const [showProductModal, setShowProductModal] = useState(false);
    const [editProduct, setEditProduct] = useState<ProductDetail>(blankProductDetail);
    const [profile, setProfile] = useState<Seller>(blankSeller);

    const handleAddProduct = () => {
        setEditProduct(blankProductDetail);
        setShowProductModal(true);
    };
    const handleEditProduct = (product: ProductDetail) => {
        setEditProduct(product);
        setShowProductModal(true);
    };
    const handleCloseModal = () => {
        setShowProductModal(false);
        setEditProduct(blankProductDetail);
    };
    const handleProductSubmit = (prod: FormData) => {
        console.log(prod)
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

    // Example products
    const products: ProductDetail[] = [
        {
            id: 1,
            name: "Wooden Bowl",
            price: 25,
            category: "Kitchenware",
            image: "https://picsum.photos/100?random=1",
            description: "Handcrafted wooden bowl.",
            rating: 4.5,
            stock: 10,
            isAvailable: true,
            reviews: [],
            seller: blankSeller,
            createdAt: "",
            updatedAt: ""
        },
        {
            id: 2,
            name: "Handmade Mug",
            price: 18,
            category: "Ceramics",
            image: "https://picsum.photos/100?random=2",
            description: "Ceramic mug.",
            rating: 2,
            stock: 0,
            isAvailable: false,
            reviews: [],
            seller: blankSeller,
            createdAt: "",
            updatedAt: ""
        },
    ];


    useEffect(() => {
        loadProfile();
    }, []);

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
                                <SellerProductList key={product.id} product={product} onEdit={handleEditProduct}/>
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
