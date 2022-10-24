import React, { useState } from "react";
import { TextField } from "formik-material-ui";
import { Field } from "formik";
import { IconButton, Button, Box } from "@mui/material";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";

export default function EditableField({ name, label, children }) {
    const [enabled, setEnabled] = useState(false);

    return (
        <Box
            sx={{
                display: "flex",
                width: "100%",
            }}
        >
            {children ? <>{React.Children.map(children, (child) => React.cloneElement(child, { disabled: !enabled }))}</> : <Field name={name} label={label} component={TextField} type="text" sx={{ flexGrow: 1 }} disabled={!enabled} />}

            {!enabled && (
                <IconButton variant="contained" size="small" sx={{ mx: 1 }} color="primary" onClick={() => setEnabled(!enabled)}>
                    <ModeEditOutlineOutlinedIcon />
                </IconButton>
            )}
        </Box>
    );
}
