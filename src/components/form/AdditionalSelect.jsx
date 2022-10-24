import React, { useState } from "react";
import { Box, InputLabel, Select, MenuItem, FormControl } from "@mui/material";
import FormSelect from "./FormSelect";

export default function AdditionalSelect({ avaibleAdditionals, index, disabled, name }) {
    const [additionalType, setAdditionalType] = useState(true);

    const handleTypeChange = (event) => {
        setAdditionalType(event.target.value);
    };

    return (
        <Box sx={{ display: "flex", width: "100%" }}>
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
        </Box>
    );
}
