import Link from "next/link";
import { Metadata } from "next";
import LinkButton from "@/components/ui/LinkButton";

export const metadata: Metadata = {
    title: "Seller Registration - Handcrafted Haven",
    description: "Register as a seller and start uploading your unique handcrafted products.",
};

export default function SellerRegister() {
    return (
        <div className="bg-[#F9F5F0] text-[#333333] min-h-screen">
            <div className="container mx-auto px-4 py-8">
                <header className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-[#6B4F3B] mb-2">Seller Registration</h1>
                    <p className="text-xl text-[#6B4F3B]">Become a seller and share your handmade creations with the world!</p>
                </header>
                <section className="mb-12">
                    <div className="max-w-2xl mx-auto">
                        <form className="flex flex-col gap-4 bg-white p-8 rounded-lg shadow-md">
                            <input type="text" placeholder="Full Name" className="border rounded px-3 py-2" required />
                            <input type="email" placeholder="Email" className="border rounded px-3 py-2" required />
                            <input type="text" placeholder="Shop Name" className="border rounded px-3 py-2" required />
                            <textarea placeholder="Short Bio / Description" className="border rounded px-3 py-2" rows={3} required></textarea>
                            <input type="password" placeholder="Password" className="border rounded px-3 py-2" required />
                            <button type="submit" className="bg-[#6B4F3B] text-white px-4 py-2 rounded hover:bg-[#543c2a]">Register</button>
                        </form>
                    </div>
                </section>
                <div className="flex justify-center mt-8">
                    <LinkButton text="Back to Home" />
                </div>
            </div>
        </div>
    );
}
