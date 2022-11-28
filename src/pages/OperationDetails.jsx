import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { useParams } from "react-router-dom";
import { OperationTitle } from "../components/operationDetails/OperationTitle";
import { Chat } from "../components/operationDetails/Chat";
import { Collaborator } from "../components/operationDetails/Collaborator";
import { Documentation } from "../components/operationDetails/Documentation";
import { CustomerData } from "../components/operationDetails/CustomerData";
import { ProductData } from "../components/operationDetails/ProductData";
import { fetchOperation } from "../services/OperationService.js";

export default function OperationDetails() {
    const [data, setData] = useState(null);
    let params = useParams();

    useEffect(() => {
        fetchOperation(params.opId).then((res) => setData(res.data));
    }, []);

    if (!data) return <></>;

    return (
        <Grid container justifyContent="center" spacing={3} sx={{ height: "100%" }}>
            <Grid item xs={12} sx={{ display: "flex", justifyContent: "space-between" }}>
                <OperationTitle operation={data} />
            </Grid>
            <Grid item xs={4}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <CustomerData row={data} />
                    </Grid>
                    <Grid item xs={12}>
                        <Documentation documentation={data.documentation} />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={4}>
                <ProductData row={data} />
            </Grid>
            <Grid item xs={4}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Collaborator row={data} />
                    </Grid>
                    <Grid item xs={12}>
                        <Chat />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}
