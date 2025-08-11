"use client";
import {useSession} from "next-auth/react";
import React, {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import LinkButton from "@/components/ui/LinkButton";

export default function SellerRegister() {
    const {status} = useSession();
    const router = useRouter();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [shopName, setShopName] = useState("");
    const [description, setDescription] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        if (status === "authenticated") {
            router.replace("/seller");
        }
    }, [status, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }
        setError("");
        setSuccess("");
        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email,
                    password,
                    fullName,
                    shopName,
                    description
                })
            });
            const data = await res.json();
            if (res.ok) {
                setSuccess("Registration successful! You can now log in, waiting to redirect...");
                setFullName(""); setEmail(""); setShopName(""); setDescription(""); setPassword(""); setConfirmPassword("");
                setTimeout(() => router.push("/auth/login"), 5000);
            } else {
                setError(data.error || "Registration failed");
            }
        } catch (err) {
            console.error("Registration error:", err);
            setError("Registration failed");
        }
    };

    return (
        <div className="bg-[#F9F5F0] text-[#333333] min-h-screen">
            <div className="container mx-auto px-4 py-2">
                <header className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-[#6B4F3B] mb-2">Seller Registration</h1>
                    <p className="text-xl text-[#6B4F3B]">Become a seller and share your handmade creations with the
                        world!</p>
                </header>
                <section className="mb-12">
                    <div className="max-w-2xl mx-auto">
                        <form className="flex flex-col gap-4 bg-white p-8 rounded-lg shadow-md"
                              onSubmit={handleSubmit}
                                autoComplete="off">
                            <input type="text" placeholder="Full Name" className="border rounded px-3 py-2" required
                                   autoComplete="new-name" value={fullName} onChange={e => setFullName(e.target.value)}/>
                            <input type="email" placeholder="Email" className="border rounded px-3 py-2" required
                                   autoComplete="new-email" value={email} onChange={e => setEmail(e.target.value)}/>
                            <input type="text" placeholder="Shop Name" className="border rounded px-3 py-2" required
                                   autoComplete="new-shop-name" value={shopName} onChange={e => setShopName(e.target.value)}/>
                            <textarea placeholder="Short Bio / Description" className="border rounded px-3 py-2"
                                      rows={3} required value={description} onChange={e => setDescription(e.target.value)}></textarea>
                            <input type="password" placeholder="Password" className="border rounded px-3 py-2" required
                                   autoComplete="new-password" value={password} onChange={e => setPassword(e.target.value)}/>
                            <input type="password" placeholder="Confirm Password" className="border rounded px-3 py-2"
                                   required  autoComplete="new-password" value={confirmPassword}
                                   onChange={e => setConfirmPassword(e.target.value)}/>
                            {error && <div className="text-red-600 text-sm">{error}</div>}
                            {success && <div className="text-green-600 text-sm">{success}</div>}
                            <button type="submit"
                                    className="bg-[#6B4F3B] text-white px-4 py-2 rounded hover:bg-[#543c2a]">Register
                            </button>
                        </form>
                    </div>
                </section>
                <div className="flex justify-center mt-8">
                    <LinkButton text="Back to Home"/>
                </div>
            </div>
        </div>
    );
}
