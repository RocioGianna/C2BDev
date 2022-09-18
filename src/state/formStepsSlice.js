import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    steps: ["PRODUCT_STEP", "CLIENT_STEP", "DOCUMENTATION_STEP"],
    phoneSteps: [],
};

export const formStepsSlice = createSlice({
    name: "formSteps",
    initialState,
    reducers: {
        addStep: (prev, action) => {
            prev.steps.splice(prev.steps.length - 1, 0, "PHONE_STEP");
            prev.phoneSteps.push(action.payload);
        },
        reset: (prev) => {
            prev = initialState;
        },
    },
});

export const { addStep, reset } = formStepsSlice.actions;

export default formStepsSlice.reducer;
