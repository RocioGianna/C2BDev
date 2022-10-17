import React, { useEffect } from "react";
import * as yup from "yup";
import { Grid } from "@mui/material";
import { useField, useFormikContext, Field } from "formik";
import { TextField } from "formik-material-ui";
import EditableField from "../form/EditableField";

import DocumentationDropZone from "../Dropzone";
import { useSelector } from "react-redux";

import PhoneInput from "../form/PhoneInput";
import { countryCodes } from "../../utils/ValidationUtils";
import { isValidPhoneNumber } from "libphonenumber-js";

const validationSchema = (index) => {
    return yup.object().shape({
        collaboratorEmail: yup
            .string()
            .email()
            .required("El email es requerido"),
        collaboratorphonePrefix: yup
            .string()
            .required("El prefijo es requerido")
            .test("valid-prefix", "Prefijo no valido", (value) => {
                console.log("value" + value);
                return countryCodes.includes(value);
            }),
        collaboratorphoneNumber: yup
            .string()
            .required("El numero es requerido")
            .test(
                "is-valid-phone",
                "El formato del telefono no es valido",
                function (value) {
                    console.log("value" + value);

                    return isValidPhoneNumber(
                        this.options.parent.phonePrefix + " " + value
                    );
                }
            ),
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

            console.log(user);
            /* if (values.collaboratorPhonePrefix === "") {
                setFieldValue("collaboratorPhone", user.phone);
            }
            if (values.collaboratorPhoneNumber === "") {
                setFieldValue("collaboratorPhone", user.phone);
            } */
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
            <EditableField>
                <PhoneInput
                    phonePrefixName={"collaboratorPhonePrefix"}
                    phoneNumberName={"collaboratorPhoneNumber"}
                />
            </EditableField>
        </Grid>
    );
}

export default {
    validationSchema: validationSchema,
    reactComponent: DocumentationStep,
    label: "Documentacion",
};
