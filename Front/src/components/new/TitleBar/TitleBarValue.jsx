import React from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import EditableValue from "../EditableValue/EditableValue";

function TitleBarValue({ label, value, show = true, editable, InputComponent, inputProps }) {
    return (show
        && <Stack direction="row" spacing={1} alignItems="center">
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
