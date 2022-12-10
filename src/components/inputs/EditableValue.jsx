import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";

function EditableValue({ value, editable, InputComponent, inputProps }) {
    const [editMode, setEditMode] = useState(false);
    return editMode
        ? <InputComponent setEditMode={setEditMode} value={value} {...inputProps} />
        : (
            <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                sx={{
                    "& .edit-btn": { display: "none" },
                    "&:hover .edit-btn": { display: "inline-flex" },
                }}>
                <Typography variant="body1">{value}</Typography>
                {editable && <IconButton
                    className="edit-btn"
                    onClick={() => setEditMode(true)}
                    size="small"
                    sx={{ p: 0.25, m: 0 }}>
                    <EditIcon fontSize="inherit" />
                </IconButton>}
            </Stack>);
}

export default EditableValue;
