import React from "react";
import { Grid, Button } from "@mui/material";
import { data } from "../mock/OperationsMock";
import { useParams } from "react-router-dom";
import { OperationTitle } from "./Operation/OperationTitle";
import { OperationData } from "./Operation/OperationData";
import { Chat } from "./Operation/Chat";
import { Collaborator } from "./Operation/Collaborator";
import { Documentation } from "./Operation/Documentation";
import { CustomerData } from "./Operation/CustomerData";
import { ProductData } from "./Operation/ProductData";
import { PhoneData } from "./Operation/PhoneData";

export default function Operation() {
    let params = useParams();

    const row = data[params.opId];

    return (
        <Grid container justifyContent="center" spacing={2} sx={{ height: "100%" }}>
            <Grid item xs={8} sx={{ display: "flex" }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <OperationTitle />
                    </Grid>
                    <Grid item xs={12}>
                        <OperationData row={row} />
                    </Grid>
                    <Grid item xs={12}>
                        <CustomerData row={row} />
                    </Grid>
                    <Grid item xs={6}>
                        <Collaborator row={row} />
                    </Grid>
                    <Grid item xs={6}>
                        <Documentation />
                    </Grid>
                    <Grid item xs={12}>
                        <ProductData row={row} />
                    </Grid>
                    <Grid item xs={12}>
                        <PhoneData />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={4} sx={{ minHeight: "100%" }}>
                <Chat />
            </Grid>
        </Grid>
    );
}
