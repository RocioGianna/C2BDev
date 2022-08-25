import React from "react";
import * as yup from "yup";

const validationSchema = yup.object().shape({});

function FirstStep() {
    return <div>firstStep</div>;
}

export default {
    ValidationSchema: validationSchema,
    ReactComponent: FirstStep,
    Label: "Primer paso",
};
