import React, { useState } from "react";
import { FieldArray, useField } from "formik";
import { Button, Box, MenuItem, Select, InputLabel, FormControl, IconButton } from "@mui/material";
import FormSelect from "./FormSelect";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import AdditionalSelect from "./AdditionalSelect";

export default function AdditionalsFieldArray({ disabled, name, avaibleAdditionals }) {
    const [field] = useField(name);

    const lastIsEmpty = () => {
        const lastValue = field.value[field.value.length - 1];
        return lastValue == "";
    };

    return (
        <>
            <FieldArray name="additionals">
                {({ push, remove }) => (
                    <Box sx={{ width: "100%", mt: 2 }}>
                        {field.value.map((_, index) => (
                            <Box key={index} sx={{ mt: 2, display: "flex", width: "100%" }}>
                                <Box sx={{ width: "90%" }}>
                                    <AdditionalSelect name={name} avaibleAdditionals={avaibleAdditionals} index={index} disabled={disabled} />
                                </Box>
                                <Box sx={{ flexGrow: 0, width: "10%", flexShrink: 0, display: "flex", justifyContent: "center" }}>
                                    <IconButton sx={{}} onClick={() => remove(index)} variant="contained">
                                        <DeleteIcon color="primary" />
                                    </IconButton>
                                </Box>
                            </Box>
                        ))}
                        <Button sx={{ mt: 1 }} size="large" variant="outlined" color="primary" onClick={() => push("")} disabled={disabled || lastIsEmpty()}>
                            <AddIcon />
                        </Button>
                    </Box>
                )}
            </FieldArray>
        </>
    );
}
