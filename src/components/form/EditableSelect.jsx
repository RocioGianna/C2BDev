import React from "react";
import { Autocomplete } from "@mui/material";
import { Field } from "formik";

export function EditableSelect({ options, name, onInputChange, label, disabled, onChange }) {
    return (
        <Field
            name={name}
            disableClearable
            disabled={disabled}
            options={options || []}
            component={Autocomplete}
            getOptionLabel={(option) => (option ? option : "")}
            ListboxProps={{ style: { maxHeight: 200 } }}
            textFieldProps={{
                label: label,
                variant: "outlined",
            }}
            onInputChange={(event, value) => {
                onInputChange(event, value);
            }}
        />
    );
}
