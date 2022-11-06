import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { useParams } from "react-router-dom";
import { OperationTitle } from "./Operation/OperationTitle";
import { OperationData } from "./Operation/OperationData";
import { Chat } from "./Operation/Chat";
import { Collaborator } from "./Operation/Collaborator";
import { Documentation } from "./Operation/Documentation";
import { CustomerData } from "./Operation/CustomerData";
import { ProductData } from "./Operation/ProductData";
import { PhoneData } from "./Operation/PhoneData";
import { fetchOperation } from "../services/OperationService.js";

export default function Operation() {
    const [data, setData] = useState(null);
    let params = useParams();

    useEffect(() => {
        fetchOperation(params.opId).then((res) => setData(res.data));
    }, []);

    if (!data) return <></>;

    return (
        <Grid container justifyContent="center" spacing={2} sx={{ height: "100%" }}>
            <Grid item xs={8} sx={{ display: "flex" }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <OperationTitle />
                    </Grid>
                    <Grid item xs={12}>
                        <OperationData row={data} />
                    </Grid>
                    <Grid item xs={12}>
                        <CustomerData row={data} />
                    </Grid>
                    <Grid item xs={6}>
                        <Collaborator row={data} />
                    </Grid>
                    <Grid item xs={6}>
                        <Documentation />
                    </Grid>
                    <Grid item xs={12}>
                        <ProductData row={data} />
                    </Grid>
                    <Grid item xs={12}>
                        <PhoneData row={data} />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={4} sx={{ minHeight: "100%" }}>
                <Chat />
            </Grid>
        </Grid>
    );
}
