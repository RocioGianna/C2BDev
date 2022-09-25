import React from "react";
import * as yup from "yup";
import { Box, Grid, MenuItem } from "@mui/material";
import { TextField } from "formik-material-ui";
import { Field, useField } from "formik";
import ConditionalForm from "../form/ConditionalForm";
import FormSelect from "../form/FormSelect";

export function PhoneStep({ index }) {
    const [operationType] = useField(`phoneStep_${index}_phoneOperationType`);
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <FormSelect
                        name={`phoneStep_${index}_phoneOperationType`}
                        label="Tipo de Operacion"
                    >
                        <MenuItem value={"Nuevo"}>Nuevo</MenuItem>
                        <MenuItem value={"Portabilidad"}>Portabilidad</MenuItem>
                        <MenuItem value={"Existente"}>Existente</MenuItem>
                    </FormSelect>
                </Grid>
                <Grid item xs={12}>
                    <Field
                        fullWidth
                        name={`phoneStep_${index}_phone`}
                        label="Numero Fijo Actual"
                        component={TextField}
                    />
                </Grid>
                {operationType.value === "Portabilidad" && (
                    <Grid item xs={12}>
                        <Field
                            fullWidth
                            name={`phoneStep_${index}_phoneOperator`}
                            label="Operador Actual Fijo"
                            component={TextField}
                        />
                    </Grid>
                )}

                <ConditionalForm
                    label={"Cambio de titular de telefono fijo"}
                    name={`phoneStep_${index}_changePhoneOwner`}
                >
                    <Grid item xs={12}>
                        <Field
                            fullWidth
                            name={`phoneStep_${index}_surname`}
                            label="Apellido titular actual"
                            component={TextField}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Field
                            fullWidth
                            name={`phoneStep_${index}_name`}
                            label="Nombre titular actual"
                            component={TextField}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Field
                            fullWidth
                            name={`phoneStep_${index}_dni`}
                            label="DNI titular actual"
                            component={TextField}
                        />
                    </Grid>
                </ConditionalForm>
            </Grid>
        </Box>
    );
}

const validationSchema = (index) => {
    return yup.object().shape({
        [`phoneStep_${index}_phoneOperationType`]: yup
            .string()
            .required("El tipo de operacion es requerido"),
        [`phoneStep_${index}_phone`]: yup
            .string()
            .required("El telefono es requerido"),
        [`phoneStep_${index}_phoneOperator`]: yup
            .string()
            .when(`phoneStep_${index}_phoneOperationType`, (opType) => {
                if (opType == "Portabilidad") {
                    return yup.string().required("El operador es obligatorio");
                }
            }),
        [`phoneStep_${index}_surname`]: yup
            .string()
            .when(`phoneStep_${index}_changePhoneOwner`, {
                is: true,
                then: yup.string().required("El apellido es requerido"),
            }),
        [`phoneStep_${index}_name`]: yup
            .string()
            .when(`phoneStep_${index}_changePhoneOwner`, {
                is: true,
                then: yup.string().required("El nombre es requerido"),
            }),
        [`phoneStep_${index}_dni`]: yup
            .string()
            .when(`phoneStep_${index}_changePhoneOwner`, {
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
