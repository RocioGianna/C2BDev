import React from "react";
import { Typography, Box, Paper, Divider, Stack } from "@mui/material";
import Field from "../form/Field";

export function CustomerData({ row }) {
    console.log(row);
    return (
        <Paper
            sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                p: 2,
            }}>
            <Typography variant="h6">Cliente</Typography>
            <Stack direction="column">
                <Field name="lastName" value={row.customer.lastName} label="Apellido" operationStatus={row.status} column={"CUSTOMER"} />
                <Divider />
                <Field name="firstName" value={row.customer.firstName} label="Nombre" operationStatus={row.status} column={"CUSTOMER"} />
                <Divider />
                <Field name="nid" value={row.customer.nid} label="DNI" operationStatus={row.status} column={"CUSTOMER"} />
                <Divider />
                <Field name="phone" value={row.customer.phone} label="Teléfono" operationStatus={row.status} column={"CUSTOMER"} type="tel" />
                <Divider />
                <Field name="email" value={row.customer.email} label="Email" operationStatus={row.status} column={"CUSTOMER"} />
                <Divider />
                <Field name="bankAccount" value={row.customer.bankAccount} label="Cuenta bancaria" operationStatus={row.status} column={"CUSTOMER"} />
                <Divider />
                <Box sx={{ display: "flex", justifyContent: "space-between", py: 0.75, px: 1 }}>
                    <div>A3</div>
                    <div>{row.reprocess ? "Si" : "No"}</div>
                </Box>
                <Divider />
                <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
                    <strong>Direccion facturacion</strong>
                </Box>
                <Field name="address" value={row.customer.billingAddress.address} label="Calle" operationStatus={row.status} column={"CUSTOMER"} />
                <Divider />
                <Field name="municipality" value={row.customer.billingAddress.municipality} label="Municipio facturacion" operationStatus={row.status} column={"CUSTOMER"} />
                <Divider />
                <Field name="province" value={row.customer.billingAddress.province} label="Provincia facturacion" operationStatus={row.status} column={"CUSTOMER"} />
                <Divider />
                <Field name="zipCode" value={row.customer.billingAddress.zipcode} label="Codigo postal facturacion" operationStatus={row.status} column={"CUSTOMER"} />
            </Stack>
            {row.installationAddress && (
                <>
                    <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
                        <strong>Direccion instalacion</strong>
                    </Box>
                    <Field name="address" value={row.installationAddress.address} label="Calle" operationStatus={row.status} column={"INSTALLATION_ADDRESS"} />
                    <Divider />
                    <Field name="municipality" value={row.installationAddress.municipality} label="Municipio instalacion" operationStatus={row.status} column={"INSTALLATION_ADDRESS"} />
                    <Divider />
                    <Field name="province" value={row.installationAddress.province} label="Provincia instalacion" operationStatus={row.status} column={"INSTALLATION_ADDRESS"} />
                    <Divider />
                    <Field name="zipCode" value={row.installationAddress.zipcode} label="Codigo postal instalacion" operationStatus={row.status} column={"INSTALLATION_ADDRESS"} />
                </>
            )}
            {row.shippingAddress && (
                <>
                    <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
                        <strong>Direccion envio</strong>
                    </Box>
                    <Field name="address" value={row.shippingAddress.address} label="Calle" operationStatus={row.status} column={"SHIPPING_ADDRESS"} />
                    <Divider />
                    <Field name="municipality" value={row.shippingAddress.municipality} label="Municipio envio" operationStatus={row.status} column={"SHIPPING_ADDRESS"} />
                    <Divider />
                    <Field name="province" value={row.shippingAddress.province} label="Provincia envio" operationStatus={row.status} column={"SHIPPING_ADDRESS"} />
                    <Divider />
                    <Field name="zipCode" value={row.shippingAddress.zipcode} label="Codigo postal envio" operationStatus={row.status} column={"SHIPPING_ADDRESS"} />
                </>
            )}
        </Paper>
    );
}
