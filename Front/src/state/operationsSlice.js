import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    operations: null,
    permissions: null,
    statusMap: null,
    operation: null,
};

export const operationsSlice = createSlice({
    name: "operations",
    initialState,
    reducers: {
        operationsFetched: (prev, action) => {
            prev.operations = action.payload;
            return prev;
        },
        permissionsFetched: (prev, action) => {
            prev.permissions = action.payload;
            return prev;
        },
        statusMapFetched: (prev, action) => {
            prev.statusMap = action.payload;
            return prev;
        },
        operationFetched: (prev, action) => {
            prev.operation = action.payload;
            return prev;
        },
        updateOperation: (prev, action) => {
            prev.operations = prev.operations.map((op) => op.id === action.payload.id ? action.payload : op);
            return prev;
        },
        resetOperation: (prev) => {
            prev.operation = null;
            return prev;
        },
    },
});

export const { operationsFetched, permissionsFetched, statusMapFetched, operationFetched, updateOperation, resetOperation } = operationsSlice.actions;

export default operationsSlice.reducer;
