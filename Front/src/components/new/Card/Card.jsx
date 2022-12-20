import React from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

function Card({ title, children }) {
    return (
        <Paper
            sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                p: 1.5,
            }}>
            <Typography sx={{ px: 1, py: 0.5 }} variant="h6">{title}</Typography>
            {children}
        </Paper>
    );
}

export default Card;
