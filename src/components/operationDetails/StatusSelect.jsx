import React from "react";
import { useSelector } from "react-redux";
import { Box, MenuItem, Typography } from "@mui/material";
import { EditableDetailField } from "../EditableDetailField";

export function StatusSelect({ operationStatus }) {
    const statusMap = useSelector((state) => state.operations.statusMap);
    let statusOptions = statusMap[operationStatus];

    console.log("statusOptions", statusOptions);

    return (
        <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="subtitle2" sx={{ mr: 1, alignItems: "center" }}>
                Estado
            </Typography>
            <EditableDetailField name={"select"} value={operationStatus} operationStatus={operationStatus} permissionNeeded={"STATUS"} type="select">
                <MenuItem value={operationStatus}>{operationStatus}</MenuItem>
                {statusOptions.map((status) => (
                    <MenuItem value={status}>{status}</MenuItem>
                ))}
            </EditableDetailField>
        </Box>
    );
}
