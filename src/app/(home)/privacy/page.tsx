import {Metadata} from "next";
import LinkButton from "@/components/ui/LinkButton";

export const metadata: Metadata = {
    title: "Handcrafted Haven - Virtual Marketplace for Artisans",
    description:
        "Discover unique handcrafted items from talented artisans. Connect creators with conscious consumers in our virtual marketplace.",
};

export default function Privacy() {
    return (
        <div className="bg-gradient-to-b from-[#E8C07D] to-[#F9F5F0] text-[#333333]">
            <div className="container mx-auto px-4 py-16">
                <header className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-[#6B4F3B] mb-2">Handcrafted Haven</h1>
                    <p className="text-xl text-[#6B4F3B]">Privacy Policy</p>
                </header>
                <section className="mb-12">
                    <div className="max-w-2xl mx-auto">
                        <p className="mb-2">At Handcrafted Haven, we value your privacy. This policy describes how we collect, use, and protect your personal information.</p>
                        <h2 className="text-xl font-semibold mt-6 mb-2">Information Collection</h2>
                        <p className="mb-2">We only collect the information necessary to provide our services, such as name, email address, and contact details.</p>
                        <h2 className="text-xl font-semibold mt-6 mb-2">Use of Information</h2>
                        <p className="mb-2">We use your data solely to manage your account, process your orders, and improve your experience on the platform.</p>
                        <h2 className="text-xl font-semibold mt-6 mb-2">Data Protection</h2>
                        <p className="mb-2">We implement security measures to protect your information. We do not share your data with third parties without your consent.</p>
                        <h2 className="text-xl font-semibold mt-6 mb-2">Contact</h2>
                        <p>If you have any questions about our privacy policy, contact us at <a href="mailto:info@handcraftedhaven.com" className="text-blue-600 underline">info@handcraftedhaven.com</a>.</p>
                    </div>
                </section>
                <div className="flex justify-center mt-8">
                    <LinkButton text="Back to Home" />
                </div>
            </div>
        </div>
    );
}