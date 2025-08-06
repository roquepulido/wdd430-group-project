import Link from "next/link";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: "Handcrafted Haven - Virtual Marketplace for Artisans",
    description:
        "Discover unique handcrafted items from talented artisans. Connect creators with conscious consumers in our virtual marketplace.",
};

export default function Terms() {
    return (
        <div className="bg-gradient-to-b from-[#E8C07D] to-[#F9F5F0] text-[#333333]">
            <div className="container mx-auto px-4 py-16">
                <header className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-[#6B4F3B] mb-2">Handcrafted Haven</h1>
                    <p className="text-xl text-[#6B4F3B]">Terms and Conditions</p>
                </header>
                <section className="mb-12">
                    <div className="max-w-2xl mx-auto">
                        <p className="mb-2">Welcome to Handcrafted Haven. By using our platform, you agree to the following terms and conditions:</p>
                        <ul className="list-disc pl-6 mb-4">
                            <li>You must provide accurate and up-to-date information when registering.</li>
                            <li>All published content must respect copyright and not violate any laws.</li>
                            <li>We reserve the right to modify these terms at any time.</li>
                            <li>We are not responsible for transactions made outside the platform.</li>
                        </ul>
                        <p>If you have any questions about these terms, contact us at <a href="mailto:info@handcraftedhaven.com" className="text-blue-600 underline">info@handcraftedhaven.com</a>.</p>
                    </div>
                </section>
                <div className="flex justify-center mt-8">
                    <Link href="/" className="bg-[#6B4F3B] text-white px-6 py-2 rounded shadow hover:bg-[#543c2a] transition">Back to Home</Link>
                </div>
            </div>
        </div>
    );
}