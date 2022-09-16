import React, { useEffect } from "react";
import * as yup from "yup";
import { Field, useField, useFormikContext } from "formik";
import { TextField } from "formik-material-ui";
import { Box, Grid } from "@mui/material";

import DropZone from "../DropZone";

const validationSchema = yup.object().shape({
    collaboratorEmail: yup.string().required("El email es requerido"),
    collaboratorPhone: yup.string().required("El telefono es requerido"),
});

export function DocumentationStep() {
    const email = useField("email")[0].value;
    const phone = useField("phone")[0].value;
    const { setFieldValue } = useFormikContext();

    useEffect(() => {
        setFieldValue("collaboratorEmail", email);
        setFieldValue("collaboratorPhone", phone);
    }, []);

    return (
        <Grid container gap={2}>
            <DropZone name={"documentarionFiles"} />
            <Field
                fullWidth
                name="observations"
                label="Observaciones"
                component={TextField}
                type="text"
                InputProps={{ sx: { height: 120 } }}
            />
            <Field
                fullWidth
                name="collaboratorEmail"
                label="Email colaborador"
                component={TextField}
                type="text"
            />
            <Field
                fullWidth
                name="collaboratorPhone"
                label="Telefono colaborador"
                component={TextField}
                type="text"
            />
        </Grid>
    );
}

export default {
    ValidationSchema: validationSchema,
    ReactComponent: DocumentationStep,
    Label: "Documentacion",
};
