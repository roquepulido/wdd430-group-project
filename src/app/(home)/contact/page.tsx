import {Metadata} from "next";
import LinkButton from "@/components/ui/LinkButton";

export const metadata: Metadata = {
    title: "Handcrafted Haven - Virtual Marketplace for Artisans",
    description:
        "Discover unique handcrafted items from talented artisans. Connect creators with conscious consumers in our virtual marketplace.",
};

export default function Contact() {
    return (
        <div className="bg-gradient-to-b from-[#E8C07D] to-[#F9F5F0] text-[#333333]">
            <div className="container mx-auto px-4 py-16">
                <header className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-[#6B4F3B] mb-2">Handcrafted Haven</h1>
                    <p className="text-xl text-[#6B4F3B]">Contact</p>
                </header>
                <section className="mb-12">
                    <div className="max-w-2xl mx-auto">
                        <p className="mb-2">Do you have questions, suggestions, or want to get in touch with us?</p>
                        <p className="mb-2">You can email us at <a href="mailto:info@handcraftedhaven.com"
                                                       className="text-blue-600 underline">info@handcraftedhaven.com</a> or
                fill out the following form:</p>
                        <form className="mt-6 flex flex-col gap-4">
                            <input type="text" placeholder="Name" className="border rounded px-3 py-2" required/>
                            <input type="email" placeholder="Email" className="border rounded px-3 py-2" required/>
                            <textarea placeholder="Message" className="border rounded px-3 py-2" rows={4} required></textarea>
                            <button type="submit" className="bg-[#6B4F3B] text-white px-4 py-2 rounded hover:bg-[#543c2a]">Send
                            </button>
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