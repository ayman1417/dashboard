import { createSlice } from "@reduxjs/toolkit";
import data from "../data/products.json";

const initialState = {
products: data,
priceSortAsc: true,
stockSortAsc: true,
};

const productsSlice = createSlice({
name: "products",
initialState,

initialState,

reducers: {
    filterByCategory: (state, action) => {
    const categoryType = action.payload;

    if (categoryType === "all") {
        state.products = data;
    } else {
        state.products = data.filter(
        (product) => product.category === categoryType,
        );
    }
    },

    sortByPrice: (state) => {
    state.products.sort((a, b) => {
        return state.priceSortAsc ? a.price - b.price : b.price - a.price;
    });

    state.priceSortAsc = !state.priceSortAsc;
    },

    sortByStock: (state) => {
    state.products.sort((a, b) => {
        return state.stockSortAsc ? a.stock - b.stock : b.stock - a.stock;
    });

    state.stockSortAsc = !state.stockSortAsc;
    },

    resetProducts: (state) => {
    state.products = data;
    state.priceSortAsc = true;
    state.stockSortAsc = true;
    },
},
});

export const { filterByCategory, sortByPrice, sortByStock, resetProducts } = productsSlice.actions;

export default productsSlice.reducer;
