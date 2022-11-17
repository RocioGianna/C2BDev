import React from "react";
import { Typography, Table, TableContainer, AccordionSummary, Card, AccordionDetails, TableHead, Accordion, TableBody, TableRow, TableCell, Paper, Box, Grid, Divider } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function AdditionalPreview({ additional }) {
    console.log({ additional });
    let step = additional.step;
    let type = additional.type;

    let changeOwner = additional.currentOwnerFirstname != null;

    return (
        <Grid item xs={12}>
            <Card
                variant="outlined"
                sx={{
                    px: 2,
                    py: 1,
                    textAlign: "center",
                    width: "100%",
                    height: "100%",
                }}
            >
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <strong>{step.name}</strong>
                    {additional.phone && <Typography variant="subtitle2">{additional.phone}</Typography>}
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography variant="subtitle2">{type}</Typography>
                    {additional.currentProvider && <Typography variant="subtitle2">{additional.currentProvider}</Typography>}
                </Box>
                {changeOwner && (
                    <>
                        <Divider sx={{ my: 1 }} />
                        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                            <Typography variant="subtitle2">Cambio de titular</Typography>
                            <Typography variant="subtitle2">
                                {additional.currentOwnerFirstname} {additional.currentOwnerLastname}, {additional.currentOwnerNID}
                            </Typography>
                        </Box>
                    </>
                )}
            </Card>
        </Grid>
    );
}

export function ProductData({ row }) {
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

    let operationDetails = row.operationDetails;
    const [expanded, setExpanded] = React.useState("panel1");
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
                        <TableRow key={1}>
                            <TableCell sx={{ display: "flex", justifyContent: "space-between" }}>
                                <div>Producto</div>
                                <div>{row.productOption.product.name}</div>
                            </TableCell>
                        </TableRow>
                        <TableRow key={2}>
                            <TableCell sx={{ display: "flex", justifyContent: "space-between" }}>
                                <div>Opcion</div>
                                <div>{row.productOption.name}</div>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                    <Accordion expanded={expanded === "panel1"} onChange={handleChange("panel1")}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1d-content" id="panel1d-header">
                            <Typography>
                                {fixedAmount > 0 ? (fixedAmount > 1 ? `${fixedAmount} fijos` : `${fixedAmount} fijo`) : ""}
                                {mobileAmount > 0 ? (mobileAmount > 1 ? ` ${mobileAmount} moviles` : ` ${mobileAmount} movil`) : ""}
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid container spacing={1}>
                                {operationDetails.map((opDetail, index) => {
                                    const step = phoneSteps.find((step) => opDetail.stepId === step.id);
                                    const type = opDetail.type === "NEW" ? "Nuevo" : opDetail.type === "PORTABILITY" ? "Portabilidad" : "Existente";
                                    let additionalData = { ...opDetail, type, step };
                                    return <AdditionalPreview key={index} additional={additionalData} />;
                                })}
                            </Grid>
                        </AccordionDetails>
                    </Accordion>
                </Table>
            </TableContainer>
        </Paper>
    );
}
