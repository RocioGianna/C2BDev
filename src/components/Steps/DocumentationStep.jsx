import React, { useEffect } from "react";
import * as yup from "yup";
import { Field, useField, useFormikContext } from "formik";
import { TextField } from "formik-material-ui";
import { Box, Grid } from "@mui/material";
import EditableField from "../EditableField";

import DocumentationDropZone from "../DocumentationDropZone";

const validationSchema = yup.object().shape({
    collaboratorEmail: yup.string().required("El email es requerido"),
    collaboratorPhone: yup.string().required("El telefono es requerido"),
    offeredPrice: yup.string().required("El precio es requerido"),
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
            <DocumentationDropZone name={"documentarionFiles"} />
            <Field
                fullWidth
                name="observations"
                label="Observaciones"
                component={TextField}
                type="text"
                InputProps={{ sx: { height: 100 } }}
            />
            <Field
                fullWidth
                name="offeredPrice"
                label="Precio ofrecido por el cliente"
                component={TextField}
                type="text"
                InputProps={{ sx: { height: 100 } }}
            />
            <EditableField
                name={"collaboratorEmail"}
                label={"Email colaborador"}
            />
            <EditableField
                name={"collaboratorPhone"}
                label={"Telefono colaborador"}
            />
        </Grid>
    );
}

export default {
    ValidationSchema: validationSchema,
    ReactComponent: DocumentationStep,
    Label: "Documentacion",
};
