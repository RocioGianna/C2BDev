import React, { useEffect, useState } from "react";
import { Typography, Box, MenuItem } from "@mui/material";
import { fetchProcessors } from "../../services/CollaboratorService";
import { EditableDetailField } from "../EditableDetailField";

export function ProcessorSelect({ processor, operationStatus }) {
    const [processors, setProcessors] = useState([]);

    const column = "PROCESSOR";

    useEffect(() => {
        fetchOptions();
    }, []);

    const fetchOptions = async(value) => {
        const res = await fetchProcessors(value);
        const mappedOptions = res.data.map((option) => {
            return { value: option.id, label: `${option.userCode} - ${option.firstName} ${option.lastName}`, userCode: option.userCode };
        });
        setProcessors(mappedOptions);
    };

    return (
        <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="subtitle2" sx={{ mr: 1, alignItems: "center" }}>
                Tramitadora
            </Typography>
            <EditableDetailField value={processor?.userCode} name={"processor"} operationStatus={operationStatus} column={column} type={"select"} small>
                {processors.length > 0 && processors.map((processor, index) => <MenuItem value={processor.userCode} key={index}>{processor.userCode}</MenuItem>)}
            </EditableDetailField>
        </Box>
    );
}
