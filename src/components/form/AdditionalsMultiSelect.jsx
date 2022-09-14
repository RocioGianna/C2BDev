import React from "react";
import { FieldArray, useField } from "formik";
import { Grid, Button, Typography, Box } from "@mui/material";
import FormSelectFieldArray from "./FormSelectFieldArray";
import { height } from "@mui/system";

export default function AdditionalsMultiSelect({
    disabled,
    name,
    children,
    title,
}) {
    const [field, meta, helpers] = useField(name);

    const lastIsEmpty = () => {
        const lastValue = field.value[field.value.length - 1];
        return lastValue == "";
    };

    return (
        <>
            <Typography
                variant="h6"
                align="center"
                component="h2"
                sx={{ m: 2 }}
            >
                {title}
            </Typography>
            <FieldArray name="additionals">
                {({ push, remove }) => (
                    <>
                        {field.value.map((_, index) => (
                            <Box
                                key={index}
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                }}
                            >
                                <Box
                                    sx={{
                                        flexGrow: 1,
                                    }}
                                >
                                    <FormSelectFieldArray
                                        name={`${name}[${index}]`}
                                        label={"Adicionales"}
                                        disabled={disabled}
                                    >
                                        {children}
                                    </FormSelectFieldArray>
                                </Box>
                                <Button
                                    sx={{
                                        width: "10%",
                                        m: 3,
                                    }}
                                    onClick={() => remove(index)}
                                    variant="contained"
                                >
                                    Borrar
                                </Button>
                            </Box>
                        ))}
                        <Button
                            onClick={() => push("")}
                            disabled={disabled || lastIsEmpty()}
                            variant="contained"
                        >
                            Agregar
                        </Button>
                    </>
                )}
            </FieldArray>
        </>
    );
}
