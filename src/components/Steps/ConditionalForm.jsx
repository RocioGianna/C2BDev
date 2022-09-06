import React, { useState } from "react";
import { Grid } from "@mui/material";
import { Field } from "formik";
import { CheckboxWithLabel } from "formik-material-ui";

export default function ConditionalForm({ children, ...props }) {
    const [conditionalField, setConditionalField] = useState(props.fieldValue);

    return (
        <>
            <Grid item xs={12}>
                <Field
                    name="conditionalField"
                    type="checkbox"
                    component={CheckboxWithLabel}
                    onClick={() => setConditionalField(!conditionalField)}
                    Label={{
                        label: props.label,
                    }}
                />
            </Grid>
            {conditionalField && children}
        </>
    );
}
