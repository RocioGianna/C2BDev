import React, { useEffect } from "react";
import { Grid } from "@mui/material";
import { Field } from "formik";
import { CheckboxWithLabel } from "formik-material-ui";
import { useField } from "formik";

export default function ConditionalForm({ children, ...props }) {
    const [conditionalField, setConditionalField] = React.useState(
        props.fieldValue
    );

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
