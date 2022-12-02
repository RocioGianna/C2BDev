import React, { useEffect } from "react";
import { Grid } from "@mui/material";
import { useParams } from "react-router-dom";
import { OperationTitle } from "../components/operationDetails/OperationTitle";
import { Chat } from "../components/operationDetails/Chat";
import { Collaborator } from "../components/operationDetails/Collaborator";
import { Documentation } from "../components/operationDetails/Documentation";
import { CustomerData } from "../components/operationDetails/CustomerData";
import { ProductData } from "../components/operationDetails/ProductData";
import { fetchOperation } from "../services/OperationService.js";
import { useSelector } from "react-redux";

export default function OperationDetails() {
    let params = useParams();
    const operation = useSelector((state) => state.operations.operation);

    useEffect(() => {
        fetchOperation(params.opId);
    }, []);

    if (!operation) return <></>;

    console.log(data);

    return (
        <Grid container justifyContent="center" spacing={3} sx={{ height: "100%" }}>
            <Grid item xs={12} sx={{ display: "flex", justifyContent: "space-between" }}>
                <OperationTitle operation={operation} />
            </Grid>
            <Grid item xs={4}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <CustomerData row={operation} />
                    </Grid>
                    <Grid item xs={12}>
                        <Documentation documentation={operation.documentation} />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={4}>
                <ProductData row={operation} />
            </Grid>
            <Grid item xs={4}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Collaborator row={operation} />
                    </Grid>
                    <Grid item xs={12}>
                        <Chat />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}
