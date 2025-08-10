"use client";
import React from "react";
import Link from "next/link";
import SellerAuthButton from "@/components/ui/SellerAuthButton";
import { useSession } from "next-auth/react";

export default function Header() {
    const { data: session } = useSession();
    return (
        <nav className="bg-white shadow-md">
            <div className="container mx-auto px-4 py-4">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <h1 className="text-2xl font-bold text-[#6B4F3B]">
                        <Link href="/">Handcrafted Haven</Link>
                    </h1>
                    <div className="flex flex-col sm:flex-row w-full md:w-auto gap-2 sm:gap-4 items-center">
                        {session?.user?.name && (
                            <span
                                className="text-[#6B4F3B] font-semibold px-2 cursor-pointer hover:underline"
                                onClick={() => window.location.href = "/seller"}
                            >
                                {session.user.name}
                            </span>
                        )}
                        <SellerAuthButton />
                    </div>
                </div>
            </div>
        </nav>
    );
}
