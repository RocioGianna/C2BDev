import React from "react";
import { FieldArray, useField } from "formik";
import { Button, Box } from "@mui/material";
import FormSelect from "./FormSelect";

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
                    <>
                        {field.value.map((_, index) => (
                            <Box sx={{ mt: 2 }} key={index}>
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
                                        <FormSelect
                                            name={`${name}[${index}]`}
                                            label={"Adicional " + (index + 1)}
                                            disabled={disabled}
                                        >
                                            {children}
                                        </FormSelect>
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
