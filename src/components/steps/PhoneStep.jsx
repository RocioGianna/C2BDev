import React from "react";
import * as yup from "yup";
import { Box, Grid, MenuItem } from "@mui/material";
import { TextField } from "formik-material-ui";
import { Field, useField } from "formik";
import ConditionalForm from "../form/ConditionalForm";
import FormSelect from "../form/FormSelect";
import { countryCodes } from "../../utils/ValidationUtils";
import { isValidPhoneNumber } from "libphonenumber-js";
import PhoneInput from "../form/PhoneInput";

export function PhoneStep({ index }) {
    const [operationType] = useField(`phoneStep_${index}_phoneOperationType`);

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <FormSelect name={`phoneStep_${index}_phoneOperationType`} label="Tipo de Operacion">
                        <MenuItem value={"NEW"}>Nuevo</MenuItem>
                        <MenuItem value={"PORTABILITY"}>Portabilidad</MenuItem>
                        <MenuItem value={"EXISTING"}>Existente</MenuItem>
                    </FormSelect>
                </Grid>
                {operationType.value !== "NEW" && operationType.value !== "" && (
                    <Grid item xs={12}>
                        <PhoneInput phonePrefixName={`phoneStep_${index}_phonePrefix`} phoneNumberName={`phoneStep_${index}_phoneNumber`} />
                    </Grid>
                )}
                {operationType.value === "PORTABILITY" && operationType.value !== "" && (
                    <Grid item xs={12}>
                        <Field fullWidth name={`phoneStep_${index}_phoneOperator`} label="Operador Actual Fijo" component={TextField} />
                    </Grid>
                )}
                {operationType.value !== "NEW" && operationType.value !== "" && (
                    <ConditionalForm label={"Cambio de titular"} name={`phoneStep_${index}_changePhoneOwner`}>
                        <Grid item xs={12}>
                            <Field fullWidth name={`phoneStep_${index}_name`} label="Nombre titular actual" component={TextField} />
                        </Grid>
                        <Grid item xs={12}>
                            <Field fullWidth name={`phoneStep_${index}_lastname`} label="Apellido titular actual" component={TextField} />
                        </Grid>
                        <Grid item xs={12}>
                            <Field fullWidth name={`phoneStep_${index}_nid`} label="DNI titular actual" component={TextField} />
                        </Grid>
                    </ConditionalForm>
                )}
            </Grid>
        </Box>
    );
}

const validationSchema = (index) => {
    return yup.object().shape({
        [`phoneStep_${index}_phoneOperationType`]: yup.string().required("El tipo de operacion es requerido"),
        [`phoneStep_${index}_phonePrefix`]: yup.string().when(`phoneStep_${index}_phoneOperationType`, (opType) => {
            if (opType !== "NEW") {
                return yup
                    .string()
                    .required("El prefijo es requerido")
                    .test("valid-prefix", "Prefijo no valido", (value) => {
                        return countryCodes.includes(value);
                    });
            }
        }),
        [`phoneStep_${index}_phoneNumber`]: yup.string().when(`phoneStep_${index}_phoneOperationType`, (opType) => {
            if (opType !== "NEW") {
                return yup
                    .string()
                    .required("El numero es requerido")
                    .test("is-valid-phone", "El formato del telefono no es valido", function (value) {
                        return isValidPhoneNumber(this.options.parent.phonePrefix + " " + value);
                    });
            }
        }),
        [`phoneStep_${index}_phoneOperator`]: yup.string().when(`phoneStep_${index}_phoneOperationType`, (opType) => {
            if (opType == "PORTABILITY") {
                return yup.string().required("El operador es obligatorio");
            }
        }),
        [`phoneStep_${index}_lastname`]: yup.string().when(`phoneStep_${index}_changePhoneOwner`, {
            is: true,
            then: yup.string().required("El apellido es requerido"),
        }),
        [`phoneStep_${index}_name`]: yup.string().when(`phoneStep_${index}_changePhoneOwner`, {
            is: true,
            then: yup.string().required("El nombre es requerido"),
        }),
        [`phoneStep_${index}_nid`]: yup.string().when(`phoneStep_${index}_changePhoneOwner`, {
            is: true,
            then: yup.string().required("El DNI es requerido"),
        }),
    });
};

export default {
    validationSchema: validationSchema,
    reactComponent: PhoneStep,
    label: "Label",
};
