import React from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import EditableValue from "../../inputs/EditableValue";

function TitleBarValue({ label, value, editable, InputComponent, inputProps }) {
    return (
        <Stack direction="row" spacing={1} alignItems="center">
            <Typography variant="body1" color="text.secondary">{label}:</Typography>
            <EditableValue
                value={value}
                editable={editable}
                InputComponent={InputComponent}
                inputProps={inputProps} />
        </Stack>
    );
}

export default TitleBarValue;
