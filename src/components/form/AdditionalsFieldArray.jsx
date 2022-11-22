import React from "react";
import { FieldArray, useField } from "formik";
import { Button, Box, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { EditableSelect } from "./EditableSelect";

export default function AdditionalsFieldArray({ disabled, name, availableAdditionals }) {
    const [field] = useField(name);

    const lastIsEmpty = () => field.value[field.value.length - 1] === "";

    if (!availableAdditionals) return null;

    const options = availableAdditionals
        .map((additional) => additional.options.map((option) => ({
                id: option.id, 
                label: `(${additional.name}) ${option.name}`, 
                popular: option.popular, 
                mobile: additional.name,
                steps: option.steps
            })))
        .flat()
        .sort((a, b) => {
            let sortValue = b.popular - a.popular;
            if (sortValue != 0) return sortValue;
            let isMobile = b.mobile === "Linea Movil";
            if (isMobile) return 1;
            return -1;
        });

    return (
        <>
            <FieldArray name="additionals">
                {({ push, remove }) => (
                    <Box sx={{ width: "100%", mt: 2 }}>
                        {field.value.map((_, index) => (
                            <Box key={index} sx={{ mt: 2, display: "flex", width: "100%" }}>
                                <Box sx={{ width: "90%" }}>
                                    <EditableSelect
                                        options={options}
                                        name={`${name}[${index}]`}
                                        disabled={disabled}
                                        label={`Adicional ${index + 1}`}
                                        getOptionLabel={(option) => option === "" ? option : option.label}
                                        onChange={(event, value) => {
                                            const additional = availableAdditionals
                                                .map((additional) => additional.options)
                                                .flat()
                                                .find((a) => a.id == value?.id);
                                            setFieldValue(`${name}[${index}]`, additional);
                                        }}
                                    />
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
