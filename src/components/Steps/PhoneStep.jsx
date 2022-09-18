import React, { useEffect } from "react";
import * as yup from "yup";
import { Box, Grid } from "@mui/material";
import { TextField } from "formik-material-ui";
import { Field, useField, useFormikContext } from "formik";
import ConditionalForm from "./ConditionalForm";

export function PhoneStep({ index, type }) {
    const [phoneCheckbox] = useField(`phoneStep_${index}_changePhoneOwner`);

    const { setFieldValue } = useFormikContext();

    useEffect(() => {
        setFieldValue(`phoneStep_${index}_phoneOperationType`, "", false);
        setFieldValue(`phoneStep_${index}_phone`, "", false);
        setFieldValue(`phoneStep_${index}_phoneOperator`, "", false);
        setFieldValue(`phoneStep_${index}_surname`, "", false);
        setFieldValue(`phoneStep_${index}_name`, "", false);
        setFieldValue(`phoneStep_${index}_dni`, "", false);
        setFieldValue(`phoneStep_${index}_changePhoneOwner`, false, false);
    }, []);

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Field
                        fullWidth
                        name={`phoneStep_${index}_phoneOperationType`}
                        label="Tipo de Operacion"
                        component={TextField}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Field
                        fullWidth
                        name={`phoneStep_${index}_phone`}
                        label="Numero Fijo Actual"
                        component={TextField}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Field
                        fullWidth
                        name={`phoneStep_${index}_phoneOperator`}
                        label="Operador Actual Fijo"
                        component={TextField}
                    />
                </Grid>
                <ConditionalForm
                    label={"Cambio de titular de telefono fijo"}
                    fieldValue={phoneCheckbox}
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
            .required("El operador es requerido"),
        [`phoneStep_${index}_surname`]: yup
            .string()
            .required("El apellido es requerido"),
        [`phoneStep_${index}_name`]: yup
            .string()
            .required("El nombre es requerido"),
        [`phoneStep_${index}_dni`]: yup
            .string()
            .required("El DNI es requerido"),
    });
};

export default {
    ValidationSchema: validationSchema,
    ReactComponent: PhoneStep,
    Label: "Telefono fijo",
};
