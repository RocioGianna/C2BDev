import React from "react";
import * as yup from "yup";
import { Box, Grid } from "@mui/material";
import { TextField } from "formik-material-ui";
import { Field } from "formik";
import ConditionalForm from "./ConditionalForm";

const validationSchema = yup.object().shape({});

export function AdditionalStep() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Field
                        fullWidth
                        name="phoneOperationType"
                        label="Tipo de Operacion"
                        component={TextField}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Field
                        fullWidth
                        name="phone"
                        label="Numero Fijo Actual"
                        component={TextField}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Field
                        fullWidth
                        name="phoneOperator"
                        label="OPerador Actual Fijo"
                        component={TextField}
                    />
                </Grid>
                <ConditionalForm
                    label={
                        "Direccion de instalacion distinta a la direccion de facturacion"
                    }
                    fieldValue={field.value}
                ></ConditionalForm>
            </Grid>
        </Box>
    );
}

export default {
    ValidationSchema: validationSchema,
    ReactComponent: AdditionalStep,
    Label: "Telefono fijo",
};
