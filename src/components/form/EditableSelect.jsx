import React from "react";
import { Field } from "formik";
import Autocomplete from "../form/Autocomplete";

export function EditableSelect({ getOptionLabel, options, name, onInputChange, label, disabled, onChange }) {
    return (
        <Field
            name={name}
            disableClearable
            disabled={disabled}
            options={options || [""]}
            component={Autocomplete}
            getOptionLabel={getOptionLabel ? getOptionLabel : (option) => (option)}
            ListboxProps={{ style: { maxHeight: 200 } }}
            textFieldProps={{
                label: label,
                variant: "outlined",
            }}
            onInputChange={(event, value) => {
                if (onInputChange) onInputChange(event, value);
            }}
        />
    );
}
