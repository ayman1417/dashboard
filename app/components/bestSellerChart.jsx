
"use client";

import React from "react";
import products from "../data/products.json";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function BestSellerChart() {
  const categoryData = Object.values(
    products.reduce((acc, product) => {
      const category = product.category;

      if (!acc[category]) {
        acc[category] = {
          category: category,
          totalPrice: 0,
        };
      }

      acc[category].totalPrice += product.price;

      return acc;
    }, {})
  );

  const bestSellerCategories = categoryData
    .sort((a, b) => b.totalPrice - a.totalPrice)
    .slice(0, 5);

  return (
    <div className="w-full rounded-xl bg-white p-6 shadow">
      <h2 className="mb-5 text-xl font-semibold text-gray-800">
        Best Seller Categories
      </h2>

      <div className="h-[200px] md:h-[350px] w-full text-xs md:text-md">
        <ResponsiveContainer width="100%" height="100%" className={" text-xs md:text-md"}>
          <BarChart
            data={bestSellerCategories}
            margin={{
              top: 5,
              right: 20,
              left: 0,
              bottom: 5,
            }}
            
          >
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="category" />

            <YAxis />

            <Tooltip />

            <Legend />

            <Bar
              dataKey="totalPrice"
              name="Total Price"
              fill="#2563eb"
              barSize={40}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}