import React from "react";
import { Box, Grid } from "@mui/material";
import { TextField } from "formik-material-ui";
import { Field, useField } from "formik";
import ConditionalForm from "../form/ConditionalForm";
import * as yup from "yup";
import PhoneInput from "../form/PhoneInput";
import { isValidPhoneNumber } from "libphonenumber-js";
import { countryCodes } from "../../utils/ValidationUtils";
import { useSelector } from "react-redux";

const validationSchema = () => {
    return yup.object().shape({
        clientName: yup.string().required("El nombre es requerido"),
        clientSurname: yup.string().required("El apellido es requerido"),
        dni: yup.string().required("El DNI / NIE / CIF / NIF es requerido"),
        phonePrefix: yup
            .string()
            .required("El prefijo es requerido")
            .test("valid-prefix", "Prefijo no valido", (value) => {
                return countryCodes.includes(value);
            }),
        phoneNumber: yup
            .string()
            .required("El numero es requerido")
            .test("is-valid-phone", "El formato del telefono no es valido", function (value) {
                return isValidPhoneNumber(this.options.parent.phonePrefix + " " + value);
            }),
        email: yup.string("Ingrese su correo electronico").email("Ingrese un correo electronico valido").required("El correo electronico es requerido"),
        bankAccount: yup.string("Ingrese su cuenta bancaria").required("La cuenta bancaria es requerida"),
        billingAddress: yup.string("Ingrese su direccion de facturacion").required("La direccion de facturacion es requerida"),
        zipCode: yup.string("Ingrese su codigo postal").required("El codigo postal es requerido"),
        municipality: yup.string("Ingrese su municipio").required("El municipio es requerido"),
        province: yup.string("Ingrese su provincia").required("La provincia es requerida"),
        instalattionAddress: yup.string("Ingrese su direccion de instalacion").when("checkbox", {
            is: true,
            then: yup
                .string()
                .required("La direccion de instalacion es requerida")
                .notOneOf([yup.ref("billingAddress")], "Las direcciones no deben coincidir"),
        }),
        zipCodeInstallation: yup.string("Ingrese su codigo postal de instalacion").when("checkbox", {
            is: true,
            then: yup.string().required("El codigo postal de instalacion es requerido"),
        }),
        municipalityInstallation: yup.string("Ingrese su municipio de instalacion").when("checkbox", {
            is: true,
            then: yup.string().required("El municipio de instalacion es requerido"),
        }),
        provinceInstallation: yup.string("Ingrese su provincia de instalacion").when("checkbox", {
            is: true,
            then: yup.string().required("La provincia de instalacion es requerida"),
        }),
        instalattionAddress2: yup.string("Ingrese su direccion de instalacion").when("checkbox2", {
            is: true,
            then: yup
                .string()
                .required("La direccion de instalacion es requerida")
                .notOneOf([yup.ref("billingAddress")], "Las direcciones no deben coincidir"),
        }),
        zipCodeInstallation2: yup.string("Ingrese su codigo postal de instalacion").when("checkbox2", {
            is: true,
            then: yup.string().required("El codigo postal de instalacion es requerido"),
        }),
        municipalityInstallation2: yup.string("Ingrese su municipio de instalacion").when("checkbox2", {
            is: true,
            then: yup.string().required("El municipio de instalacion es requerido"),
        }),
        provinceInstallation2: yup.string("Ingrese su provincia de instalacion").when("checkbox2", {
            is: true,
            then: yup.string().required("La provincia de instalacion es requerida"),
        }),
    });
};

function ClientDataStep(props) {
    const [checkbox] = useField("checkbox");
    const [checkbox2] = useField("checkbox2");

    function selectedProductHasAnyMobileStep() {
        const phoneSteps = useSelector((state) => state.formSteps.phoneSteps);
        return phoneSteps.some((step) => step.mobile === true);
    }

    return (
        <Box sx={{ flexGrow: 1 }} label={props.label}>
            <Grid container spacing={2}>
                <Grid item xs={12} xl={6}>
                    <Field fullWidth name="clientName" label="Nombres del Cliente" component={TextField} />
                </Grid>
                <Grid item xs={12} xl={6}>
                    <Field fullWidth name="clientSurname" label="Apellidos del Cliente" component={TextField} />
                </Grid>
                <Grid item xs={12} xl={6}>
                    <Field fullWidth name="dni" label="DNI / NIE / CIF / NIF" component={TextField} />
                </Grid>
                <Grid item xs={12} xl={6}>
                    <PhoneInput phonePrefixName="phonePrefix" phoneNumberName="phoneNumber" />
                </Grid>
                <Grid item xs={12}>
                    <Field fullWidth name="email" label="Email" component={TextField} type="email" />
                </Grid>
                <Grid item xs={12}>
                    <Field fullWidth name="bankAccount" label="Cuenta Bancaria" component={TextField} />
                </Grid>
                <Grid item xs={12} xl={8}>
                    <Field fullWidth name="billingAddress" label="Direccion de facturacion" component={TextField} />
                </Grid>
                <Grid item xs={12} xl={4}>
                    <Field fullWidth name="zipCode" label="Codigo Postal" component={TextField} />
                </Grid>
                <Grid item xs={12} xl={6}>
                    <Field fullWidth name="municipality" label="Municipio" component={TextField} />
                </Grid>
                <Grid item xs={12} xl={6}>
                    <Field fullWidth name="province" label="Provincia" component={TextField} />
                </Grid>
                <ConditionalForm label={"Direccion de instalacion distinta a la direccion de facturacion"} name={"checkbox"}>
                    <Grid item xs={12} xl={9}>
                        <Field fullWidth name="instalattionAddress" label="Direccion de instalacion" component={TextField} />
                    </Grid>
                    <Grid item xs={12} xl={3}>
                        <Field fullWidth name="zipCodeInstallation" label="Codigo postal" component={TextField} />
                    </Grid>
                    <Grid item xs={12} xl={6}>
                        <Field fullWidth name="municipalityInstallation" label="Municipio" component={TextField} />
                    </Grid>
                    <Grid item xs={12} xl={6}>
                        <Field fullWidth name="provinceInstallation" label="Provincia" component={TextField} />
                    </Grid>
                </ConditionalForm>
                {selectedProductHasAnyMobileStep() && (
                    <ConditionalForm label={"Direccion de entrega de tarjeta SIM"} name={"checkbox2"}>
                        <Grid item xs={12} xl={9}>
                            <Field fullWidth name="instalattionAddress2" label="Direccion de instalacion" component={TextField} />
                        </Grid>
                        <Grid item xs={12} xl={3}>
                            <Field fullWidth name="zipCodeInstallation2" label="Codigo postal" component={TextField} />
                        </Grid>
                        <Grid item xs={12} xl={6}>
                            <Field fullWidth name="municipalityInstallation2" label="Municipio" component={TextField} />
                        </Grid>
                        <Grid item xs={12} xl={6}>
                            <Field fullWidth name="provinceInstallation2" label="Provincia" component={TextField} />
                        </Grid>
                    </ConditionalForm>
                )}
            </Grid>
        </Box>
    );
}

export default {
    validationSchema: validationSchema,
    reactComponent: ClientDataStep,
    label: "Datos del cliente",
};
