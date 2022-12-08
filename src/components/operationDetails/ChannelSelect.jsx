import React from "react";
import { MenuItem, Typography, Box } from "@mui/material";
import { EditableDetailField } from "../EditableDetailField";
import { useSelector } from "react-redux";

export function ChannelSelect({ channel, operationStatus }) {
    let channelName = "";
    const permissionNeeded = "CHANNEL";
    const editPermissions = useSelector((state) => state.operations.permissions);
    const editPermission = editPermissions[operationStatus];
    const canEdit = editPermission.includes(permissionNeeded);

    if (channel !== null) channelName = channel;

    return (
        <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="subtitle2" sx={{ mr: 1, alignItems: "center" }}>
                Canal
            </Typography>
            {
                canEdit
                    ? (
                        <EditableDetailField value={channelName} name={"selectOptional"} column={permissionNeeded} operationStatus={operationStatus} type="select">
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
                    )
                    : <Typography variant="subtitle2" sx={{ mr: 1, alignItems: "center" }}>
                        {channelName ? channelName : "-"}
                    </Typography>
            }

        </Box>
    );
}
