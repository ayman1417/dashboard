"use client";
import Link from 'next/link'
import React from 'react'
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import { useRouter } from "next/navigation";
import { ChartColumnIncreasingIcon, LayoutGrid, LogOut, TableOfContents } from 'lucide-react';

export default function Sidebar() {

    const router = useRouter()

    function Logout() {

        router.replace("/login")
        localStorage.removeItem("id")

    }
    return (
        <aside className="bg-linear-to-r  md:w-[220px] px-2 fixed top-0 left-0 z-50 h-dvh from-secondary to-blue-950 text-gray-200 flex flex-col items-center  md:items-start p-5 gap-5 -h-dvh col-span-1 w-[50px]
          max-md:items-center
          max-md:px-2">
            <h1 className=" hidden text-xs md:text-lg md:block">My Dashbord</h1>
            <div className="flex flex-col justify-between h-full items-start  p-2 gap-5">
                <div className="flex flex-col items-start p-2 gap-5">
                    <Link className="text-xs md:text-lg flex items-center gap-1" href={"/"}>
                        <LayoutGrid />
                        <span className='hidden md:inline ' > Products </span>
                    </Link>
                    <Link className="text-xs md:text-lg flex items-center gap-1" href={"/statistics"}>
                        <ChartColumnIncreasingIcon />
                        <span className='hidden md:inline '>statistics</span>
                    </Link>
                </div>
                {/* <div className="flex gap-1"> */}
                <button onClick={Logout} className=" text-center md:mb-16 ml-2 flex items-center gap-1  text-xs md:text-md mt-[100%] bg-red-500 hover:bg-red-600 duration-200  font-semibold text-white p-2 rounded-md cursor-pointer" >
                    <LogOut size={15} />
                    <span className='hidden md:inline'>Logout</span>
                </button>
                {/* </div> */}
                {/* <Link className="text-xs md:text-lg" href={"/signup"}>SignUp</Link> */}
            </div>
        </aside>
    )
}
