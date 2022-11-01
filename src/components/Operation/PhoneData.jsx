import React from "react";
import { Typography, Paper, Accordion, AccordionDetails, AccordionSummary } from "@mui/material";

export function PhoneData() {
    const [expanded, setExpanded] = React.useState("panel1");

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

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
                    <Typography>1 Fijo y 2 Moviles</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>Fijo : ?</Typography>
                    <Typography>Movil 1 : ?</Typography>
                    <Typography>Movil 2 : ?</Typography>
                </AccordionDetails>
            </Accordion>
        </Paper>
    );
}
