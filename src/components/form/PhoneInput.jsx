import React from "react";
import { Box, Grid } from "@mui/material";
import { Field } from "formik";
import { TextField } from "formik-material-ui";

export default function PhoneInput({
    phonePrefixName,
    phoneNumberName,
    disabled,
    props,
}) {
    return (
        <>
            <Box sx={{ display: "flex", width: "100%" }}>
                <Box sx={{ width: "25%" }}>
                    <Field
                        component={TextField}
                        fullWidth
                        name={phonePrefixName}
                        label="Caracteristica"
                        variant="outlined"
                        disabled={disabled}
                    />
                </Box>
                <Box sx={{ flexGrow: 1, pl: 1 }}>
                    <Field
                        component={TextField}
                        fullWidth
                        name={phoneNumberName}
                        label="Numero de telefono"
                        variant="outlined"
                        disabled={disabled}
                    />
                </Box>
            </Box>
        </>
    );
}
