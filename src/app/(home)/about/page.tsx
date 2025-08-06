import Link from "next/link";
import {Metadata} from "next";
import LinkButton from "@/components/ui/LinkButton";

export const metadata: Metadata = {
    title: "Handcrafted Haven - Virtual Marketplace for Artisans",
    description:
        "Discover unique handcrafted items from talented artisans. Connect creators with conscious consumers in our virtual marketplace.",
};

export default function About() {
    return (
        <div className="bg-gradient-to-b from-[#E8C07D] to-[#F9F5F0] text-[#333333]">
            <div className="container mx-auto px-4 py-16">
                <header className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-[#6B4F3B] mb-2">
                        Handcrafted Haven
                    </h1>
                    <p className="text-xl text-[#6B4F3B]">About Us</p>
                </header>
                <section className="mb-12">
                    <div className="max-w-3xl mx-auto text-center text-[#333333] leading-relaxed">
                        <p className="mb-6">
                            Handcrafted Haven is a virtual marketplace dedicated to connecting
                            talented artisans with conscious consumers who appreciate the beauty
                            and quality of handmade products. Our platform provides a space for
                            creators to showcase their craftsmanship, share their stories, and
                            sell unique handcrafted items to a global audience.
                        </p>
                        <p className="mb-6">
                            We believe in the power of handmade goods to bring joy, support
                            local communities, and promote sustainable practices. By fostering a
                            community of artisans and craft lovers, we aim to celebrate the art
                            of handmade creations and provide a platform where creativity
                            thrives.
                        </p>
                        <p>
                            Whether you're an artisan looking to share your work or a craft
                            enthusiast seeking one-of-a-kind treasures, Handcrafted Haven is the
                            perfect place to connect, explore, and celebrate the world of
                            handmade crafts.
                        </p>
                    </div>
                </section>
                <div className="flex justify-center mt-8">
                    <LinkButton text="Back to Home" />
                </div>
            </div>
        </div>
    );
}