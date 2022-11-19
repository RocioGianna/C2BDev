import React from "react";
import { Typography, Card, Box, Grid, Divider } from "@mui/material";

export default function OperationProductDetails({ additional }) {
    let step = additional.step;
    let type = additional.type;

    let changeOwner = additional.currentOwnerFirstname != null;

    return (
        <Grid item xs={12}>
            <Card
                variant="outlined"
                sx={{
                    px: 2,
                    py: 1,
                    textAlign: "center",
                    width: "100%",
                    height: "100%",
                }}
            >
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <strong>{step.name}</strong>
                    {additional.phone && <Typography variant="subtitle2">{additional.phone}</Typography>}
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography variant="subtitle2">{type}</Typography>
                    {additional.currentProvider && <Typography variant="subtitle2">{additional.currentProvider}</Typography>}
                </Box>
                {changeOwner && (
                    <>
                        <Divider sx={{ my: 1 }} />
                        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                            <Typography variant="subtitle2">Cambio de titular</Typography>
                            <Typography variant="subtitle2">
                                {additional.currentOwnerFirstname} {additional.currentOwnerLastname}, {additional.currentOwnerNID}
                            </Typography>
                        </Box>
                    </>
                )}
            </Card>
        </Grid>
    );
}
