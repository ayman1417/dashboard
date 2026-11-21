"use client";

import React from "react";

export default function ProductsPdf({ products = [] }) {
    return (
        <div style={styles.page}>
            <h1 style={styles.title}>Products Report</h1>
            <table style={styles.table}>
                <thead>
                    <tr>
                        <th style={styles.th}>Product</th>
                        <th style={styles.th}>Category</th>
                        <th style={styles.th}>Price</th>
                        <th style={styles.th}>Stock</th>
                        <th style={styles.th}>Created Date</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((p) => (
                        <tr key={p.id}>
                            <td style={styles.td}>{p.title}</td>
                            <td style={styles.td}>{p.category}</td>
                            <td style={styles.td}>${p.price.toFixed(2)}</td>
                            <td style={styles.td}>{p.stock}</td>
                            <td style={styles.td}>
                                {new Date(p.createdAt).toLocaleDateString()}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

const styles = {
    page: {
        padding: 24,
        background: "#ffffff",
        color: "#000000",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 16,
    },
    table: {
        width: "100%",
        borderCollapse: "collapse",
    },
    th: {
        textAlign: "left",
        padding: 8,
        fontSize: 11,
        background: "#eeeeee",
        border: "1px solid #dddddd",
    },
    td: {
        padding: 8,
        fontSize: 10,
        border: "1px solid #dddddd",
    },
};
