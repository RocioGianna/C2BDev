import { configureStore } from "@reduxjs/toolkit";
import sessionReducer from "./sessionSlice";
import productReducer from "./productSlice";
import formStepsReducer from "./formStepsSlice";

export const store = configureStore({
    reducer: {
        session: sessionReducer,
        products: productReducer,
        formSteps: formStepsReducer,
    },
});
