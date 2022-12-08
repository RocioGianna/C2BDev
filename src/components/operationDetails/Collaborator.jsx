import React from "react";
import { Typography, Box, Divider, Paper, Stack } from "@mui/material";
import Field from "../form/Field";

export function Collaborator({ row }) {
    return (
        <Paper
            sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                p: 2,
            }}>
            <Typography variant="h6">Colaborador</Typography>
            <Stack direction="column">
                <Box sx={{ display: "flex", justifyContent: "space-between", py: 0.75, px: 1 }}>
                    <div>Codigo colaborador</div>
                    <div>{row.collaborator.userCode}</div>
                </Box>
                <Divider />
                <Box sx={{ display: "flex", justifyContent: "space-between", py: 0.75, px: 1 }}>
                    <div>Codigo referente</div>
                    <div>-</div>
                </Box>
                <Divider />
                <Field name="phone" value={row.collaboratorPhone} label="Teléfono" operationStatus={row.status} column={"COLLABORATOR_PHONE"} type="tel" />
                <Divider />
                <Field name="email" value={row.collaboratorEmail} label="Email" operationStatus={row.status} column={"COLLABORATOR_EMAIL"} />
            </Stack>
        </Paper>
    );
}
