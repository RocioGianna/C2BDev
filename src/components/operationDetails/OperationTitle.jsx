import React from "react";
import { Typography, Box, Paper, IconButton } from "@mui/material";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

export function OperationTitle() {
    const navigate = useNavigate();

    return (
        <Paper
            sx={{
                width: "100%",
                display: "flex",
                p: 2,
            }}
        >
            <IconButton sx={{ py: 0 }} onClick={() => navigate("/ops/")}>
                <ArrowBackIcon color="primary" />
            </IconButton>
            <Typography
                variant="h5"
                sx={{
                    flexGrow: 1,
                }}
            >
                Detalle de Operacion
            </Typography>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <LocalPrintshopIcon color="primary" />
            </Box>
        </Paper>
    );
}
