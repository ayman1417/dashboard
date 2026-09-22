"use client";

import { usePathname } from "next/navigation";
import Sidebar from "./sidebar";

export default function SidebarWrapper() {
    const pathname = usePathname();
    const id = localStorage.getItem("id");
    const hideSidebar = pathname === "/login" || pathname === "/signup";

    if (!id || hideSidebar) {
        localStorage.removeItem("id")
        return null;
    }
    return <Sidebar />;

}