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
            }}
        >
            <Typography variant="h6">Producto</Typography>
            <Stack direction="column">
                <Box sx={{ display: "flex", justifyContent: "space-between", py: 0.75, px: 1 }}>
                    <Box sx={{ flexGrow: 0, flexShrink: 0 }}>Producto</Box>
                    <Box sx={{ flexGrow: 1, textAlign: "right" }}>{row.productOption.product.name}</Box>
                </Box>
                <Divider />

                <Box sx={{ display: "flex", justifyContent: "space-between", py: 0.75, px: 1 }}>
                    <Box sx={{ flexGrow: 0, flexShrink: 0 }}>Opcion</Box>
                    <Box sx={{ flexGrow: 1, textAlign: "right" }}>{row.productOption.name}</Box>
                </Box>
                <Divider />

                <Box sx={{ display: "flex", justifyContent: "space-between", gap: 1, py: 0.75, px: 1 }}>
                    <Box sx={{ flexGrow: 0, flexShrink: 0 }}>Adicionales</Box>
                    <Box sx={{ flexGrow: 1, textAlign: "right" }}>
                        <Box sx={{ width: "100%", textAlign: "right" }}>
                            {row.additionalProducts && row.additionalProducts.length > 0 ? (
                                row.additionalProducts.map((a, index) => {
                                    return index > 0 ? <span key={index}>, {a.name}</span> : <span key={index}>{a.name}</span>;
                                })
                            ) : (
                                <div>-</div>
                            )}
                        </Box>
                    </Box>
                </Box>
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
                                    console.log(step);
                                    return opDetail.stepId === step.id;
                                });
                                const type = opDetail.type === "NEW" ? "Nuevo" : opDetail.type === "PORTABILITY" ? "Portabilidad" : "Existente";
                                let additionalData = { ...opDetail, type, step };
                                return <OperationProductDetails key={index} additional={additionalData} />;
                            })}
                        </Grid>
                    </AccordionDetails>
                </Accordion>
            </Stack>
        </Paper>
    );
}
