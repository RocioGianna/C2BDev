import React from "react";
import * as yup from "yup";
import {Autocomplete, Box, CircularProgress, Grid,TextField} from "@mui/material";
// import { TextField } from "formik-material-ui";

function sleep(delay = 0) {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    });
}


function CollaboratorCodeSelect(){
    const collaboratorIds = ["001","002"]

    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState([]);
    const loading = open && options.length === 0;

    React.useEffect(() => {
        let active = true;

        if (!loading) {
            return undefined;
        }

        (async () => {
            await sleep(1e3); // For demo purposes.

            if (active) {
                setOptions([...collaboratorIds]);
            }
        })();

        return () => {
            active = false;
        };
    }, [loading]);

    React.useEffect(() => {
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
            isOptionEqualToValue={(option, value) => option.title === value.title}
            getOptionLabel={(option) => option.title}
            options={options}
            loading={loading}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Asynchronous"
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
