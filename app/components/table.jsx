"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { ArrowDownUp, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { filterByCategory, sortByPrice, sortByStock } from "../redux/productsSlice";
import * as XLSX from "xlsx";
import html2pdf from "html2pdf.js";
import ProductsPdf from "./ProductsPdf";

const FALLBACK_IMAGE = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Crect width='18' height='18' x='3' y='3' rx='2' ry='2'/%3E%3Ccircle cx='9' cy='9' r='2'/%3E%3Cpath d='m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21'/%3E%3C/svg%3E";

export default function Table() {
    const dispatch = useDispatch();

    const products = useSelector(
        (state) => state.products.products
    );
    const [categoryOpen, setCategoryOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const productsInPage = 30;
    const totalPages = Math.max(1, Math.ceil(products.length / productsInPage));
    const startIndex = (currentPage - 1) * productsInPage;
    const currentProducts = products.slice(startIndex, startIndex + productsInPage);
    const tableRef = useRef(null);
    const [loading, setLoading] = useState(false);

    function priceSortProducts() {
        dispatch(sortByPrice());
    }

    function stockSortProducts() {
        dispatch(sortByStock());
    }

    function nextPage() {
        if (currentPage < totalPages) {
            setCurrentPage((prev) => prev + 1);
        }
    }
    function previousPage() {
        if (currentPage > 1) {
            setCurrentPage((prev) => prev - 1);
        }
    }

    function categoryFilter(categoryType) {
        dispatch(filterByCategory(categoryType));
        setCurrentPage(1);
        setCategoryOpen(false);
    }

    function excelDownload() {
        const excelData = currentProducts.map((p) => ({
            Product: p.title,
            Category: p.category,
            Price: p.price,
            Stock: p.stock,
            "Created Date": new Date(p.createdAt).toLocaleDateString(),
        }));

        const worksheet = XLSX.utils.json_to_sheet(excelData);
        const workbook = XLSX.utils.book_new();

        XLSX.utils.book_append_sheet(
            workbook,
            worksheet,
            "Products"
        );

        XLSX.writeFile(
            workbook,
            "products-report.xlsx"
        );
    }

    async function pdfDownload() {
        setLoading(true);

        await new Promise((resolve) => setTimeout(resolve, 300));

        try {
            await html2pdf()
                .set({
                    margin: 10,
                    filename: "products-report.pdf",
                    image: { type: "jpeg", quality: 0.98 },
                    html2canvas: { scale: 2 },
                    jsPDF: {
                        unit: "mm",
                        format: "a4",
                        orientation: "landscape",
                    },
                })
                .from(tableRef.current)
                .save();
        } finally {
            setLoading(false);
        }
    }

    function getImageUrl(url, id) {
        if (!url || url.includes("loremflickr.com")) {
            return `https://picsum.photos/seed/${id}/400/400`;
        }
        return url;
    }

    return (
        <div>
            <div className="flex gap-3">
                <button
                    style={{
                        backgroundColor: "#ef4444",
                        color: "#ffffff",
                        padding: "8px 16px",
                        borderRadius: "6px",
                        fontWeight: "600",
                        border: "none",
                        cursor: loading ? "not-allowed" : "pointer",
                        opacity: loading ? 0.7 : 1,
                    }}
                    type="button"
                    onClick={pdfDownload}
                >
                    {loading ? "Generating PDF..." : "Download PDF"}
                </button>
                <button
                    className="bg-green-500 hover:bg-green-600 duration-200 rounded-md p-2 text-white cursor-pointer md:text-md text-sm font-semibold"
                    type="button"
                    onClick={excelDownload}
                >
                    Download Excel
                </button>
            </div>
            <div className="overflow-x-auto">
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

                            <th className="px-5 py-4 text-left text-sm font-semibold text-gray-600">
                                <div className="flex items-center gap-2">
                                    <span>Price</span>
                                    <button onClick={priceSortProducts} className="cursor-pointer">
                                        <ArrowDownUp size={14} strokeWidth={2} color="#030303" />
                                    </button>
                                </div>
                            </th>

                            <th className="px-5 py-4 text-left text-sm font-semibold text-gray-600">
                                <div className="flex items-center gap-2">
                                    <span>stock</span>
                                    <button onClick={stockSortProducts} className="cursor-pointer">
                                        <ArrowDownUp size={14} strokeWidth={2} color="#030303" />
                                    </button>
                                </div>
                            </th>

                            <th className="px-5 py-4 text-left text-sm font-semibold text-gray-600">
                                Created Date
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {currentProducts.map((product) => (
                            <tr
                                key={product.id}
                                className="border-b border-2 border-gray-100 duration-200 hover:bg-gray-100"
                            >
                                <td className="px-5 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="h-12 w-12 overflow-hidden rounded-sm md:rounded-lg bg-gray-100 relative">
                                            <Image
                                                src={getImageUrl(product.image, product.id)}
                                                alt={product.title}
                                                width={48}
                                                height={48}
                                                unoptimized
                                                className="h-full w-full object-cover"
                                                onError={(e) => {
                                                    e.currentTarget.src = FALLBACK_IMAGE;
                                                }}
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
                                {product.stock === 0 ? (
                                    <td className="px-5 py-4 text-sm text-red-500 font-bold">
                                        {product.stock}
                                    </td>
                                ) : (
                                    <td className="px-5 py-4 text-sm text-gray-800 font-bold">
                                        {product.stock}
                                    </td>
                                )}

                                <td className="px-5 py-4 text-sm text-gray-600">
                                    {product.createdAt}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="flex gap-5 items-center justify-end p-5">
                    {currentPage === 1 ? (
                        <button className="flex gap-1 items-center justify-center cursor-pointer" disabled={currentPage === 1} onClick={previousPage}>
                            <ChevronLeft className="mt-0.5" size={20} color="#bdbdbd" strokeWidth={2} />
                            <span className="font-bold text-[#bdbdbd]">Previous </span>
                        </button>
                    ) : (
                        <button className="flex gap-1 items-center justify-center cursor-pointer" disabled={currentPage === 1} onClick={previousPage}>
                            <ChevronLeft className="mt-0.5" size={20} color="#0F172A" strokeWidth={2} />
                            <span className="font-bold text-secondary">Previous </span>
                        </button>
                    )}

                    <div className="bg-primary p-1 px-3 rounded-sm text-white font-semibold">{currentPage}</div>

                    {currentPage === totalPages ? (
                        <button className="flex gap-1 items-center justify-center cursor-pointer" disabled={currentPage === totalPages} onClick={nextPage}>
                            <span className="font-bold text-[#bdbdbd]">Next </span>
                            <ChevronRight className="mt-0.5" size={20} color="#bdbdbd" strokeWidth={2} />
                        </button>
                    ) : (
                        <button className="flex gap-1 items-center justify-center cursor-pointer" disabled={currentPage === totalPages} onClick={nextPage}>
                            <span className="font-bold text-secondary">Next </span>
                            <ChevronRight className="mt-0.5" size={20} color="#0F172A" strokeWidth={2} />
                        </button>
                    )}
                </div>
            </div>
            <div
                ref={tableRef}
                style={{
                    display: loading ? "block" : "none",
                }}
            >
                <ProductsPdf products={currentProducts} />
            </div>
        </div>
    );
}
