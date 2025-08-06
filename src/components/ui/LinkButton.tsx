import Link from "next/link";

export default function LinkButton({
                                       href = "/",
                                       text = "Example",
                                       className = "",
                                   }: {
    href?: string;
    text: React.ReactNode;
    className?: string;
}) {
    return (
        <Link
            href={href}
            className={`bg-[#6B4F3B] text-white px-6 py-2 rounded shadow hover:bg-[#543c2a] transition ${className}`}
        >
            {text}
        </Link>
    );
}
