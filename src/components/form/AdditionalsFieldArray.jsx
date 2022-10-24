import React, { useState } from "react";
import { FieldArray, useField } from "formik";
import { Button, Box, MenuItem, Select, InputLabel, FormControl, IconButton } from "@mui/material";
import FormSelect from "./FormSelect";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

export default function AdditionalsFieldArray({ disabled, name, avaibleAdditionals }) {
    const [field] = useField(name);
    const [additionalType, setAdditionalType] = useState(true);

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
                    <Box sx={{ width: "100%", mt: 2 }}>
                        {field.value.map((_, index) => (
                            <Box key={index} sx={{ mt: 2, display: "flex", width: "100%" }}>
                                <Box
                                    sx={{
                                        width: "30%",
                                    }}
                                >
                                    <FormControl fullWidth>
                                        <InputLabel id="select-label">Tipo de adicional</InputLabel>
                                        <Select labelId="select-label" id="algo" label="Tipo de adicional" value={additionalType} onChange={handleTypeChange}>
                                            <MenuItem key={1} value={true}>
                                                Popular
                                            </MenuItem>
                                            <MenuItem key={2} value={false}>
                                                No popular
                                            </MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>
                                <Box
                                    sx={{
                                        pl: 1,
                                        width: "60%",
                                    }}
                                >
                                    <FormSelect name={`${name}[${index}]`} label={"Adicional " + (index + 1)} disabled={disabled || additionalType == undefined}>
                                        {avaibleAdditionals.map((a) => {
                                            return a.options
                                                .filter((o) => o.popular == additionalType)
                                                .map((o) => (
                                                    <MenuItem key={o.id} value={o}>
                                                        <strong>{a.name}</strong>: {o.name}
                                                    </MenuItem>
                                                ));
                                        })}
                                    </FormSelect>
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
