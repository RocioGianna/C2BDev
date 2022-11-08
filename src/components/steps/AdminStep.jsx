import React from "react";
import * as yup from "yup";
import { Box, Grid } from "@mui/material";
import { Field } from "formik";
import { TextField } from "formik-material-ui";

function AdminStep() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Field fullWidth name="collaboratorCode" label="Código de Colaborador" component={TextField} />
                </Grid>
            </Grid>
        </Box>
    );
}

const onSubmit = async (values, setFieldValue) => {};

const validationSchema = (index) => {
    return yup.object().shape({
        collaboratorCode: yup.string().required("El código de colaborador es requerido"),
    });
};

export default {
    validationSchema: validationSchema,
    reactComponent: AdminStep,
    label: "Administrador",
    onSubmit: onSubmit,
};
