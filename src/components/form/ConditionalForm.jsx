import React, { useState } from "react";
import { Grid } from "@mui/material";
import { Field, useField } from "formik";
import { CheckboxWithLabel } from "formik-material-ui";

export default function ConditionalForm({ children, name, ...props }) {
    const [phoneCheckbox] = useField(name);

    const value = phoneCheckbox.value;
    // const [conditionalField, setConditionalField] = useState(value);

    console.log(name);

    return (
        <>
            <Grid item xs={12}>
                <Field
                    name={name}
                    type="checkbox"
                    component={CheckboxWithLabel}
                    // onClick={() => setConditionalField(!conditionalField)}
                    Label={{
                        label: props.label,
                    }}
                />
            </Grid>
            {value && children}
        </>
    );
}
