import React, { useEffect } from "react";
import { Grid, Box, CircularProgress, Stack } from "@mui/material";
import { useParams } from "react-router-dom";
import { fetchOperation } from "../../services/OperationService.js";
import { useSelector, useDispatch } from "react-redux";
import { resetOperation } from "../../state/operationsSlice";
import OperationDetailsTitleBar from "./OperationDetailsTitleBar";
import CustomerCard from "./CustomerCard";
import DocumentationCard from "./DocumentationCard";
import CollaboratorCard from "./CollaboratorCard";
import ProductCard from "./ProductCard";
import ProductDetailsCard from "./ProductDetailsCard.jsx";
import Chat from "./Chat";

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
                <OperationDetailsTitleBar operation={operation} />
            </Grid>
            <Grid item xs={4}>
                <Stack spacing={2}>
                    <CustomerCard operation={operation} />
                    <DocumentationCard operation={operation} />
                </Stack>
            </Grid>
            <Grid item xs={4}>
                <Stack spacing={2}>
                    <CollaboratorCard operation={operation} />
                    <ProductCard operation={operation} />
                    <ProductDetailsCard operation={operation} />
                </Stack>
            </Grid>
            <Grid item xs={4}>
                <Chat />
            </Grid>
        </Grid>
    );
}
