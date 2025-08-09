import type {Metadata} from "next";
import React from "react";

export const metadata: Metadata = {
    title: "Authentication"
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <div className="bg-[#F9F5F0] min-h-screen flex flex-col">
            <main className="flex-1 pt-4">
                {children}
            </main>
        </div>
    );
}

