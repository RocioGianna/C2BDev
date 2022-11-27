import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { Typography, Box, MenuItem } from "@mui/material";
import { Formik, Form } from "formik";
import { fetchProcessors } from "../../services/CollaboratorService";
import { EditableSelect } from "../form/EditableSelect.jsx";
import { EditableDetailField } from "../EditableDetailField";

export function ProcessorSelect({ processor, operationStatus }) {
    const [processors, setProcessors] = useState([]);

    const permissionNeeded = "PROCESSOR";

    useEffect(() => {
        fetchOptions();
    }, []);

    const fetchOptions = async (value) => {
        const res = await fetchProcessors(value);
        console.log({ res });
        const mappedOptions = res.data.map((option) => {
            return { ...option, label: `${option.userCode} - ${option.firstname} ${option.lastname}` };
        });
        setProcessors(mappedOptions);
    };

    return (
        <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="subtitle2" sx={{ mr: 1, alignItems: "center" }}>
                Tramitadora
            </Typography>
            <EditableDetailField name={"processor"} value={processor} operationStatus={operationStatus} permissionNeeded={permissionNeeded} type={"select"} small>
                {processors.length > 0 && processors.map((processor) => <MenuItem value={processor}>{processor.label}</MenuItem>)}
            </EditableDetailField>
        </Box>
    );
}
