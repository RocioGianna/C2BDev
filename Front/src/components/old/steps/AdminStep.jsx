import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { Box, Grid } from "@mui/material";
import { fetchCollaborators } from "../../../services/CollaboratorService.js";
import { EditableSelect } from "../form/EditableSelect.jsx";

function AdminStep() {
    const [options, setOptions] = useState([]);

    useEffect(() => {
        fetchOptions();
    }, []);

    const fetchOptions = async (value) => {
        const res = await fetchCollaborators(value);
        const mappedOptions = res.data.map((option) => {
            return { ...option, label: `${option.userCode} - ${option.firstName} ${option.lastName}` };
        });
        setOptions(mappedOptions);
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <EditableSelect options={options} name="collaborator" onInputChange={(event, value) => fetchOptions(value)} getOptionLabel={(option) => (!option || option === "" ? "" : option.label)} label="Codigo de colaborador" />
                </Grid>
            </Grid>
        </Box>
    );
}

const validationSchema = (index) => {
    return yup.object().shape({ collaborator: yup.object().required("El código de colaborador es requerido") });
};

export default {
    validationSchema: validationSchema,
    reactComponent: AdminStep,
    label: "Administrador",
};
