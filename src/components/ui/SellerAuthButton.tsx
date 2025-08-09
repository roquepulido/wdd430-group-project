"use client";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

export default function SellerAuthButton() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return null;
  }

  if (session) {
    return (
      <button
        onClick={() => signOut({ callbackUrl: "/" })}
        className="bg-[#E8C07D] text-[#6B4F3B] px-6 py-2 rounded-lg font-bold hover:bg-[#d6a74e] transition-colors w-full sm:w-auto text-center"
      >
        Logout
      </button>
    );
  }
  return (
    <Link
      href="/auth/login"
      className="bg-[#E8C07D] text-[#6B4F3B] px-6 py-2 rounded-lg font-bold hover:bg-[#d6a74e] transition-colors w-full sm:w-auto text-center"
    >
      Login
    </Link>
  );
}
