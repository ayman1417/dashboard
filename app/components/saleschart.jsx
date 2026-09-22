"use client";
import React from 'react'
import products from "../data/products.json"
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

const data = [
    { month: "Jan", sales: 1200 },
    { month: "Feb", sales: 1800 },
    { month: "Mar", sales: 1400 },
    { month: "Apr", sales: 2400 },
    { month: "May", sales: 2100 },
    { month: "Jun", sales: 3200 },
];


export default function SalesChart() {
    return (
        <div className="w-full rounded-xl bg-white p-6 shadow">
            <h2 className="mb-5 text-xl font-semibold text-gray-800">
                Sales Overview
            </h2>

            <div className="md:h-[350px] h-[200px] w-full text-xs md:text-md">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>

                        <CartesianGrid strokeDasharray="3 3" />

                        <XAxis dataKey="month" />

                        <YAxis dataKey="sales" />

                        <Tooltip />

                        <Line
                            type="monotone"
                            dataKey="sales"
                            stroke="#2563eb"
                            strokeWidth={2}
                            dot={{ r: 4 }}
                        />

                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}