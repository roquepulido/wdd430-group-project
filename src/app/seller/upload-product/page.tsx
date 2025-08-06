import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Upload Product - Handcrafted Haven",
    description: "Sellers can upload their unique handcrafted products to the marketplace.",
};

export default function UploadProduct() {
    return (
        <div className="bg-[#F9F5F0] text-[#333333] min-h-screen">
            <div className="container mx-auto px-4 py-8">
                <header className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-[#6B4F3B] mb-2">Upload Product</h1>
                    <p className="text-xl text-[#6B4F3B]">Add your handmade product to the marketplace</p>
                </header>
                <section className="mb-12">
                    <div className="max-w-2xl mx-auto">
                        <form className="flex flex-col gap-4 bg-white p-8 rounded-lg shadow-md">
                            <input type="text" placeholder="Product Name" className="border rounded px-3 py-2" required />
                            <textarea placeholder="Description" className="border rounded px-3 py-2" rows={3} required></textarea>
                            <input type="number" placeholder="Price (USD)" className="border rounded px-3 py-2" required min="0" step="0.01" />
                            <input type="text" placeholder="Category" className="border rounded px-3 py-2" required />
                            <input type="file" className="border rounded px-3 py-2" accept="image/*" />
                            <button type="submit" className="bg-[#6B4F3B] text-white px-4 py-2 rounded hover:bg-[#543c2a]">Upload Product</button>
                        </form>
                    </div>
                </section>
                <div className="flex justify-center mt-8">
                    <Link href="/public" className="bg-[#6B4F3B] text-white px-6 py-2 rounded shadow hover:bg-[#543c2a] transition">Back to Home</Link>
                </div>
            </div>
        </div>
    );
}

