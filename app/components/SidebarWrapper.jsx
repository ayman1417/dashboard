"use client";

import { usePathname } from "next/navigation";
import Sidebar from "./sidebar";

export default function SidebarWrapper() {
    const pathname = usePathname();

    const hideSidebar =
        pathname === "/login" || pathname === "/signup";

    if (hideSidebar) {
        return null;
    }

    return <Sidebar />;
}