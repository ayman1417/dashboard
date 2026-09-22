"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProtectedRoute({ children }) {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const id = localStorage.getItem("id");

        if (!id) {
            router.replace("/login");
            return;
        }
        
        setLoading(false);
    }, [router]);
    
    if (loading) {
        return (
            <div className="min-h-dvh flex items-center justify-center">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600" />
            </div>
        );
    }

    return children;
}