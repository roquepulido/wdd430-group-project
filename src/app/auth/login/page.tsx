"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function SellerLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulación de login sencillo
    if (email === "email@test.com" && password === "password") {
      setError("");
      router.push("/seller");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F9F5F0]">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold text-[#6B4F3B] mb-6 text-center">Seller Login</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            className="border rounded px-3 py-2"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="border rounded px-3 py-2"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          {error && <div className="text-red-600 text-sm">{error}</div>}
          <button
            type="submit"
            className="bg-[#6B4F3B] text-white px-4 py-2 rounded hover:bg-[#543c2a] font-bold"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

