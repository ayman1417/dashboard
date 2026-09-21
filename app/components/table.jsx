"use client";
import React from 'react'
import Link from "next/link";
import data from "../data/products.json";
import { ArrowDownUp, ChevronDown, ChevronLeft, ChevronRight, MoveDown, MoveUp } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterByCategory, sortByPrice, resetProducts, sortByStock } from "../redux/productsSlice";
import { useRouter } from "next/navigation";


export default function Table({ }) {


    const dispatch = useDispatch();

    const products = useSelector(
        (state) => state.products.products
    );
    const [categoryOpen, setCategoryOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const productsInPage = 30;
    const totalPages = 5;
    const startIndex = (currentPage - 1) * productsInPage;
    const currentProducts = products.slice(startIndex, startIndex + productsInPage);




    function priceSortProducts() {
        dispatch(sortByPrice())
    }

    function stockSortProducts() {
        dispatch(sortByStock())
    }

    function nextPage() {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    }
    function previousPage() {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    }

    function categoryFilter(categoryType) {
        dispatch(filterByCategory(categoryType));
        setCurrentPage(1);
        setCategoryOpen(false);
    }

    return (
        <div className="min-h-dvh p-5  ml-[15%] ">


            <div className=" overflow-x-auto">
                <table className="w-full border-collapse mb-5">

                    <thead>
                        <tr className="border-b border-gray-200 bg-gray-50">
                            <th className="px-5 py-4 text-left text-sm font-semibold text-gray-600">
                                Product
                            </th>

                            <th className="px-5 py-4 text-left text-sm font-semibold text-gray-600 relative">
                                <button
                                    onClick={() => setCategoryOpen(!categoryOpen)}
                                    className="flex items-center gap-2 cursor-pointer"
                                >
                                    Category
                                    <ChevronDown size={16} />
                                </button>

                                {categoryOpen && (
                                    <div className="absolute left-5 top-14 z-50 w-40 rounded-lg border border-gray-200 bg-white p-2 shadow-lg">
                                        <button onClick={() => categoryFilter("all")} className="w-full rounded-md px-3 py-2 text-left hover:bg-gray-100">
                                            All
                                        </button>

                                        <button onClick={() => categoryFilter("Shoes")} className="w-full rounded-md px-3 py-2 text-left hover:bg-gray-100">
                                            Shoes
                                        </button>

                                        <button onClick={() => categoryFilter("Clothing")} className="w-full rounded-md px-3 py-2 text-left hover:bg-gray-100">
                                            Clothing
                                        </button>
                                        <button onClick={() => categoryFilter("Sports")} className="w-full rounded-md px-3 py-2 text-left hover:bg-gray-100">
                                            Sports
                                        </button>
                                        <button onClick={() => categoryFilter("Home")} className="w-full rounded-md px-3 py-2 text-left hover:bg-gray-100">
                                            Home
                                        </button>

                                        <button onClick={() => categoryFilter("Electronics")} className="w-full rounded-md px-3 py-2 text-left hover:bg-gray-100">
                                            Electronics
                                        </button>
                                    </div>
                                )}
                            </th>

                            <th className="px-5 py-4 text-left text-sm font-semibold text-gray-600   ">
                                <div className=" flex items-center gap-2">
                                    <span>Price</span>
                                    <button onClick={priceSortProducts} className="cursor-pointer  ">
                                        <ArrowDownUp size={14} strokeWidth={2} color="#030303" className="" />
                                    </button>
                                </div>
                            </th>

                            <th className="px-5 py-4 text-left text-sm font-semibold text-gray-600 ">
                                <div className=" flex items-center gap-2">
                                    <span>stock</span>
                                    <button onClick={stockSortProducts} className="cursor-pointer  ">
                                        <ArrowDownUp size={14} strokeWidth={2} color="#030303" className="" />
                                    </button>
                                </div>
                            </th>


                            <th className="px-5 py-4 text-left text-sm font-semibold text-gray-600">
                                Created Date
                            </th>
                        </tr>
                    </thead>

                    <tbody className="">


                        {currentProducts.map((product) => (

                            <tr key={product.id}
                                className="border-b border-2 border-gray-100 duration-200  hover:bg-gray-100">
                                {/* Product */}
                                <td className="px-5 py-4">
                                    <div className="flex items-center gap-3">

                                        <div className="h-12 w-12 overflow-hidden rounded-sm md:rounded-lg bg-gray-100">
                                            <img
                                                src={product.image}
                                                alt={product.title}
                                                className="h-full w-full object-cover"
                                            />
                                        </div>

                                        <span className="font-medium md:text-md text-sm text-gray-800">
                                            {product.title}
                                        </span>

                                    </div>
                                </td>

                                <td className="px-5 py-4 text-sm text-gray-600">
                                    {product.category}
                                </td>

                                <td className="px-5 py-4 text-sm font-medium text-gray-800">
                                    ${product.price}
                                </td>
                                {product.stock == 0 ?
                                    <td className="px-5 py-4 text-sm text-red-500 font-bold ">
                                        {product.stock}
                                    </td>
                                    :
                                    <td className="px-5 py-4 text-sm text-gray-800 font-bold">
                                        {product.stock}
                                    </td>
                                }

                                <td className="px-5 py-4 text-sm text-gray-600">
                                    {product.createdAt}
                                </td>

                            </tr>))}


                    </tbody>

                </table>
                <div className="flex gap-5 items-center   justify-end p-5">
                    {currentPage === 1 ?
                        <button className="flex gap-1 items-center justify-center cursor-pointer " disabled={currentPage === 1} onClick={previousPage}>
                            <ChevronLeft className="mt-0.5" size={20} color="#bdbdbd" strokeWidth={2} />
                            <span className="font-bold text-[#bdbdbd] ">Previous </span>
                        </button>
                        :
                        <button className="flex gap-1 items-center justify-center cursor-pointer " disabled={currentPage === 1} onClick={previousPage}>
                            <ChevronLeft className="mt-0.5" size={20} color="#0F172A" strokeWidth={2} />
                            <span className="font-bold text-secondary">Previous </span>
                        </button>
                    }

                    <div className="bg-primary p-1 px-3 rounded-sm text-white font-semibold">{currentPage}</div>

                    {
                        currentPage === totalPages ?
                            <button className="flex gap-1 items-center justify-center cursor-pointer " disabled={currentPage === totalPages} onClick={nextPage}>
                                <span className="font-bold text-[#bdbdbd]">Next </span>
                                <ChevronRight className="mt-0.5" size={20} color="#bdbdbd" strokeWidth={2} />
                            </button>
                            :
                            <button className="flex gap-1 items-center justify-center cursor-pointer " disabled={currentPage === totalPages} onClick={nextPage}>
                                <span className="font-bold text-secondary">Next </span>
                                <ChevronRight className="mt-0.5" size={20} color="#0F172A" strokeWidth={2} />
                            </button>
                    }

                </div>
            </div>
        </div>

    )
}
