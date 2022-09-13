import React from "react";

import { FormControl } from "@mui/material";
import { Select, InputLabel, FormHelperText } from "@mui/material";
import { Field, ErrorMessage } from "formik";

export default function FormSelect({ name, children, label, disabled }) {
    return (
        <Field
            name={name}
            label={label}
            component={({ children, form, field, label }) => {
                const { name, value } = field;
                const { setFieldValue, errors, getFieldMeta } = form;

                const wasTouched = getFieldMeta(name).touched;

                return (
                    <FormControl
                        fullWidth
                        error={!!errors[name] && wasTouched && !disabled}
                        disabled={!!disabled}
                    >
                        <InputLabel id={name + "-label"}>{label}</InputLabel>
                        <Select
                            defaultValue=""
                            labelId={name + "-label"}
                            name={name}
                            label={label}
                            value={value}
                            onChange={(e) => {
                                console.log(e.target.value);
                                setFieldValue(name, e.target.value);
                            }}
                        >
                            {children}
                        </Select>
                        <FormHelperText>
                            <ErrorMessage name={name} />
                        </FormHelperText>
                    </FormControl>
                );
            }}
        >
            {children}
        </Field>
    );
}
