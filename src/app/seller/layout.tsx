import Link from "next/link";
import {Lato, Playfair_Display} from "next/font/google";
import type {Metadata} from "next";

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
        <html lang="en">
        <body className={`${playfairDisplay.variable} ${lato.variable}`}>
        <div className="bg-[#F9F5F0] min-h-screen flex flex-col">
            {/* Seller Dashboard Nav */}
            <nav className="bg-white shadow-md w-full z-50 px-4 py-4 flex justify-between items-center">
                <span className="text-2xl font-bold text-[#6B4F3B]">Seller Dashboard</span>
                <Link href="/"
                      className="bg-[#E8C07D] text-[#333333] px-4 py-2 rounded shadow hover:bg-[#cfa44e] font-bold">Logout</Link>
            </nav>
            <main className="flex-1 pt-4">
                {children}
            </main>
        </div>
        </body>
        </html>
    );
}

