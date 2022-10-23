import React from "react";
import { Field } from "formik";
import { TextField } from "formik-mui";

export default function FormSelect({ name, children, label, disabled }) {
    return (
        <Field component={TextField} type="text" select fullWidth name={name} sx={{ maxWidth: "100%" }} label={label} disabled={disabled} variant="outlined">
            {children ? children : <div></div>}
        </Field>
    );
}
