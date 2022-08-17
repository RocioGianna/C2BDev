import React from "react";
import { TextField } from "@mui/material";

function FormText(props) {
    return (
        <TextField
            id={props.id}
            name={props.name}
            label={props.label}
            value={props.value}
            onChange={props.onChange}
            error={Boolean(props.error)}
            disabled={!!props.disabled}
            type={props.type}
            helperText={props.helperText}
            variant="outlined"
            fullWidth
            margin="normal"
        />
    );
}

export default FormText;
