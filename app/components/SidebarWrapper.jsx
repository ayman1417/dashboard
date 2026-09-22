"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "./sidebar";

export default function SidebarWrapper() {
    const pathname = usePathname();
    const [id, setId] = useState(null);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);

        const checkId = () => {
            const storedId = localStorage.getItem("id");
            setId(storedId);
        };

        checkId();

        window.addEventListener("focus", checkId);

        return () => {
            window.removeEventListener("focus", checkId);
        };
    }, []);

    const hideSidebar =
        pathname === "/login" || pathname === "/signup";

    if (!isClient) {
        return null;
    }

    if (!id || hideSidebar) {
        return null;
    }

    return <Sidebar />;
}