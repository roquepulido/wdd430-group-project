import Link from "next/link";
import React from "react";

export default function LinkButton({
    href = "/",
    text = "Click Me",
    type = "primary",
    className = "",
    children,
}: {
    href?: string;
    text?: React.ReactNode;
    type?: "primary" | "secondary";
    className?: string;
    children?: React.ReactNode;
}) {
    let colorClass = "bg-[#6B4F3B] text-white hover:bg-[#543c2a]";
    if (type === "secondary") {
        colorClass = "bg-[#E8C07D] text-[#6B4F3B] hover:bg-[#d6a74e]";
    }
    return (
        <Link
            href={href}
            className={`${colorClass} px-6 py-2 rounded shadow transition ${className}`}
        >
            {children ?? text}
        </Link>
    );
}
