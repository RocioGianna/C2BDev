import React, { useState } from "react";
import { TextField } from "formik-material-ui";
import { Field } from "formik";
import { Button, Box } from "@mui/material";
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
            {children ? (
                <>
                    {React.Children.map(children, (child) =>
                        React.cloneElement(child, { disabled: !enabled })
                    )}
                </>
            ) : (
                <Field
                    name={name}
                    label={label}
                    component={TextField}
                    type="text"
                    sx={{ flexGrow: 1 }}
                    disabled={!enabled}
                />
            )}

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
