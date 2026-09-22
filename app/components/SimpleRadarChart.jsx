"use client";

import React from "react";
import products from "../data/products.json";

import {
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    ResponsiveContainer,
    Tooltip,
} from "recharts";

export default function SimpleRadarChart() {
    const chartData = Object.values(
        products.reduce((acc, product) => {
            const category = product.category;

            if (!acc[category]) {
                acc[category] = {
                    category: category,
                    stock: 0,
                };
            }

            acc[category].stock += product.stock;

            return acc;
        }, {})
    );

    return (
        <div className="w-full rounded-xl bg-white p-6 shadow">
            <h2 className="mb-5 text-xl font-semibold text-gray-800">
                Stock by Category
            </h2>

            <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={chartData}>
                        <PolarGrid />

                        <PolarAngleAxis dataKey="category" />

                        <PolarRadiusAxis />

                        <Radar
                            name="Stock"
                            dataKey="stock"
                            fill="#2563eb"
                            fillOpacity={0.5}
                        />

                        <Tooltip />
                    </RadarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
