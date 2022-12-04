import React from "react";
import { useSelector } from "react-redux";
import { Box, MenuItem, Typography } from "@mui/material";
import { EditableDetailField } from "../EditableDetailField";
import { getPossibleStatus } from "../../utils/OperationUtils";

export function StatusSelect({ operationStatus }) {
    const statusOptions = getPossibleStatus(operationStatus);

    return (
        <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="subtitle2" sx={{ mr: 1, alignItems: "center" }}>
                Estado
            </Typography>
            <EditableDetailField name={"select"} value={operationStatus} operationStatus={operationStatus} permissionNeeded={"STATUS"} column={"STATUS"} type="select">
                <MenuItem value={operationStatus}>{operationStatus}</MenuItem>
                {statusOptions.map((status) => (
                    <MenuItem key={status} value={status}>
                        {status}
                    </MenuItem>
                ))}
            </EditableDetailField>
        </Box>
    );
}
