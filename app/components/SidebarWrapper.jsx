"use client";

import { useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "./sidebar";

function subscribe(callback) {
    window.addEventListener("storage", callback);
    window.addEventListener("auth-change", callback);
    window.addEventListener("focus", callback);
    return () => {
        window.removeEventListener("storage", callback);
        window.removeEventListener("auth-change", callback);
        window.removeEventListener("focus", callback);
    };
}

function getSnapshot() {
    return localStorage.getItem("id");
}

function getServerSnapshot() {
    return null;
}

export default function SidebarWrapper() {
    const pathname = usePathname();
    const id = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

    const hideSidebar =
        pathname === "/login" || pathname === "/signup";

    if (!id || hideSidebar) {
        return null;
    }

    return <Sidebar />;
}
