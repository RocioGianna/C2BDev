import React from "react";
import { MenuItem, Typography, Box } from "@mui/material";
import { EditableDetailField } from "../EditableDetailField";

export function ChannelSelect({ channel, operationStatus }) {
    let channelName = "";
    let permissionNeeded = "CHANNEL";

    if (channel !== null) channelName = channel;

    return (
        <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="subtitle2" sx={{ mr: 1, alignItems: "center" }}>
                Canal
            </Typography>
            <EditableDetailField name={"selectOptional"} value={channelName} operationStatus={operationStatus} permissionNeeded={permissionNeeded} type="select">
                <MenuItem value={""}>-</MenuItem>
                <MenuItem value={"AR"}>AR</MenuItem>
                <MenuItem value={"FM"}>FM</MenuItem>
                <MenuItem value={"IR"}>IR</MenuItem>
                <MenuItem value={"NE"}>NE</MenuItem>
                <MenuItem value={"OT_LAB"}>OT_LAB</MenuItem>
                <MenuItem value={"OT_CTG"}>OT_CTG</MenuItem>
                <MenuItem value={"TF_MUR"}>TF_MUR</MenuItem>
                <MenuItem value={"SC"}>SC</MenuItem>
                <MenuItem value={"TOT"}>TOT</MenuItem>
                <MenuItem value={"TPHS"}>TPHS</MenuItem>
            </EditableDetailField>
        </Box>
    );
}
