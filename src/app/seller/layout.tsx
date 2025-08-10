import type {Metadata} from "next";
import React from "react";
import AuthProtected from "@/components/auth/AuthProtected";
import Header from "@/components/ui/Header";

export const metadata: Metadata = {
    title: "Seller"
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <AuthProtected>
            <div className="bg-[#F9F5F0] min-h-screen flex flex-col">
                <Header />
                <main className="flex-1 pt-4">
                    {children}
                </main>
            </div>
        </AuthProtected>
    );
}
