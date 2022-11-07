import { configureStore } from "@reduxjs/toolkit";
import sessionReducer from "./sessionSlice";
import productReducer from "./productSlice";
import formStepsReducer from "./formStepsSlice";
import notificactionReducer from "./notificactionSlice";
import operationsReducer from "./operationsSlice";

export const store = configureStore({
    reducer: {
        session: sessionReducer,
        products: productReducer,
        formSteps: formStepsReducer,
        notifications: notificactionReducer,
        operations: operationsReducer,
    },
});
