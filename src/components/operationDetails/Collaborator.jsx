import React from "react";
import { Typography, Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper } from "@mui/material";
import { EditableDetailField } from "../EditableDetailField";
import PhoneInput from "../form/PhoneInput";

export function Collaborator({ row }) {
    return (
        <Paper
            sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                height: "100%",
            }}
        >
            <Typography
                variant="h6"
                sx={{
                    flexGrow: 1,
                    px: 2,
                    pt: 1,
                }}
            >
                Colaborador
            </Typography>
            <TableContainer component={Paper}>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell sx={{ display: "flex", justifyContent: "space-between" }}>
                                <div>Codigo colaborador</div>
                                <div>{row.collaborator.userCode}</div>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell sx={{ display: "flex", justifyContent: "space-between" }}>
                                <div>Codigo referente</div>
                                <div>-</div>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell sx={{ display: "flex", justifyContent: "space-between" }}>
                                <div>Telefono colaborador</div>
                                <EditableDetailField type="tel" value={row.collaborator.phone} name={"phone"} operationStatus={row.status} permissionNeeded={"COLLABORATOR_EMAIL"} />
                            </TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell sx={{ display: "flex", justifyContent: "space-between" }}>
                                <div>Email colaborador</div>
                                <EditableDetailField value={row.collaborator.email} name={"email"} operationStatus={row.status} permissionNeeded={"COLLABORATOR_EMAIL"} />
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
}
