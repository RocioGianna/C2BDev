import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { Typography, Box } from "@mui/material";
import { Formik, Form } from "formik";
import { fetchProcessors } from "../../services/CollaboratorService";
import { EditableSelect } from "../form/EditableSelect.jsx";

export function ProcessorSelect({ operation }) {
    const [processors, setProcessors] = useState([]);
    

    const validationSchema = {
        processor: yup.string().required("El código de colaborador es requerido"),
    };

    const initialValues = {
        processor: operation.processor || "",
    };

    useEffect(() => {
        fetchOptions();
    }, []);

    const fetchOptions = async (value) => {
        const res = await fetchProcessors(value);
        const mappedOptions = res.data.map((option) => {
            return { ...option, label: `${option.userCode} - ${option.firstname} ${option.lastname}` };
        });
        setProcessors(mappedOptions);
    };

    return (
        <Formik
            validationSchema={() => yup.object().shape(validationSchema)}
            onSubmit={async (values, helpers) => {
                console.log(values.processor);
            }}
            initialValues={initialValues}
        >
            {({ setFieldValue, values }) => (
                <Form>
                    {console.log(values.processor)}
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Typography variant="subtitle2" sx={{ mr: 1, alignItems: "center" }}>
                            Tramitadora
                        </Typography>
                        <EditableSelect name={"processor"} options={processors} small getOptionLabel={(option) => option.firstname || " "} onInputChange={(event, value) => fetchOptions(value.userCode)} />
                    </Box>
                </Form>
            )}
        </Formik>
    );
}
