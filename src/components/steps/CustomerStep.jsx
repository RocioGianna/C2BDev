import React from "react";
import { Box, Grid } from "@mui/material";
import { TextField } from "formik-material-ui";
import { Field, useField, useFormikContext } from "formik";
import ConditionalForm from "../form/ConditionalForm";
import * as yup from "yup";
import PhoneInput from "../form/PhoneInput";
import { isValidPhoneNumber } from "libphonenumber-js";
import { countryCodes } from "../../utils/ValidationUtils";
import { useSelector } from "react-redux";

const validationSchema = () => {
    return yup.object().shape({
        customerName: yup.string().required("El nombre es requerido"),
        customerLastname: yup.string().required("El apellido es requerido"),
        nid: yup.string().required("El DNI / NIE / CIF / NIF es requerido"),
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
        billingZipCode: yup.string("Ingrese su codigo postal").required("El codigo postal es requerido"),
        billingMunicipality: yup.string("Ingrese su municipio").required("El municipio es requerido"),
        billingProvince: yup.string("Ingrese su provincia").required("La provincia es requerida"),
        installationAddress: yup.string("Ingrese su direccion de instalacion").when("differentInstallAddress", {
            is: true,
            then: yup
                .string()
                .required("La direccion de instalacion es requerida")
                .notOneOf([yup.ref("billingAddress")], "Las direcciones no deben coincidir"),
        }),
        installationZipCode: yup.string("Ingrese su codigo postal de instalacion").when("differentInstallAddress", {
            is: true,
            then: yup.string().required("El codigo postal de instalacion es requerido"),
        }),
        installationMunicipality: yup.string("Ingrese su municipio de instalacion").when("differentInstallAddress", {
            is: true,
            then: yup.string().required("El municipio de instalacion es requerido"),
        }),
        installationProvince: yup.string("Ingrese su provincia de instalacion").when("differentInstallAddress", {
            is: true,
            then: yup.string().required("La provincia de instalacion es requerida"),
        }),
        shippingAddress: yup.string("Ingrese su direccion de instalacion").when("differentShippingAddress", {
            is: true,
            then: yup
                .string()
                .required("La direccion de instalacion es requerida")
                .notOneOf([yup.ref("billingAddress")], "Las direcciones no deben coincidir"),
        }),
        shippingZipCode: yup.string("Ingrese su codigo postal de instalacion").when("differentShippingAddress", {
            is: true,
            then: yup.string().required("El codigo postal de instalacion es requerido"),
        }),
        shippingMunicipality: yup.string("Ingrese su municipio de instalacion").when("differentShippingAddress", {
            is: true,
            then: yup.string().required("El municipio de instalacion es requerido"),
        }),
        shippingProvince: yup.string("Ingrese su provincia de instalacion").when("differentShippingAddress", {
            is: true,
            then: yup.string().required("La provincia de instalacion es requerida"),
        }),
    });
};

function CustomerStep(props) {
    const [differentInstallAddress] = useField("differentInstallAddress");
    const [differentShippingAddress] = useField("differentShippingAddress");

    function selectedProductHasAnyMobileStep() {
        const phoneSteps = useSelector((state) => state.formSteps.phoneSteps);
        return phoneSteps.some((step) => step.mobile === true);
    }

    const { errors } = useFormikContext();

    return (
        <Box sx={{ flexGrow: 1 }} label={props.label}>
            <Grid container spacing={2}>
                <Grid item xs={12} xl={6}>
                    <Field fullWidth name="customerName" label="Nombres del Cliente" component={TextField} />
                </Grid>
                <Grid item xs={12} xl={6}>
                    <Field fullWidth name="customerLastname" label="Apellidos del Cliente" component={TextField} />
                </Grid>
                <Grid item xs={12} xl={6}>
                    <Field fullWidth name="nid" label="DNI / NIE / CIF / NIF" component={TextField} />
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
                    <Field fullWidth name="billingZipCode" label="Codigo Postal" component={TextField} />
                </Grid>
                <Grid item xs={12} xl={6}>
                    <Field fullWidth name="billingMunicipality" label="Municipio" component={TextField} />
                </Grid>
                <Grid item xs={12} xl={6}>
                    <Field fullWidth name="billingProvince" label="Provincia" component={TextField} />
                </Grid>
                <ConditionalForm label={"Direccion de instalacion distinta a la direccion de facturacion"} name={"differentInstallAddress"}>
                    <Grid item xs={12} xl={9}>
                        <Field fullWidth name="installationAddress" label="Direccion de instalacion" component={TextField} />
                    </Grid>
                    <Grid item xs={12} xl={3}>
                        <Field fullWidth name="installationZipCode" label="Codigo postal" component={TextField} />
                    </Grid>
                    <Grid item xs={12} xl={6}>
                        <Field fullWidth name="installationMunicipality" label="Municipio" component={TextField} />
                    </Grid>
                    <Grid item xs={12} xl={6}>
                        <Field fullWidth name="installationProvince" label="Provincia" component={TextField} />
                    </Grid>
                </ConditionalForm>
                {selectedProductHasAnyMobileStep() && (
                    <ConditionalForm label={"Direccion de entrega de tarjeta SIM"} name={"differentShippingAddress"}>
                        <Grid item xs={12} xl={9}>
                            <Field fullWidth name="shippingAddress" label="Direccion de instalacion" component={TextField} />
                        </Grid>
                        <Grid item xs={12} xl={3}>
                            <Field fullWidth name="shippingZipCode" label="Codigo postal" component={TextField} />
                        </Grid>
                        <Grid item xs={12} xl={6}>
                            <Field fullWidth name="shippingMunicipality" label="Municipio" component={TextField} />
                        </Grid>
                        <Grid item xs={12} xl={6}>
                            <Field fullWidth name="shippingProvince" label="Provincia" component={TextField} />
                        </Grid>
                    </ConditionalForm>
                )}
            </Grid>
        </Box>
    );
}

export default {
    validationSchema: validationSchema,
    reactComponent: CustomerStep,
    label: "Datos del cliente",
};
