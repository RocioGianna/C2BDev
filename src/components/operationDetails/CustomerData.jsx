import React from "react";
import { Typography, Box, Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper } from "@mui/material";
import { EditableDetailField } from "../EditableDetailField.jsx";

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
                                    <EditableDetailField value={row.customer.lastName} name={"lastname"} operationStatus={row.status} permissionNeeded={"CUSTOMER"} />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell sx={{ display: "flex", justifyContent: "space-between" }}>
                                    <div>Nombre</div>
                                    <EditableDetailField value={row.customer.firstName} name={"name"} operationStatus={row.status} permissionNeeded={"CUSTOMER"} />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell sx={{ display: "flex", justifyContent: "space-between" }}>
                                    <div>DNI</div>
                                    <EditableDetailField value={row.customer.nid} name={"nid"} operationStatus={row.status} permissionNeeded={"CUSTOMER"} />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell sx={{ display: "flex", justifyContent: "space-between" }}>
                                    <Box sx={{ flexGrow: 0, flexShrink: 0 }}>Telefono</Box>
                                    <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "end" }}>
                                        <EditableDetailField type="tel" value={row.customer.phone} name={"phone"} operationStatus={row.status} permissionNeeded={"CUSTOMER"} />
                                    </Box>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell sx={{ display: "flex", justifyContent: "space-between" }}>
                                    <div>Mail</div>
                                    <EditableDetailField value={row.customer.email} name={"email"} operationStatus={row.status} permissionNeeded={"CUSTOMER"} />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell sx={{ display: "flex", justifyContent: "space-between" }}>
                                    <div>Nº Cuenta Bancaria / IBAN</div>
                                    <EditableDetailField value={row.customer.bankAccount} name={"bankAccount"} operationStatus={row.status} permissionNeeded={"CUSTOMER"} />
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
                                    <EditableDetailField value={row.customer.billingAddress.address} name={"address"} operationStatus={row.status} permissionNeeded={"CUSTOMER"} />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell sx={{ display: "flex", justifyContent: "space-between" }}>
                                    <div>Municipio facturacion</div>
                                    <EditableDetailField value={row.customer.billingAddress.municipality} name={"municipality"} operationStatus={row.status} permissionNeeded={"CUSTOMER"} />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell sx={{ display: "flex", justifyContent: "space-between" }}>
                                    <div>Provincia facturacion</div>
                                    <EditableDetailField value={row.customer.billingAddress.province} name={"province"} operationStatus={row.status} permissionNeeded={"CUSTOMER"} />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell sx={{ display: "flex", justifyContent: "space-between" }}>
                                    <div>Codigo postal facturacion</div>
                                    <EditableDetailField value={row.customer.billingAddress.zipcode} name={"zipCode"} operationStatus={row.status} permissionNeeded={"CUSTOMER"} />
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
                                            <EditableDetailField value={row.installationAddress.address} name={"address"} operationStatus={row.status} permissionNeeded={"INSTALLATION_ADDRESS"} />
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell sx={{ display: "flex", justifyContent: "space-between" }}>
                                            <div>Municipio instalacion</div>
                                            <EditableDetailField value={row.installationAddress.municipality} name={"municipality"} operationStatus={row.status} permissionNeeded={"INSTALLATION_ADDRESS"} />
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell sx={{ display: "flex", justifyContent: "space-between" }}>
                                            <div>Provincia instalacion</div>
                                            <EditableDetailField value={row.installationAddress.province} name={"province"} operationStatus={row.status} permissionNeeded={"INSTALLATION_ADDRESS"} />
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell sx={{ display: "flex", justifyContent: "space-between" }}>
                                            <div>Codigo postal instalacion</div>
                                            <EditableDetailField value={row.installationAddress.zipcode} name={"zipCode"} operationStatus={row.status} permissionNeeded={"INSTALLATION_ADDRESS"} />
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
                                            <EditableDetailField value={row.shippingAdress.address} name={"address"} operationStatus={row.status} permissionNeeded={"SHIPPING_ADDRESS"} />
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell sx={{ display: "flex", justifyContent: "space-between" }}>
                                            <div>Municipio instalacion</div>
                                            <EditableDetailField value={row.shippingAdress.municipality} name={"municipality"} operationStatus={row.status} permissionNeeded={"SHIPPING_ADDRESS"} />
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell sx={{ display: "flex", justifyContent: "space-between" }}>
                                            <div>Provincia instalacion</div>
                                            <EditableDetailField value={row.shippingAdress.province} name={"province"} operationStatus={row.status} permissionNeeded={"SHIPPING_ADDRESS"} />
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell sx={{ display: "flex", justifyContent: "space-between" }}>
                                            <div>Codigo postal instalacion</div>
                                            <EditableDetailField value={row.shippingAdress.zipcode} name={"zipCode"} operationStatus={row.status} permissionNeeded={"SHIPPING_ADDRESS"} />
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
