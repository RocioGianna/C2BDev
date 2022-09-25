import React, { useState } from "react";
import { TextField } from "formik-material-ui";
import { Field } from "formik";
import { Button, Box } from "@mui/material";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";

export default function EditableField({ name, label }) {
    const [enabled, setEnabled] = useState(false);

    return (
        <Box
            sx={{
                display: "flex",
                width: "100%",
            }}
        >
            <Field
                name={name}
                label={label}
                component={TextField}
                type="text"
                sx={{ flexGrow: 1 }}
                disabled={!enabled}
            />
            {!enabled && (
                <Button
                    variant="contained"
                    sx={{ ml: 2 }}
                    onClick={() => setEnabled(!enabled)}
                >
                    <ModeEditOutlineOutlinedIcon />
                </Button>
            )}
        </Box>
    );
}
