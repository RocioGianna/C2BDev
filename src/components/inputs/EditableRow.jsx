import React from "react";
import { Box } from "@mui/material";
import { EditableDetailField } from "../EditableDetailField.jsx";
import { useSelector } from "react-redux";

export default function EditableRow({ name, value, label, operationStatus, column, type }) {
    const editPermissions = useSelector((state) => state.operations.permissions);
    const editPermission = editPermissions[operationStatus];
    const canEdit = editPermission.includes(column);

    if (!canEdit) return null;

    return (
        <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%", py: 0.75, px: 1 }}>
            <div>{label}</div>
            <EditableDetailField value={value} name={name} operationStatus={operationStatus} column={column} type={type} />
        </Box>
    );
}
