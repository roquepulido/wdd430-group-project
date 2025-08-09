'use client';
import Link from "next/link";
import {useEffect, useState} from "react";
import ProductModal from "@/components/ui/ProductModal";
import {Product, Seller} from "@/types";
import Image from "next/image";

export default function SellerDashboard() {
    const [showProductModal, setShowProductModal] = useState(false);
    const [editProduct, setEditProduct] = useState<Product>({
        name: "",
        description: "",
        price: 0,
        category: "",
        image: ""
    });
    const [profile, setProfile] = useState<Seller>({
        fullName: "",
        email: "",
        shopName: "",
        description: "",
        image: ""
    });

    const handleAddProduct = () => {
        setEditProduct({} as Product);
        setShowProductModal(true);
    };
    const handleEditProduct = (product: Product) => {
        setEditProduct(product);
        setShowProductModal(true);
    };
    const handleCloseModal = () => {
        setShowProductModal(false);
        setEditProduct({} as Product);
    };
    const handleProductSubmit = (prod: FormData) => {
        console.log(prod)
        handleCloseModal();
    };

    const loadProfile = () => {
        // TODO change this to fetch from an API
        setProfile(profileSeller);
    }


    // Example products
    const products = [
        {
            id: 1,
            name: "Wooden Bowl",
            price: 25,
            category: "Kitchenware",
            image: "https://picsum.photos/100?random=1",
            description: "Handcrafted wooden bowl."
        },
        {
            id: 2,
            name: "Handmade Mug",
            price: 18,
            category: "Ceramics",
            image: "https://picsum.photos/100?random=2",
            description: "Ceramic mug."
        },
    ];

    const profileSeller: Seller = {
        fullName: "Jane Doe",
        email: "email@test.com",
        shopName: "Jane's Woodworks",
        description: "Woodworking artisan passionate about sustainable decor.",
        image: "https://picsum.photos/100?random=3"
    }

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
                    <section className="bg-white p-8 rounded-lg shadow-md">
                        <h2 className="text-2xl font-bold mb-4 text-[#6B4F3B]">Profile Information</h2>
                        <form className="flex flex-col gap-4 mb-4">
                            <div className="flex flex-col items-center relative mb-2">
                                {profile.image ? (
                                    <Image src={profile.image} alt="Shop Logo"
                                         className="w-24 h-24 object-cover rounded-full border mx-auto"/>
                                ) : (
                                    <div
                                        className="w-24 h-24 bg-[#E8C07D] rounded-full flex items-center justify-center text-[#6B4F3B] mx-auto">No
                                        Logo</div>
                                )}
                                <label
                                    className="absolute top-2 right-2 cursor-pointer bg-white rounded-full p-1 shadow hover:bg-[#E8C07D] transition"
                                    title="Change logo">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         strokeWidth={1.5} stroke="#6B4F3B" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                              d="M16.862 4.487a2.25 2.25 0 1 1 3.182 3.182l-9.193 9.193a4.5 4.5 0 0 1-1.897 1.13l-3.06.918.918-3.06a4.5 4.5 0 0 1 1.13-1.897l9.193-9.193z"/>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 6.75l-1.5-1.5"/>
                                    </svg>
                                    <input type="file" accept="image/*" className="hidden" onChange={e => {
                                        const file = e.target.files?.[0];
                                        if (file) {
                                            const reader = new FileReader();
                                            reader.onload = (ev) => {
                                                setProfile(prev => ({...prev, image: ev.target?.result as string}));
                                            };
                                            reader.readAsDataURL(file);
                                        }
                                    }}/>
                                </label>
                            </div>
                            <input type="text" placeholder="Full Name" className="border rounded px-3 py-2"
                                   value={profile.fullName}
                                   onChange={e => setProfile(prev => ({...prev, fullName: e.target.value}))}/>
                            <input type="email" placeholder="Email" className="border rounded px-3 py-2"
                                   value={profile.email}
                                   onChange={e => setProfile(prev => ({...prev, email: e.target.value}))}/>
                            <input type="text" placeholder="Shop Name" className="border rounded px-3 py-2"
                                   value={profile.shopName}
                                   onChange={e => setProfile(prev => ({...prev, shopName: e.target.value}))}/>
                            <textarea placeholder="Short Bio / Description" className="border rounded px-3 py-2"
                                      rows={3} value={profile.description}
                                      onChange={e => setProfile(prev => ({...prev, description: e.target.value}))}/>
                            <button type="button"
                                    className="bg-[#6B4F3B] text-white px-4 py-2 rounded hover:bg-[#543c2a]"
                                    onClick={() => {/* TODO Aquí podrías guardar la info en backend */
                                    }}>Update
                                Profile
                            </button>
                        </form>
                    </section>
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
                                <div key={product.id} className="border rounded-lg p-4 flex items-center gap-4">
                                    {product.image ? (
                                        <Image
                                            src={product.image}
                                            alt={product.name}
                                            className="w-16 h-16 object-cover rounded"
                                        />
                                    ) : (
                                        <div className="w-16 h-16 bg-[#E8C07D] rounded"></div>
                                    )}
                                    <div className="flex-1">
                                        <h3 className="font-bold text-lg">{product.name}</h3>
                                        <p className="text-sm text-[#6B4F3B]">${product.price}.00</p>
                                    </div>
                                    <button className="text-[#6B4F3B] underline"
                                            onClick={() => handleEditProduct(product)}>Edit
                                    </button>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
                {/* Product Modal */}
                <ProductModal
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
