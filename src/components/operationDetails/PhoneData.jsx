import React from "react";
import { Typography, Paper, Accordion, AccordionDetails, AccordionSummary } from "@mui/material";

export function PhoneData({ row }) {
    const [expanded, setExpanded] = React.useState("panel1");

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    const getAllSteps = () => {
        const res = [];
        const steps = row.additionalProducts || [];
        steps.forEach((step) => {
            res.push(...step.steps);
        });
        res.push(...row.productOption.steps);
        return res;
    };

    const phoneSteps = getAllSteps();
    const mobileAmount = phoneSteps.filter((step) => step.mobile === true).length;
    const fixedAmount = phoneSteps.length - mobileAmount;

    return (
        <Paper
            sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                height: "100%",
            }}
        >
            <Accordion expanded={expanded === "panel1"} onChange={handleChange("panel1")}>
                <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                    <Typography>
                        {fixedAmount > 0 && `Telefonos fijos : ${fixedAmount}`}
                        {mobileAmount > 0 && `Telefonos moviles : ${mobileAmount}`}
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {row.operationDetails.map((opDetail) => {
                        const step = phoneSteps.find((step) => opDetail.stepId === step.id);
                        const type = opDetail.type === "NEW" ? "NUEVO" : opDetail.type === "PORTABILITY" ? "PORTABILIDAD" : "EXISTENTE";
                        return (
                            <>
                                <Typography variant="h6">{step.name}</Typography>
                                <Typography variant="subtitle2">Tipo : {type}</Typography>
                                {opDetail.phone && <Typography variant="subtitle2">Telefono : {opDetail.phone}</Typography>}
                                {opDetail.currentOwnerfirstName && (
                                    <Typography variant="subtitle2">
                                        Nombre Titular actual : {opDetail.currentOwnerfirstName} {opDetail.currentOwnerlastName}
                                    </Typography>
                                )}
                                {opDetail.currentOwnerNID && <Typography variant="subtitle2">DNI Titular Actual : {opDetail.currentOwnerNID}</Typography>}
                                {opDetail.currentProvider && <Typography variant="subtitle2">Proveedor Actual : {opDetail.currentProvider}</Typography>}
                            </>
                        );
                    })}
                </AccordionDetails>
            </Accordion>
        </Paper>
    );
}
