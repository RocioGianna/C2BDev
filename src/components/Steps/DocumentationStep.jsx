import React, { useEffect } from "react";
import * as yup from "yup";
import { Grid } from "@mui/material";
import { useField, useFormikContext, Field } from "formik";
import { TextField } from "formik-material-ui";
import EditableField from "../form/EditableField";
import "yup-phone-lite";

import DocumentationDropZone from "../Dropzone";
import { useSelector } from "react-redux";

const validationSchema = (index) => {
    return yup.object().shape({
        collaboratorEmail: yup
            .string()
            .email()
            .required("El email es requerido"),
        collaboratorPhone: yup
            .string()
            .phone("IN", "El formato del telefono no es valido")
            .required("El telefono es requerido"),
        offeredPrice: yup.string().required("El precio es requerido"),
    });
};

export function DocumentationStep() {
    const { setFieldValue, values } = useFormikContext();

    const user = useSelector((state) => state.session.user);

    useEffect(() => {
        if (user) {
            if (values.collaboratorEmail === "") {
                setFieldValue("collaboratorEmail", user.email);
            }
            if (values.collaboratorPhone === "") {
                setFieldValue("collaboratorPhone", user.phone);
            }
        }
    }, [user]);

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
                label="Precio ofrecido al cliente"
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
