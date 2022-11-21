import React, { useEffect } from "react";
import * as yup from "yup";
import { Grid } from "@mui/material";
import { useFormikContext, Field } from "formik";
import { TextField } from "formik-material-ui";
import { useSelector } from "react-redux";
import EditableField from "../form/EditableField";
import PhoneInput from "../form/PhoneInput";
import DocumentationDropZone from "../form/Dropzone";
import { countryCodes } from "../../utils/ValidationUtils";
import { isValidPhoneNumber } from "libphonenumber-js";

const validationSchema = (index) => {
    return yup.object().shape({
        collaboratorEmail: yup.string().email("Ingrese un correo electronico valido").required("El email es requerido"),
        collaboratorPhonePrefix: yup
            .string()
            .required("El prefijo es requerido")
            .test("valid-prefix", "Prefijo no valido", (value) => {
                return countryCodes.includes(value);
            }),
        collaboratorPhoneNumber: yup
            .string()
            .required("El numero es requerido")
            .test("is-valid-phone", "El formato del telefono no es valido", function (value) {
                return isValidPhoneNumber(this.options.parent.collaboratorPhonePrefix + " " + value);
            }),
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
            if (values.collaboratorPhonePrefix === "") {
                setFieldValue("collaboratorPhonePrefix", user.phone.split(" ")[0]);
            }
            if (values.collaboratorPhoneNumber === "") {
                setFieldValue("collaboratorPhoneNumber", user.phone.slice(user.phone.indexOf(" ")));
            }
        }
    }, [user]);

    return (
        <Grid container gap={2}>
            <DocumentationDropZone />
            <Field fullWidth name="observations" label="Observaciones" component={TextField} type="text" InputProps={{ sx: { height: 100 } }} />
            <Field fullWidth name="offeredPrice" label="Precio ofrecido al cliente" component={TextField} type="text" InputProps={{ sx: { height: 100 } }} />
            <EditableField>
                <Field name={"collaboratorEmail"} label={"Email colaborador"} component={TextField} type="text" sx={{ flexGrow: 1 }} onChange={(e) => setFieldValue("collaboratorEmail", e.target.value, false)} />
            </EditableField>
            <EditableField>
                <PhoneInput phonePrefixName={"collaboratorPhonePrefix"} phoneNumberName={"collaboratorPhoneNumber"} />
            </EditableField>
        </Grid>
    );
}

export default {
    validationSchema: validationSchema,
    reactComponent: DocumentationStep,
    label: "Documentacion",
};
