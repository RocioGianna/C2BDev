import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { Box, Grid, TextField } from "@mui/material";
import { fetchCollaborators } from "../../services/CollaboratorService.js";
import { Field, useFormikContext } from "formik";
import Autocomplete from "../form/CustomAutocomplete"; // Cambiar nombre de archivo

function EditableSelect({ options, name, onInputChange, label }) {
    return (
        <Field
            name={name}
            disableClearable
            options={options || []}
            component={Autocomplete}
            getOptionLabel={(option) => (option ? option : "")}
            textFieldProps={{
                label: label,
                variant: "outlined",
            }}
            onInputChange={(event, value) => {
                onInputChange(event, value);
            }}
        />
    );
}

function AdminStep() {
    const { values, errors } = useFormikContext();
    const [options, setOptions] = useState([]);

    const fetchOptions = async (value) => {
        const res = await fetchCollaborators(value);
        const mappedOptions = res.data.map((option) => `${option.userCode} - ${option.firstname} ${option.lastname}`);
        setOptions(mappedOptions);
    };

    useEffect(() => {
        if (values.collaboratorCode != "") {
            setOptions([values.collaboratorCode]);
        }
        fetchOptions();
    }, []);

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <EditableSelect options={options} name="collaboratorCode" onInputChange={(event, value) => fetchOptions(value)} label="Codigo de colaborador" />
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
