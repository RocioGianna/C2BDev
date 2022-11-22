/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import PropTypes from "prop-types";
import { TextField, Autocomplete as MuiAutocomplete } from "@mui/material";
import { getIn } from "formik";

const Autocomplete = (props) => {
    const {
        field,
        form: { dirty, touched, errors, setFieldValue },
        options,
        getOptionLabel,
        textFieldProps,
        ...autoCompleteProps
    } = props;

    // Merge default textFieldProps with textFieldProps passed in the component
    const mergedTextFieldProps = {
        ...Autocomplete.defaultProps.textFieldProps,
        ...textFieldProps,
    };
    const errorText = getIn(errors, field.name);
    const touchedVal = getIn(touched, field.name);
    const hasError = touchedVal && errorText !== undefined;
    const isMultiple = autoCompleteProps.multiple;
    const isMultipleWithValue = isMultiple && field.value;
    const canBeRendered = !isMultiple || isMultipleWithValue;

    if (isMultiple && field.value === null) {
        // eslint-disable-next-line no-console
        console.error(`Initial value of autocomplete with name: "${field.name}" cannot be null. Use [] instead.`);
    }

    return <>{canBeRendered && <MuiAutocomplete options={options} getOptionLabel={getOptionLabel} onChange={(_, value) => setFieldValue(field.name, value)} value={field.value} isOptionEqualToValue={(option, val) => option.value === val.value} renderInput={(params) => <TextField {...params} error={hasError} helperText={hasError ? errorText : ""} {...mergedTextFieldProps} />} {...autoCompleteProps} />}</>;
};

Autocomplete.defaultProps = {
    getOptionLabel: (option) => option.label,
    textFieldProps: {
        required: false,
        fullWidth: true,
        margin: "normal",
    },
};

export default Autocomplete;
