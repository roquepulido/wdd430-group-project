'use client';
import Link from "next/link";
import { useState } from "react";

export default function SellerDashboard() {
    const [showProductModal, setShowProductModal] = useState(false);
    const [editProduct, setEditProduct] = useState(null);

    const handleAddProduct = () => {
        setEditProduct(null);
        setShowProductModal(true);
    };
    const handleEditProduct = (product: any) => {
        setEditProduct(product);
        setShowProductModal(true);
    };
    const handleCloseModal = () => {
        setShowProductModal(false);
        setEditProduct(null);
    };

    // Example products
    const products = [
        { id: 1, name: "Wooden Bowl", price: 25, image: "", description: "Handcrafted wooden bowl." },
        { id: 2, name: "Handmade Mug", price: 18, image: "", description: "Ceramic mug." },
    ];

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
                            <input type="text" placeholder="Full Name" className="border rounded px-3 py-2" defaultValue="Jane Doe" />
                            <input type="email" placeholder="Email" className="border rounded px-3 py-2" defaultValue="jane@email.com" />
                            <input type="text" placeholder="Shop Name" className="border rounded px-3 py-2" defaultValue="Jane's Woodworks" />
                            <textarea placeholder="Short Bio / Description" className="border rounded px-3 py-2" rows={3} defaultValue="Woodworking artisan passionate about sustainable decor." />
                            <button type="submit" className="bg-[#6B4F3B] text-white px-4 py-2 rounded hover:bg-[#543c2a]">Update Profile</button>
                        </form>
                    </section>
                    {/* Products Section */}
                    <section className="bg-white p-8 rounded-lg shadow-md flex flex-col">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-2xl font-bold text-[#6B4F3B]">Your Products</h2>
                            <button onClick={handleAddProduct} className="bg-[#E8C07D] text-[#333333] px-4 py-2 rounded shadow hover:bg-[#cfa44e] font-bold">Add New Product</button>
                        </div>
                        {/* Product list */}
                        <div className="flex flex-col gap-4">
                            {products.map((product) => (
                                <div key={product.id} className="border rounded-lg p-4 flex items-center gap-4">
                                    <div className="w-16 h-16 bg-[#E8C07D] rounded"></div>
                                    <div className="flex-1">
                                        <h3 className="font-bold text-lg">{product.name}</h3>
                                        <p className="text-sm text-[#6B4F3B]">${product.price}.00</p>
                                    </div>
                                    <button className="text-[#6B4F3B] underline" onClick={() => handleEditProduct(product)}>Edit</button>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
                {/* Product Modal */}
                {showProductModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md relative">
                            <button onClick={handleCloseModal} className="absolute top-2 right-2 text-[#6B4F3B] text-2xl">&times;</button>
                            <h2 className="text-2xl font-bold mb-4 text-[#6B4F3B]">{editProduct ? 'Edit Product' : 'Add Product'}</h2>
                            <form className="flex flex-col gap-4">
                                <input type="text" placeholder="Product Name" className="border rounded px-3 py-2" defaultValue={editProduct?.name || ''} required />
                                <textarea placeholder="Description" className="border rounded px-3 py-2" rows={3} defaultValue={editProduct?.description || ''} required></textarea>
                                <input type="number" placeholder="Price (USD)" className="border rounded px-3 py-2" defaultValue={editProduct?.price || ''} required min="0" step="0.01" />
                                <input type="text" placeholder="Category" className="border rounded px-3 py-2" required />
                                <input type="file" className="border rounded px-3 py-2" accept="image/*" />
                                <button type="submit" className="bg-[#E8C07D] text-[#333333] px-4 py-2 rounded hover:bg-[#cfa44e] font-bold">{editProduct ? 'Update' : 'Add'} Product</button>
                            </form>
                        </div>
                    </div>
                )}
                <div className="flex justify-center mt-8">
                    <Link href="/" className="bg-[#6B4F3B] text-white px-6 py-2 rounded shadow hover:bg-[#543c2a] transition">Back to Home</Link>
                </div>
            </div>
        </div>
    );
}
