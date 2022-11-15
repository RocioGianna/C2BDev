import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { Box, Grid } from "@mui/material";
import FAutocomplete from "../form/FAutocomplete";
import { fetchCollaborators, fetchCollaboratorsById } from "../../services/CollaboratorService.js";
import { Field, useFormikContext } from "formik";

function CollaboratorCodeSelect() {
    const [options, setOptions] = useState([]);
    const [value, setValue] = useState();
    const { values } = useFormikContext();

    console.log(values);

    useEffect(() => {
        if (value) {
            fetchCollaboratorsById(value).then((res) => setOptions(res.data));
        } else {
            fetchCollaborators().then((res) => setOptions(res.data));
        }
    }, [value]);

    const mappedOptions = options.map((option) => `${option.userCode} - ${option.firstname} ${option.lastname}`);

    console.log(options);

    return (
        <Field
            name="collaboratorCode"
            disableClearable
            options={mappedOptions || []}
            component={FAutocomplete}
            getOptionLabel={(option) => {
                if (option) return option;
                return "";
            }}
            textFieldProps={{
                label: "Codigo de colaborador",
                required: true,
                variant: "outlined",
            }}
            onInputChange={(event, value) => {
                setValue(value);
            }}
        />
    );
}

function AdminStep() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <CollaboratorCodeSelect />
                </Grid>
            </Grid>
        </Box>
    );
}

const onSubmit = async (values, setFieldValue) => {};

const validationSchema = (index) => {
    return yup.object().shape({
        collaboratorCode: yup.string().required("El código de colaborador es requerido"),
    });
};

export default {
    validationSchema: validationSchema,
    reactComponent: AdminStep,
    label: "Administrador",
    onSubmit: onSubmit,
};
