import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function FormSelectGroup({ additionals, disabled, name }) {
    return (
        <FormControl fullWidth>
            <InputLabel htmlFor="grouped-native-select">
                Agregar adicionales
            </InputLabel>
            <Select
                native
                defaultValue=""
                disabled={!!disabled}
                // value={value}
                id="grouped-native-select"
                label="Agregar adicionales"
            >
                <option aria-label="None" value="" />
                {additionals.map((a) => (
                    <optgroup key={a.id} label={a.name}>
                        {a.options.map((o) => (
                            <option key={o.id} value={o.id}>
                                {o.name}
                            </option>
                        ))}
                    </optgroup>
                ))}
            </Select>
        </FormControl>
    );
}
