import React, { useState } from "react";
import { FieldArray, useField } from "formik";
import {
    Button,
    Box,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
} from "@mui/material";
import FormSelect from "./FormSelect";

export default function AdditionalsFieldArray({
    disabled,
    name,
    avaibleAdditionals,
}) {
    const [field] = useField(name);
    const [additionalType, setAdditionalType] = useState("Linea Movil");

    const lastIsEmpty = () => {
        const lastValue = field.value[field.value.length - 1];
        return lastValue == "";
    };

    const handleTypeChange = (event) => {
        setAdditionalType(event.target.value);
    };

    return (
        <>
            <FieldArray name="additionals">
                {({ push, remove }) => (
                    <>
                        {field.value.map((_, index) => (
                            <Box
                                key={index}
                                sx={{
                                    mt: 2,
                                    display: "flex",
                                    alignItems: "center",
                                }}
                            >
                                <Box
                                    sx={{
                                        width: "30%",
                                    }}
                                >
                                    <FormControl fullWidth>
                                        <InputLabel id="select-label">
                                            Tipo de adicional
                                        </InputLabel>
                                        <Select
                                            labelId="select-label"
                                            id="algo"
                                            label="Tipo de adicional"
                                            value={additionalType}
                                            onChange={handleTypeChange}
                                        >
                                            <MenuItem
                                                key={1}
                                                value={"Linea Movil"}
                                            >
                                                Linea Movil
                                            </MenuItem>
                                            <MenuItem
                                                key={2}
                                                value={"TV Particular"}
                                            >
                                                TV Particular
                                            </MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>
                                <Box
                                    sx={{
                                        pl: 1,
                                        flexGrow: 1,
                                    }}
                                >
                                    <FormSelect
                                        name={`${name}[${index}]`}
                                        label={"Adicional " + (index + 1)}
                                        disabled={disabled || !additionalType}
                                    >
                                        {avaibleAdditionals.map((a) => {
                                            return a.options.map(
                                                (o) =>
                                                    a.name ===
                                                        additionalType && (
                                                        <MenuItem
                                                            key={o.id}
                                                            value={o}
                                                        >
                                                            <strong>
                                                                {a.name}
                                                            </strong>
                                                            : {o.name}
                                                        </MenuItem>
                                                    )
                                            );
                                        })}
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
