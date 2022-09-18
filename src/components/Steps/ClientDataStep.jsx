import React from "react";
import { Box, Grid } from "@mui/material";
import { TextField } from "formik-material-ui";
import { Field, useField } from "formik";
import { phoneRegex } from "../../utils/RegexUtils";
import ConditionalForm from "./ConditionalForm";
import * as yup from "yup";

const validationSchema = yup.object().shape({
    clientName: yup.string().required("El nombre es requerido"),
    clientSurname: yup.string().required("El apellido es requerido"),
    dni: yup.string().required("El DNI / NIE / CIF / NIF es requerido"),
    phone: yup
        .string()
        .required("El telefono es requerido")
        .matches(phoneRegex, "Numero de telefono no valido"),
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
    instalattionAddress: yup
        .string("Ingrese su direccion de instalacion")
        .when("checkbox", {
            is: true,
            then: yup
                .string()
                .required("La direccion de instalacion es requerida")
                .notOneOf(
                    [yup.ref("billingAddress")],
                    "Las direcciones no deben coincidir"
                ),
        }),
    zipCodeInstallation: yup
        .string("Ingrese su codigo postal de instalacion")
        .when("checkbox", {
            is: true,
            then: yup
                .string()
                .required("El codigo postal de instalacion es requerido"),
        }),
    municipalityInstallation: yup
        .string("Ingrese su municipio de instalacion")
        .when("checkbox", {
            is: true,
            then: yup
                .string()
                .required("El municipio de instalacion es requerido"),
        }),
    provinceInstallation: yup
        .string("Ingrese su provincia de instalacion")
        .when("checkbox", {
            is: true,
            then: yup
                .string()
                .required("La provincia de instalacion es requerida"),
        }),
    instalattionAddress2: yup
        .string("Ingrese su direccion de instalacion")
        .when("checkbox2", {
            is: true,
            then: yup
                .string()
                .required("La direccion de instalacion es requerida")
                .notOneOf(
                    [yup.ref("billingAddress")],
                    "Las direcciones no deben coincidir"
                ),
        }),
    zipCodeInstallation2: yup
        .string("Ingrese su codigo postal de instalacion")
        .when("checkbox2", {
            is: true,
            then: yup
                .string()
                .required("El codigo postal de instalacion es requerido"),
        }),
    municipalityInstallation2: yup
        .string("Ingrese su municipio de instalacion")
        .when("checkbox2", {
            is: true,
            then: yup
                .string()
                .required("El municipio de instalacion es requerido"),
        }),
    provinceInstallation2: yup
        .string("Ingrese su provincia de instalacion")
        .when("checkbox2", {
            is: true,
            then: yup
                .string()
                .required("La provincia de instalacion es requerida"),
        }),
});

function ClientDataStep(props) {
    const [checkbox] = useField("checkbox");
    const [checkbox2] = useField("checkbox2");

    return (
        <Box sx={{ flexGrow: 1 }} label={props.label}>
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
                        label="DNI / NIE / CIF / NIF"
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
                <ConditionalForm
                    label={
                        "Direccion de instalacion distinta a la direccion de facturacion"
                    }
                    fieldValue={checkbox.value}
                    name={"checkbox"}
                >
                    <Grid item xs={9}>
                        <Field
                            fullWidth
                            name="instalattionAddress"
                            label="Direccion de instalacion"
                            component={TextField}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <Field
                            fullWidth
                            name="zipCodeInstallation"
                            label="Codigo postal"
                            component={TextField}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Field
                            fullWidth
                            name="municipalityInstallation"
                            label="Municipio"
                            component={TextField}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Field
                            fullWidth
                            name="provinceInstallation"
                            label="Provincia"
                            component={TextField}
                        />
                    </Grid>
                </ConditionalForm>
                <ConditionalForm
                    label={
                        "Direccion de entrega distinta a la direccion de instalacion"
                    }
                    field={checkbox2.value}
                >
                    <Grid item xs={9}>
                        <Field
                            fullWidth
                            name="instalattionAddress2"
                            label="Direccion de instalacion"
                            component={TextField}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <Field
                            fullWidth
                            name="zipCodeInstallation2"
                            label="Codigo postal"
                            component={TextField}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Field
                            fullWidth
                            name="municipalityInstallation2"
                            label="Municipio"
                            component={TextField}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Field
                            fullWidth
                            name="provinceInstallation2"
                            label="Provincia"
                            component={TextField}
                        />
                    </Grid>
                </ConditionalForm>
            </Grid>
        </Box>
    );
}

export default {
    ValidationSchema: validationSchema,
    ReactComponent: ClientDataStep,
    Label: "Datos del cliente",
};
