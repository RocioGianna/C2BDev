import React, { useState } from "react";
import { Typography, Table, TableContainer, AccordionSummary, AccordionDetails, TableHead, Accordion, TableBody, TableRow, TableCell, Box, Paper, Grid } from "@mui/material";
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
            }}
        >
            <Typography
                variant="h6"
                sx={{
                    flexGrow: 1,
                    px: 2,
                    pt: 1,
                }}
            >
                Producto
            </Typography>
            <TableContainer component={Paper}>
                <Table size="small" sx={{ width: "100%" }}>
                    <TableHead>
                        <TableRow>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell sx={{ display: "flex", justifyContent: "space-between" }}>
                                <Box sx={{ flexGrow: 0, flexShrink: 0 }}>Producto</Box>
                                <Box sx={{ flexGrow: 1, textAlign: "right" }}>{row.productOption.product.name}</Box>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell sx={{ display: "flex", justifyContent: "space-between" }}>
                                <Box sx={{ flexGrow: 0, flexShrink: 0 }}>Opcion</Box>
                                <Box sx={{ flexGrow: 1, textAlign: "right" }}>{row.productOption.name}</Box>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell sx={{ display: "flex", justifyContent: "space-between", gap: 1 }}>
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
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            <Accordion expanded={expanded} onChange={() => handleChange()}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1d-content" id="panel1d-header">
                    <Typography>
                        {fixedAmount > 0 ? (fixedAmount > 1 ? `${fixedAmount} fijos` : `${fixedAmount} fijo`) : ""}
                        {mobileAmount > 0 ? (mobileAmount > 1 ? ` ${mobileAmount} moviles` : ` ${mobileAmount} movil`) : ""}
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
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
        </Paper>
    );
}
