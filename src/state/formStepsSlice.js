import { createSlice } from "@reduxjs/toolkit";

const initialState = ["PRODUCT_STEP", "CLIENT_STEP", "LAST_STEP"];

export const formStepsSlice = createSlice({
    name: "formSteps",
    initialState,
    reducers: {
        addStep: (prev, action) => {
            prev.splice(prev.length - 1, 0, action.payload);
        },
        reset: (prev) => {
            prev = initialState;
        },
    },
});

export const { addStep, reset } = formStepsSlice.actions;

export default formStepsSlice.reducer;
