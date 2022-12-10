import React, { useEffect } from "react";
import { Grid, Box, CircularProgress, Stack } from "@mui/material";
import { useParams } from "react-router-dom";
import { OperationTitle } from "../../components/operationDetails/OperationTitle";
import CustomerTableCard from "./CustomerTableCard";
import CollaboratorTableCard from "./CollaboratorTableCard";
import ProductTableCard from "./ProductTableCard";
import Chat from "./Chat";
import { Documentation } from "../../components/operationDetails/Documentation";
import { ProductData } from "../../components/operationDetails/ProductData";
import { fetchOperation } from "../../services/OperationService.js";
import { useSelector, useDispatch } from "react-redux";
import { resetOperation } from "../../state/operationsSlice";

export default function OperationDetails() {
    const params = useParams();
    const operation = useSelector((state) => state.operations.operation);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(resetOperation());
        fetchOperation(params.opId);
    }, []);


    if (!operation) {
        return (
            <Box sx={{ width: "100%", height: "80vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Grid container justifyContent="center" spacing={2} sx={{ height: "100%" }}>
            <Grid item xs={12}>
                <OperationTitle operation={operation} />
            </Grid>
            <Grid item xs={4}>
                <Stack spacing={2}>
                    <CustomerTableCard row={operation} />
                    <Documentation documentation={operation.documentation} />
                </Stack>
            </Grid>
            <Grid item xs={4}>
                <Stack spacing={2}>
                    <CollaboratorTableCard row={operation} />
                    <ProductTableCard row={operation} />
                    <ProductData row={operation} />
                </Stack>
            </Grid>
            <Grid item xs={4}>
                <Chat />
            </Grid>
        </Grid>
    );
}
