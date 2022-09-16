import React from "react";
import * as yup from "yup";
import DropZone from "../DropZone";

const validationSchema = yup.object().shape({});

export function DocumentationStep() {
    return (
        <>
            <DropZone name={"documentarionFiles"} />
        </>
    );
}

export default {
    ValidationSchema: validationSchema,
    ReactComponent: DocumentationStep,
    Label: "Documentacion",
};
