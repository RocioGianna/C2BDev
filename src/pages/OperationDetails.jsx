import React, { useEffect, useState } from "react";
import { Grid, Box } from "@mui/material";
import { useParams } from "react-router-dom";
import { OperationTitle } from "../components/operationDetails/OperationTitle";
import { OperationData } from "../components/operationDetails/OperationData";
import { Chat } from "../components/operationDetails/Chat";
import { Collaborator } from "../components/operationDetails/Collaborator";
import { Documentation } from "../components/operationDetails/Documentation";
import { CustomerData } from "../components/operationDetails/CustomerData";
import { ProductData } from "../components/operationDetails/ProductData";
import { PhoneData } from "../components/operationDetails/PhoneData";
import { fetchOperation } from "../services/OperationService.js";

export default function OperationDetails() {
    const [data, setData] = useState(null);
    let params = useParams();

    useEffect(() => {
        fetchOperation(params.opId).then((res) => setData(res.data));
    }, []);

    if (!data) return <></>;

    console.log(data);

    return (
        <Grid container justifyContent="center" spacing={2} sx={{ height: "100%" }}>
            <Grid item xs={8} sx={{ display: "flex", justifyContent: "space-between" }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <OperationTitle />
                    </Grid>
                    <Grid item xs={12}>
                        <OperationData row={data} />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={4}>
                <Collaborator row={data} />
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
                <Chat />
            </Grid>
        </Grid>
    );
}
