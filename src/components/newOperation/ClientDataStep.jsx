import React from "react";
import * as yup from "yup";
import { Box, Grid } from "@mui/material";
import { TextField } from "formik-material-ui";
import { Field } from "formik";
import * as yup from "yup";

const validationSchema = yup.object({
    clientName: yup.string().required("El nombre es requerido"),
    clientSurname: yup.string().required("El apellido es requerido"),
    dni: yup.string().required("El DNI es requerido"),
    phone: yup
        .number("El telefono debe ser un numero")
        .required("El telefono es requerido")
        .positive()
        .integer()
        .typeError("El telefono debe ser un numero"),
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
    province: yup
        .string("Ingrese su provincia")
        .required("La provincia es requerida"),
});

export default function ClientDataStep(props) {
    return (
        <Box
            sx={{ flexGrow: 1 }}
            label={props.label}
            validationSchema={validationSchema}
        >
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Field
                        fullWidth
                        name="clientName"
                        label="Nombres del Cliente"
                        component={TextField}
                    />
                </Grid>
                <Grid item xs={6}>
                    <Field
                        fullWidth
                        name="clientSurname"
                        label="Apellidos del Cliente"
                        component={TextField}
                    />
                </Grid>
                <Grid item xs={6}>
                    <Field
                        fullWidth
                        name="dni"
                        label="DNI"
                        component={TextField}
                        type="tel"
                    />
                </Grid>
                <Grid item xs={6}>
                    <Field
                        fullWidth
                        name="phone"
                        label="Telefono"
                        component={TextField}
                        type="tel"
                    />
                </Grid>
                <Grid item xs={12}>
                    <Field
                        fullWidth
                        name="email"
                        label="Email"
                        component={TextField}
                        type="email"
                    />
                </Grid>
                <Grid item xs={12}>
                    <Field
                        fullWidth
                        name="bankAccount"
                        label="Cuenta Bancaria"
                        component={TextField}
                    />
                </Grid>
                <Grid item xs={8}>
                    <Field
                        fullWidth
                        name="billingAddress"
                        label="Direccion de facturacion"
                        component={TextField}
                    />
                </Grid>
                <Grid item xs={4}>
                    <Field
                        fullWidth
                        name="zipCode"
                        label="Codigo Postal"
                        component={TextField}
                        type="tel"
                    />
                </Grid>
                <Grid item xs={6}>
                    <Field
                        fullWidth
                        name="municipality"
                        label="Municipio"
                        component={TextField}
                    />
                </Grid>
                <Grid item xs={6}>
                    <Field
                        fullWidth
                        name="province"
                        label="Provincia"
                        component={TextField}
                    />
                </Grid>
            </Grid>
        </Box>
    );
}
