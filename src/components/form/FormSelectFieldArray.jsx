import React from "react";

import { FormControl, Box } from "@mui/material";
import { Select, InputLabel, FormHelperText } from "@mui/material";
import { Field, ErrorMessage } from "formik";
import { TextField } from "formik-mui";

export default function FormSelectFieldArray({
    name,
    children,
    label,
    disabled,
}) {
    return (
        <Field
            component={TextField}
            type="text"
            select
            fullWidth
            name={name}
            label={label}
            disabled={disabled}
            variant="outlined"
            margin="normal"
            sx={{ height: "100%" }}
            InputLabelProps={{
                shrink: true,
            }}
        >
            {children}
        </Field>
    );
}
