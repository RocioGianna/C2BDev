import React from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import EditableValue from "../../inputs/EditableValue";
function TableCardRow({ label, value, editable, InputComponent, inputProps }) {
    return (
        <Stack direction="row" spacing={1} sx={{ justifyContent: "space-between", width: "100%", py: 0.5, px: 1 }}>
            <Typography variant="body1" color="text.secondary" sx={{ flexShrink: 0, py: 0.5 }}>{label}</Typography>
            <EditableValue
                value={value}
                editable={editable}
                InputComponent={InputComponent}
                inputProps={inputProps} />
        </Stack>

    );
}

export default TableCardRow;
