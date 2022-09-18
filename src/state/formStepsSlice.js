import { createSlice } from "@reduxjs/toolkit";
import ProductStepBundle from "../components/Steps/ProductStep";
import ClientDataStepBundle from "../components/Steps/ClientDataStep";
import FirstStepBundle from "../components/Steps/FirstStep"; // lastStep

const initialState = [ProductStepBundle, ClientDataStepBundle, FirstStepBundle];

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
