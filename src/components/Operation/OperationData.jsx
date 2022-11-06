import React from "react";
import { Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper } from "@mui/material";
import moment from "moment";

export function OperationData({ row }) {
    return (
        <Paper
            sx={{
                width: "100%",
                display: "flex",
            }}
        >
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Fecha</TableCell>
                            <TableCell align="center">Codigo Operacion</TableCell>
                            <TableCell align="center">Estado</TableCell>
                            <TableCell align="center">Tamitadora</TableCell>
                            <TableCell align="center">Canal</TableCell>
                            <TableCell align="center">Alta | Baja</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow key={row.name}>
                            <TableCell>
                                <div>{moment(row.creationDate).format("DD/MM/YYYY")}</div>
                            </TableCell>
                            <TableCell align="center">
                                <div>{row.operationCode || "-"}</div>
                            </TableCell>
                            <TableCell align="center">
                                <div>{row.status || "-"}</div>
                            </TableCell>
                            <TableCell align="center">
                                <div>{row.processorId || "-"}</div>
                            </TableCell>
                            <TableCell align="center">
                                <div>{row.channel || "-"}</div>
                            </TableCell>
                            <TableCell align="center">
                                <div>{row.reprocess || "-"}</div>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
}
