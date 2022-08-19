import React from "react";
import * as yup from "yup";
import { Box, TextField, Grid } from "@mui/material";
import { Field } from "formik";

export default function ClientDataStep(props) {
    return (
        <Box
            sx={{ flexGrow: 1 }}
            label={props.label}
            validationSchema={yup.object({
                clientName: yup.string().required("El nombre es requerido"),
                clientSurname: yup
                    .string()
                    .required("El apellido es requerido"),
                dni: yup.string().required("El DNI es requerido"),
                phone: yup.string().required("El telefono es requerido"),
                email: yup
                    .string("Ingrese su correo electronico")
                    .email("Ingrese un correo electronico valido")
                    .required("El correo electronico es requerido"),
                bankAccount: yup
                    .string("Ingrese su cuenta bancaria")
                    .required("La cuenta bancaria es requerida"),
                billingAddress: yup
                    .string("Ingrese su direccion de facturacion")
                    .required("La direccion de facturacion es requerida"),
                zipCode: yup
                    .string("Ingrese su codigo postal")
                    .required("El codigo postal es requerido"),
                municipality: yup
                    .string("Ingrese su municipio")
                    .required("El municipio es requerido"),
            })}
        >
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Field
                        fullWidth
                        id="clientName"
                        name="clientName"
                        label="Nombres del Cliente"
                        component={TextField}
                    />
                </Grid>
                <Grid item xs={6}>
                    <Field
                        fullWidth
                        id="clientSurname"
                        name="clientSurname"
                        label="Apellidos del Cliente"
                        component={TextField}
                    />
                </Grid>
                <Grid item xs={6}>
                    <Field
                        fullWidth
                        id="dni"
                        name="dni"
                        label="DNI"
                        component={TextField}
                        type="tel"
                    />
                </Grid>
                <Grid item xs={6}>
                    <Field
                        fullWidth
                        id="phone"
                        name="phone"
                        label="Telefono"
                        component={TextField}
                        type="tel"
                    />
                </Grid>
                <Grid item xs={12}>
                    <Field
                        fullWidth
                        id="email"
                        name="email"
                        label="Email"
                        component={TextField}
                        type="email"
                    />
                </Grid>
                <Grid item xs={12}>
                    <Field
                        fullWidth
                        id="bankAccount"
                        name="bankAccount"
                        label="Cuenta Bancaria"
                        component={TextField}
                    />
                </Grid>
                <Grid item xs={8}>
                    <Field
                        fullWidth
                        id="billingAddress"
                        name="billingAddress"
                        label="Direccion de facturacion"
                        component={TextField}
                    />
                </Grid>
                <Grid item xs={4}>
                    <Field
                        fullWidth
                        id="zipCode"
                        name="zipCode"
                        label="Codigo Postal"
                        component={TextField}
                        type="tel"
                    />
                </Grid>
                <Grid item xs={6}>
                    <Field
                        fullWidth
                        id="municipality"
                        name="municipality"
                        label="Municipio"
                        component={TextField}
                    />
                </Grid>
                <Grid item xs={6}>
                    <Field
                        fullWidth
                        id="province"
                        name="province"
                        label="Provincia"
                        component={TextField}
                    />
                </Grid>
            </Grid>
        </Box>
    );
}
