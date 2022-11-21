import React from "react";
import { FieldArray, useField } from "formik";
import { Button, Box, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { EditableSelect } from "./EditableSelect";

export default function AdditionalsFieldArray({ disabled, name, avaibleAdditionals }) {
    const [field] = useField(name);

    const lastIsEmpty = () => field.value[field.value.length - 1] === "";

    if (!avaibleAdditionals) return null;

    const options = avaibleAdditionals
        .map((additional) => additional.options.map((option) => ({ id: option.id, label: `(${additional.name}) ${option.name}`, popular: option.popular, mobile: additional.name })))
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
                                        onInputChange={(event, value) => fetchOptions(value)}
                                        label="Codigo de colaborador"
                                        onChange={(event, value) => {
                                            const additional = avaibleAdditionals
                                                .map((additional) => additional.options)
                                                .flat()
                                                .find((a) => a.id == value?.id);
                                            setFieldValue(`${name}[${index}]`, additional || "");
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
