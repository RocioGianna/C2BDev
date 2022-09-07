import React from "react";
import * as yup from "yup";

export function ProductStep() {
    return <div>ProductStep</div>;
}

const validationSchema = yup.object().shape({});

export default {
    ValidationSchema: validationSchema,
    ReactComponent: ProductStep,
    Label: "Producto",
};
