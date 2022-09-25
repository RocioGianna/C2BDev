import React, { useEffect } from "react";
import * as yup from "yup";
import { Grid } from "@mui/material";
import { useField, useFormikContext, Field } from "formik";
import { TextField } from "formik-material-ui";
import EditableField from "../form/EditableField";

import DocumentationDropZone from "../Dropzone";

const validationSchema = (index) => {
    return yup.object().shape({
        collaboratorEmail: yup.string().required("El email es requerido"),
        collaboratorPhone: yup.string().required("El telefono es requerido"),
        offeredPrice: yup.string().required("El precio es requerido"),
    });
};

export function DocumentationStep() {
    const { setFieldValue, values } = useFormikContext();

    return (
        <Grid container gap={2}>
            <DocumentationDropZone />
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
    validationSchema: validationSchema,
    reactComponent: DocumentationStep,
    label: "Documentacion",
};
