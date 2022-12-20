import React, { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Stack from "@mui/material/Stack";

function ExpandableCard({ title, subtitle, children, defaultExpanded }) {
    const [expanded, setExpanded] = useState(!!defaultExpanded);
    return (
        <div>
            <Accordion disableGutters expanded={expanded} onChange={() => setExpanded((prev) => !prev)}>
                <AccordionSummary sx={{ px: 1.5 }} expandIcon={<ExpandMoreIcon />}>
                    <Stack direction="row" alignItems="center" justifyContent="space-between" flexGrow={1} mr={1} spacing={1} >
                        <Typography sx={{ px: 1, py: 0.5 }} variant="h6" >{title}</Typography>
                        {subtitle && <Typography color="text.secondary" textAlign="right">{subtitle}</Typography>}
                    </Stack>
                </AccordionSummary>
                <AccordionDetails sx={{ pt: 0 }}>
                    {children}
                </AccordionDetails>
            </Accordion>
        </div>
    );
}

export default ExpandableCard;
