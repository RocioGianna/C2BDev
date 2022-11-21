import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { Box, Grid, Autocomplete, TextField } from "@mui/material";
import { fetchCollaborators } from "../../services/CollaboratorService.js";
import { Field, useFormikContext } from "formik";

function EditableSelect({ options, fieldName, disabled, onInputChange }) {
    const { setFieldValue, values } = useFormikContext();

    if (!options) return null;

    console.log(values);

    return (
        <Autocomplete
            id="combo-box-demo"
            options={options}
            disablePortal
            name={fieldName}
            sx={{ width: "100%" }}
            getOptionLabel={(option) => {
                if (option) return option.userCode;
                return "";
            }}
            onChange={(e, value) => {
                setFieldValue(fieldName, value.userCode);
            }}
            onInputChange={onInputChange}
            ListboxProps={{ style: { maxHeight: 200 } }}
            includeInputInList
            disabled={disabled}
            renderInput={(params) => <TextField {...params} fullWidth label="Colaboradores" name={fieldName} variant="outlined" />}
        />
    );
}

function AdminStep() {
    const [options, setOptions] = useState([]);

    const fetchOptions = async (value) => {
        const res = await fetchCollaborators(value);
        setOptions(res.data);
    };

    useEffect(() => {
        fetchOptions();
    }, []);

    const onInputChange = (event, value) => {
        if (value.length > 0) {
            fetchOptions(value);
        }
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <EditableSelect options={options} onInputChange={onInputChange} fieldName={"collaboratorCode"} />
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
