import React from "react";
import { Typography, Box, Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper } from "@mui/material";

export function CustomerData({ row }) {
    return (
        <Paper
            sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
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
                Cliente
            </Typography>
            <Box sx={{ display: "flex" }}>
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
                                    <div>Apellido</div>
                                    <div>{row.customer.lastName}</div>
                                </TableCell>
                            </TableRow>
                            <TableRow key={2}>
                                <TableCell sx={{ display: "flex", justifyContent: "space-between" }}>
                                    <div>Nombe</div>
                                    <div>{row.customer.firstName}</div>
                                </TableCell>
                            </TableRow>
                            <TableRow key={3}>
                                <TableCell sx={{ display: "flex", justifyContent: "space-between" }}>
                                    <div>DNI</div>
                                    <div>{row.customer.nid}</div>
                                </TableCell>
                            </TableRow>
                            <TableRow key={4}>
                                <TableCell sx={{ display: "flex", justifyContent: "space-between" }}>
                                    <div>Telefono</div>
                                    <div>{row.customer.phone}</div>
                                </TableCell>
                            </TableRow>
                            <TableRow key={5}>
                                <TableCell sx={{ display: "flex", justifyContent: "space-between" }}>
                                    <div>Mail</div>
                                    <div>{row.customer.email}</div>
                                </TableCell>
                            </TableRow>
                            <TableRow key={6}>
                                <TableCell sx={{ display: "flex", justifyContent: "space-between" }}>
                                    <div>Direccion facturacion</div>
                                    <div>{row.customer.billingAddress.address}</div>
                                </TableCell>
                            </TableRow>
                            <TableRow key={7}>
                                <TableCell sx={{ display: "flex", justifyContent: "space-between" }}>
                                    <div>Municipio facturacion</div>
                                    <div>{row.customer.billingAddress.municipality}</div>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
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
                                    <div>Provincia facturacion</div>
                                    <div>{row.customer.billingAddress.province}</div>
                                </TableCell>
                            </TableRow>
                            <TableRow key={2}>
                                <TableCell sx={{ display: "flex", justifyContent: "space-between" }}>
                                    <div>Codigo postal facturacion</div>
                                    <div>{row.customer.billingAddress.zipcode}</div>
                                </TableCell>
                            </TableRow>
                            <TableRow key={3}>
                                <TableCell sx={{ display: "flex", justifyContent: "space-between" }}>
                                    <div>Cuenta bancaria</div>
                                    <div>{row.customer.bankAccount}</div>
                                </TableCell>
                            </TableRow>
                            <TableRow key={4}>
                                <TableCell sx={{ display: "flex", justifyContent: "space-between" }}>
                                    <div>Direccion instalacion</div>
                                    <div>{row.installationAddress?.address || "-"}</div>
                                </TableCell>
                            </TableRow>
                            <TableRow key={5}>
                                <TableCell sx={{ display: "flex", justifyContent: "space-between" }}>
                                    <div>Municipio instalacion</div>
                                    <div>{row.installationAddress?.municipality || "-"}</div>
                                </TableCell>
                            </TableRow>
                            <TableRow key={6}>
                                <TableCell sx={{ display: "flex", justifyContent: "space-between" }}>
                                    <div>Provincia instalacion</div>
                                    <div>{row.installationAddress?.province || "-"}</div>
                                </TableCell>
                            </TableRow>
                            <TableRow key={7}>
                                <TableCell sx={{ display: "flex", justifyContent: "space-between" }}>
                                    <div>Codigo postal instalacion</div>
                                    <div>{row.installationAddress?.zipcode || "-"}</div>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Paper>
    );
}
