import React from "react";
import { Box } from "@mui/material";
import { Field, useField, useFormikContext } from "formik";
import { TextField } from "formik-mui";

export default function PhoneInput({ phonePrefixName, phoneNumberName, disabled, props, small = false }) {
    const [field] = useField(phonePrefixName);
    const { setFieldValue } = useFormikContext();

    if (field.value != "" && field.value.length >= 1 && !field.value.startsWith("+")) {
        setFieldValue(`${phonePrefixName}`, "+" + field.value, true);
    }

    return (
        <>
            <Box sx={{ display: "flex", width: "100%", maxWidth: small ? 140 : undefined }}>
                <Box sx={{ minWidth: small ? "2pc" : "4pc", width: "25%", flexShrink: 0 }}>
                    {small ? (
                        <Field
                            sx={{ heigth: "100%", display: "flex", justifyContent: "end", flexDirection: "column" }}
                            InputProps={{
                                sx: {
                                    "& input": {
                                        textAlign: "center",
                                        fontSize: "0.875rem",
                                    },
                                },
                            }}
                            component={TextField}
                            name={phonePrefixName}
                            variant="standard"
                            disabled={disabled}
                            autoComplete="tel-country-code"
                            size="small"
                        />
                    ) : (
                        <Field component={TextField} fullWidth name={phonePrefixName} label="Prefijo" variant="outlined" disabled={disabled} autoComplete="tel-country-code" />
                    )}
                </Box>
                <Box sx={{ flexGrow: 1, pl: 1 }}>
                    {small ? (
                        <Field
                            sx={{ heigth: "100%", display: "flex", justifyContent: "end", flexDirection: "column" }}
                            InputProps={{
                                sx: {
                                    "& input": {
                                        textAlign: "center",
                                        fontSize: "0.875rem",
                                    },
                                },
                            }}
                            variant="standard"
                            size="small"
                            component={TextField}
                            fullWidth
                            name={phoneNumberName}
                            disabled={disabled}
                            autoComplete="tel-national"
                        />
                    ) : (
                        <Field component={TextField} fullWidth name={phoneNumberName} label="Numero de telefono" variant="outlined" disabled={disabled} autoComplete="tel-national" />
                    )}
                </Box>
            </Box>
        </>
    );
}
