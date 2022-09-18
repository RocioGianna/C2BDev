import React, { useState } from "react";
import { Grid } from "@mui/material";
import { Field } from "formik";
import { CheckboxWithLabel } from "formik-material-ui";

export default function ConditionalForm({ children, fieldValue, ...props }) {
    if (!fieldValue) return <></>;

    const name = fieldValue.name;
    const value = fieldValue.value;
    const [conditionalField, setConditionalField] = useState(value);

    return (
        <>
            <Grid item xs={12}>
                <Field
                    name={name}
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
