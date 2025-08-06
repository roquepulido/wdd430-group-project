import type {Metadata} from "next";
import {Playfair_Display, Lato} from "next/font/google";
import "./globals.css";

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
        <div className="bg-[#F9F5F0] text-[#333333] min-h-screen flex flex-col">
            {/* Navigation */}
            <nav className="bg-white shadow-md">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <h1 className="text-2xl font-bold text-[#6B4F3B]">
                            Handcrafted Haven
                        </h1>
                        <div className="flex flex-col sm:flex-row w-full md:w-auto gap-2 sm:gap-4">
                            <input
                                type="text"
                                placeholder="Search handcrafted items..."
                                className="px-4 py-2 border border-[#E8C07D] rounded-lg focus:outline-none focus:border-[#6B4F3B] w-full"
                            />
                            <button
                                className="bg-[#6B4F3B] text-white px-6 py-2 rounded-lg hover:bg-[#5a4332] transition-colors w-full sm:w-auto">
                                Explore
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
            {/* Main Content */}
            <main className="overflow-auto">
                {children}
            </main>
        </div>
        </body>
        </html>
    );
}
