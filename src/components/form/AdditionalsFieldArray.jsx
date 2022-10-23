import React from "react";
import { FieldArray, useField } from "formik";
import { Box, Button, IconButton } from "@mui/material";
import FormSelect from "./FormSelect";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

export default function AdditionalsFieldArray({ disabled, name, children }) {
    const [field] = useField(name);

    const lastIsEmpty = () => {
        const lastValue = field.value[field.value.length - 1];
        return lastValue == "";
    };

    return (
        <>
            <FieldArray name="additionals">
                {({ push, remove }) => (
                    <Box sx={{ width: "100%" }}>
                        {field.value.map((_, index) => (
                            <Box sx={{ mt: 2, width: "100%" }} key={index}>
                                <Box
                                    key={index}
                                    sx={{
                                        display: "flex",
                                        width: "100%",
                                    }}
                                >
                                    <Box
                                        sx={{
                                            flexGrow: 1,
                                            width: "90%",
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                width: "100%",
                                            }}
                                        >
                                            <FormSelect name={`${name}[${index}]`} label={"Adicional " + (index + 1)} disabled={disabled}>
                                                {children}
                                            </FormSelect>
                                        </Box>
                                    </Box>
                                    <IconButton
                                        sx={{
                                            width: "10%",
                                            pl: 2,
                                        }}
                                        onClick={() => remove(index)}
                                        variant="contained"
                                    >
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
