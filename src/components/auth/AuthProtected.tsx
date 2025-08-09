"use client";
import React from "react";
import {useSession} from "next-auth/react";
import {useRouter} from "next/navigation";

function AuthProtected({children}: { children: React.ReactNode }) {
    const { status } = useSession();
    const router = useRouter();

    React.useEffect(() => {
        if (status === "unauthenticated") {
            router.replace("/auth/login");
        }
    }, [status, router]);

    if (status === "loading") return null;
    if (status === "unauthenticated") return null;
    return <>{children}</>;
}

export default AuthProtected;