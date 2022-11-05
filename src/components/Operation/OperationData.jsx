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
                            <TableCell align="right">Codigo Operacion</TableCell>
                            <TableCell align="right">Estado</TableCell>
                            <TableCell align="right">Tamitadora</TableCell>
                            <TableCell align="right">Canal</TableCell>
                            <TableCell align="right">Alta | Baja</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow key={row.name}>
                            <TableCell>
                                <div>{moment(row.creationDate).format("DD/MM/YYYY")}</div>
                            </TableCell>
                            <TableCell align="right">
                                <div>{row.operationCode}</div>
                            </TableCell>
                            <TableCell align="right">
                                <div>{row.status}</div>
                            </TableCell>
                            <TableCell align="right">
                                <div>{row.processorId}</div>
                            </TableCell>
                            <TableCell align="right">
                                <div>{row.channel}</div>
                            </TableCell>
                            <TableCell align="right">
                                <div> ------ </div>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
}
