import Link from 'next/link'
import React from 'react'

export default function Sidebar() {
    return (
        <aside className="bg-linear-to-r  md:w-[220px] px-2 fixed top-0 left-0 z-50 h-dvh from-secondary to-blue-950 text-gray-200 flex flex-col items-center  md:items-start p-5 gap-5 -h-dvh col-span-1 w-[65px]
          max-md:items-center
          max-md:px-2">
            <Link href={"/"} className="text-xs md:text-lg md:block">Main Dashbord</Link>
            <div className="flex flex-col items-start p-2 gap-5">
                <Link className="text-xs md:text-lg" href={"/login"}>Login</Link>
                <Link className="text-xs md:text-lg" href={"/signup"}>SignUp</Link>
            </div>
        </aside>
    )
}
