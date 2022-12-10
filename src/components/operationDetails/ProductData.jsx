import React, { useState } from "react";
import { Typography, Stack, Box, Paper, Divider, Accordion, AccordionSummary, AccordionDetails, Grid } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import OperationProductDetails from "./OperationProductDetails";

export function ProductData({ row }) {
    const handleChange = () => {
        setExpanded(!expanded);
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

    let operationDetails = row.operationDetails;
    operationDetails = [...operationDetails].sort((a, b) => a.id - b.id);
    const [expanded, setExpanded] = useState(true);
    const phoneSteps = getAllSteps();
    const mobileAmount = phoneSteps.filter((step) => step.mobile === true).length;
    const fixedAmount = phoneSteps.length - mobileAmount;

    return (
        <Paper
            sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                p: 2,
            }}>
            <Accordion expanded={expanded} onChange={() => handleChange()} square elevation={0}>
                <AccordionSummary sx={{ p: 0 }} expandIcon={<ExpandMoreIcon />} aria-controls="panel1d-content" id="panel1d-header">
                    <Typography>
                        {fixedAmount > 0 ? (fixedAmount > 1 ? `${fixedAmount} fijos` : `${fixedAmount} fijo`) : ""}
                        {mobileAmount > 0 ? (mobileAmount > 1 ? ` ${mobileAmount} moviles` : ` ${mobileAmount} movil`) : ""}
                    </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ p: 0 }}>
                    <Grid container spacing={1}>
                        {operationDetails.map((opDetail, index) => {
                            const step = phoneSteps.find((step) => {
                                return opDetail.stepId === step.id;
                            });
                            const type = opDetail.type === "NEW" ? "Nuevo" : opDetail.type === "PORTABILITY" ? "Portabilidad" : "Existente";
                            const additionalData = { ...opDetail, type, step };
                            return <OperationProductDetails key={index} operationId={row.id} operationDetail={additionalData} />;
                        })}
                    </Grid>
                </AccordionDetails>
            </Accordion>
        </Paper>
    );
}
