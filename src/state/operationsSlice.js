import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    operations: null,
};

export const operationsSlice = createSlice({
    name: "operations",
    initialState,
    reducers: {
        operationsFetched: (prev, action) => {
            prev.operations = action.payload;
            return prev
        },
    },
});

export const { operationsFetched } = operationsSlice.actions;

export default operationsSlice.reducer;
