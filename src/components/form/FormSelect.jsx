import React from "react";
import { Field } from "formik";
import { TextField } from "formik-mui";

export default function FormSelect({ name, children, label, disabled, small }) {
    return (
        <Field
            component={TextField}
            textFieldProps={{
                margin: small ? "none" : "normal",
            }}
            type="text"
            select
            fullWidth
            name={name}
            label={label}
            disabled={disabled}
            variant="outlined"
            size={small ? "small" : "medium"}
        >
            {children ? children : <div></div>}
        </Field>
    );
}
