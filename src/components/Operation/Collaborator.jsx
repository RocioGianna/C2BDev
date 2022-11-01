import React from "react";
import { Typography, Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper } from "@mui/material";

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
                        <TableRow key={1}>
                            <TableCell sx={{ display: "flex", justifyContent: "space-between" }}>
                                <div>Codigo colaborador</div>
                                <div>{row.colaboratorCode}</div>
                            </TableCell>
                        </TableRow>
                        <TableRow key={2}>
                            <TableCell sx={{ display: "flex", justifyContent: "space-between" }}>
                                <div>Codigo referente</div>
                                <div>?</div>
                            </TableCell>
                        </TableRow>
                        <TableRow key={3}>
                            <TableCell sx={{ display: "flex", justifyContent: "space-between" }}>
                                <div>Telefono colaborador</div>
                                <div>{row.colaboratorPhone}</div>
                            </TableCell>
                        </TableRow>
                        <TableRow key={4}>
                            <TableCell sx={{ display: "flex", justifyContent: "space-between" }}>
                                <div>Email colaborador</div>
                                <div>{row.colaboratorEmail}</div>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
}
