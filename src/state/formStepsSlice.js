import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    steps: ["PRODUCT_STEP", "CUSTOMER_STEP", "DOCUMENTATION_STEP"],
    phoneSteps: [],
};

export const formStepsSlice = createSlice({
    name: "formSteps",
    initialState,
    reducers: {
        addPhoneStep: (prev, action) => {
            prev.steps.splice(prev.steps.length - 1, 0, "PHONE_STEP");
            prev.phoneSteps.push(action.payload);
        },
        addStep: (prev, action) => {
            prev.steps.unshift(action.payload);
        },
        reset: (prev) => {
            prev = initialState;
            return prev;
        },
        resetPhoneSteps: (prev) => {
            prev.steps = prev.steps.filter((i) => i !== "PHONE_STEP");
            prev.phoneSteps = [];
            return prev;
        },
    },
});

export const { addStep, addPhoneStep, reset, resetPhoneSteps } = formStepsSlice.actions;

export default formStepsSlice.reducer;
