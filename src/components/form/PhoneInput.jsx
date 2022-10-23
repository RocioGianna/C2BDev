import React from "react";
import { Box } from "@mui/material";
import { Field } from "formik";
import { TextField } from "formik-material-ui";

export default function PhoneInput({ phonePrefixName, phoneNumberName, disabled, props }) {
    return (
        <>
            <Box sx={{ display: "flex", width: "100%" }}>
                <Box sx={{ minWidth: "4pc", width: "25%", flexShrink: 0 }}>
                    <Field component={TextField} fullWidth name={phonePrefixName} label="Caracteristica" variant="outlined" disabled={disabled} autoComplete="tel-country-code" />
                </Box>
                <Box sx={{ flexGrow: 1, pl: 1 }}>
                    <Field component={TextField} fullWidth name={phoneNumberName} label="Numero de telefono" variant="outlined" disabled={disabled} autoComplete="tel-national" />
                </Box>
            </Box>
        </>
    );
}
