import React from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import DividedStack from "../DividedStack";

function TableCard({ title, children }) {
    return (
        <Paper
            sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                p: 1.5,
            }}>
            <Typography sx={{ px: 1, py: 0.5 }} variant="h6">{title}</Typography>
            <DividedStack algo="hola">{children}</DividedStack>
        </Paper>
    );
}

export default TableCard;
