import React from "react";
import { Typography, Box, Paper, IconButton, Divider } from "@mui/material";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { ProcessorSelect } from "./ProcessorSelect";
import { ChannelSelect } from "./ChannelSelect";

export function OperationTitle({ operation }) {
    const navigate = useNavigate();

    const creationDate = moment(operation.creationDate).format("DD/MM/YYYY");

    return (
        <Paper
            sx={{
                width: "100%",
                display: "flex",
                p: 1,
                alignItems: "center",
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
                Operacion #{operation.operationCode}, {creationDate}
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "space-evenly", alignItems: "center", flexGrow: 1 }}>
                <ChannelSelect channel={operation.channel} />
                <Divider orientation="vertical" flexItem />
                <ProcessorSelect operation={operation} />
                <Divider orientation="vertical" flexItem />
                <Typography variant="subtitle2" sx={{ mr: 1 }}>
                    Estado
                </Typography>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    pr: 1,
                }}
            >
                <LocalPrintshopIcon color="primary" />
            </Box>
        </Paper>
    );
}
