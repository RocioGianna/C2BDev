import React from "react";
import { Box, Grid } from "@mui/material";
import { TextField } from "formik-material-ui";
import { Field } from "formik";
import { CheckboxWithLabel } from "formik-material-ui";

export default function ConditionalForm({ children, ...props }) {
    // State for conditional rendring of form
    const [conditionalField, setConditionalField] = React.useState(false);

    return (
        <div>
            <Field
                name="conditionalField"
                type="checkbox"
                component={CheckboxWithLabel}
                onClick={() => setConditionalField(!conditionalField)}
                Label={{
                    label: props.label,
                }}
            />
            {conditionalField && children}
        </div>
    );
}
