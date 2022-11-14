import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { Autocomplete, Box, CircularProgress, Grid, TextField } from "@mui/material";
import { fetchCollaborators } from "../../services/CollaboratorService.js";
import { useFormikContext } from "formik";

function CollaboratorCodeSelect() {
    const { setFieldValue } = useFormikContext();
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState([]);
    const loading = open && options.length === 0;

    useEffect(() => {
        let active = true;

        if (!loading) {
            return undefined;
        }

        (async () => {
            const res = await fetchCollaborators();
            console.log("res: ", res);
            res.data.map((user) => ({
                label: `${user.userCode} - ${user.firstName} ${user.lastName}`,
                value: user.userCode,
            }));
            if (active) {
                setOptions([...res.data]);
            }
        })();

        return () => {
            active = false;
        };
    }, [loading]);

    useEffect(() => {
        if (!open) {
            setOptions([]);
        }
    }, [open]);

    return (
        <Autocomplete
            id="asynchronous-demo"
            sx={{ width: "100%" }}
            open={open}
            onOpen={() => {
                setOpen(true);
            }}
            onClose={() => {
                setOpen(false);
            }}
            isOptionEqualToValue={(option, value) => option.label === value.label}
            getOptionLabel={(option) => `${option.userCode} - ${option.firstname} ${option.lastname}`}
            options={options}
            loading={loading}
            onChange={(event, value) => {
                setFieldValue("collaboratorCode", value.userCode, false); // TODO CHECK IF HAS VALUE
            }}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Codigo de colaborador"
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <React.Fragment>
                                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                {params.InputProps.endAdornment}
                            </React.Fragment>
                        ),
                    }}
                />
            )}
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
