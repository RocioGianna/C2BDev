import React from "react";
import * as yup from "yup";
import { Box, Grid } from "@mui/material";
import { TextField } from "formik-material-ui";
import { Field } from "formik";
import ConditionalForm from "../form/ConditionalForm";

export function PhoneStep({ index }) {
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
            .required("El operador es requerido"),
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

/* const getLabel = () => {
    const additionals = useSelector((state) => state.formSteps);
    const additional = additionals.phoneSteps[index].mobile;

    const Label = additional.mobile ? "Telefono Movil" : "Telefono Fijo";
    return Label;
}; */

export default {
    validationSchema: validationSchema,
    reactComponent: PhoneStep,
    label: "Label",
};
