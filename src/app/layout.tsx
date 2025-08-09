import type {Metadata} from "next";
import {Playfair_Display, Lato} from "next/font/google";
import "./globals.css";
import React from "react";
import AuthProvider from "@/components/auth/SessionProvider";

const playfairDisplay = Playfair_Display({
    subsets: ["latin"],
    weight: ["700"],
    variable: "--font-heading",
});

const lato = Lato({
    subsets: ["latin"],
    weight: ["400", "700"],
    variable: "--font-sans",
});

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
        <AuthProvider>
            <html lang="en">
            <body className={`${playfairDisplay.variable} ${lato.variable}`}>
            {children}
            </body>
            </html>
        </AuthProvider>
    );
}
