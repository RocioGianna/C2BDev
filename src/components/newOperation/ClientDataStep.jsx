import React from "react";
import { Box, Grid } from "@mui/material";
import { TextField, CheckboxWithLabel } from "formik-material-ui";
import { Field } from "formik";
import ConditionalForm from "./ConditionalForm";

export default function ClientDataStep(props) {
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
                            label="Codigo postal correspondiente a la direccion de instalacion"
                            component={TextField}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Field
                            fullWidth
                            name="municipalityInstallation"
                            label="Municipio correspondiente a la direccion de instalacion"
                            component={TextField}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Field
                            fullWidth
                            name="provinceInstallation"
                            label="Provincia correspondiente a la direccion de instalacion"
                            component={TextField}
                        />
                    </Grid>
                </ConditionalForm>
            </Grid>
        </Box>
    );
}
