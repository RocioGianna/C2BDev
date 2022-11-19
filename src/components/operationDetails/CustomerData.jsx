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
                            <TableRow>
                                <TableCell sx={{ display: "flex", justifyContent: "space-between" }}>
                                    <div>Apellido</div>
                                    <div>{row.customer.lastName}</div>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell sx={{ display: "flex", justifyContent: "space-between" }}>
                                    <div>Nombe</div>
                                    <div>{row.customer.firstName}</div>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell sx={{ display: "flex", justifyContent: "space-between" }}>
                                    <div>DNI</div>
                                    <div>{row.customer.nid}</div>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell sx={{ display: "flex", justifyContent: "space-between" }}>
                                    <div>Telefono</div>
                                    <div>{row.customer.phone}</div>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell sx={{ display: "flex", justifyContent: "space-between" }}>
                                    <div>Mail</div>
                                    <div>{row.customer.email}</div>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
                                    <strong>Direccion facturacion</strong>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell sx={{ display: "flex", justifyContent: "space-between" }}>
                                    <div>Direccion</div>
                                    <div>{row.customer.billingAddress.address}</div>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell sx={{ display: "flex", justifyContent: "space-between" }}>
                                    <div>Municipio facturacion</div>
                                    <div>{row.customer.billingAddress.municipality}</div>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell sx={{ display: "flex", justifyContent: "space-between" }}>
                                    <div>Provincia facturacion</div>
                                    <div>{row.customer.billingAddress.province}</div>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell sx={{ display: "flex", justifyContent: "space-between" }}>
                                    <div>Codigo postal facturacion</div>
                                    <div>{row.customer.billingAddress.zipcode}</div>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell sx={{ display: "flex", justifyContent: "space-between" }}>
                                    <div>Cuenta bancaria</div>
                                    <div>{row.customer.bankAccount}</div>
                                </TableCell>
                            </TableRow>
                            {row.installationAddress && (
                                <>
                                    <TableRow>
                                        <TableCell sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
                                            <strong>Direccion instalacion</strong>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell sx={{ display: "flex", justifyContent: "space-between" }}>
                                            <div>Direccion</div>
                                            <div>{row.installationAddress?.address || "-"}</div>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell sx={{ display: "flex", justifyContent: "space-between" }}>
                                            <div>Municipio instalacion</div>
                                            <div>{row.installationAddress?.municipality || "-"}</div>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell sx={{ display: "flex", justifyContent: "space-between" }}>
                                            <div>Provincia instalacion</div>
                                            <div>{row.installationAddress?.province || "-"}</div>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell sx={{ display: "flex", justifyContent: "space-between" }}>
                                            <div>Codigo postal instalacion</div>
                                            <div>{row.installationAddress?.zipcode || "-"}</div>
                                        </TableCell>
                                    </TableRow>
                                </>
                            )}
                            {row.shippingAdress && (
                                <>
                                    <TableRow>
                                        <TableCell sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
                                            <strong>Direccion de envio</strong>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell sx={{ display: "flex", justifyContent: "space-between" }}>
                                            <div>Direccion</div>
                                            <div>{row.shippingAdress.address || "-"}</div>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell sx={{ display: "flex", justifyContent: "space-between" }}>
                                            <div>Municipio instalacion</div>
                                            <div>{row.shippingAdress.municipality || "-"}</div>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell sx={{ display: "flex", justifyContent: "space-between" }}>
                                            <div>Provincia instalacion</div>
                                            <div>{row.shippingAdress.province || "-"}</div>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell sx={{ display: "flex", justifyContent: "space-between" }}>
                                            <div>Codigo postal instalacion</div>
                                            <div>{row.installationAddress?.zipcode || "-"}</div>
                                        </TableCell>
                                    </TableRow>
                                </>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Paper>
    );
}
