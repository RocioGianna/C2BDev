import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: null,
    additionals: null,
};

export const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        productsFetched: (prev, action) => {
            prev.products = action.payload;
        },
        additionalsFetched: (prev, action) => {
            prev.additionals = action.payload;
        },
    },
});

export const { productsFetched, additionalsFetched } = productSlice.actions;

export default productSlice.reducer;
