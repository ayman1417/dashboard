"use client";

import { useEffect, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";

function subscribe(callback) {
    window.addEventListener("storage", callback);
    window.addEventListener("auth-change", callback);
    return () => {
        window.removeEventListener("storage", callback);
        window.removeEventListener("auth-change", callback);
    };
}

function getSnapshot() {
    return localStorage.getItem("id");
}

function getServerSnapshot() {
    return "__server__";
}

export default function ProtectedRoute({ children }) {
    const router = useRouter();
    const id = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

    useEffect(() => {
        if (id === null) {
            router.replace("/login");
        }
    }, [id, router]);

    if (id === "__server__" || id === null) {
        return (
            <div className="min-h-dvh flex items-center justify-center">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600" />
            </div>
        );
    }

    return children;
}
