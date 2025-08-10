import type {Metadata} from "next";
import React from "react";
import Link from "next/link";
import Header from "@/components/ui/Header";

export const metadata: Metadata = {
    title: "Handcrafted Haven",
    description: "Discover unique handmade crafts and artisan products",
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <div className="bg-[#F9F5F0] text-[#333333] min-h-screen flex flex-col">
            {/* Navigation */}
            <Header />
            {/* Main Content */}
            <main className="overflow-auto">
                {children}
            </main>
        </div>
    );
}
