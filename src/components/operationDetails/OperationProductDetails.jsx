import React, { useState } from "react";
import { Typography, Card, Box, Grid, Divider, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { OperationDetailEditModal } from "../form/operationDetail/OperationDetailEditModal";


export default function OperationProductDetails({ operationId, operationDetail }) {
    const step = operationDetail.step;
    const type = operationDetail.type;
    const [hoverMode, setHoverMode] = useState(true);
    const [open, setOpen] = useState(false);

    const changeOwner = operationDetail.currentOwnerfirstName != null;

    return (
        <>
            <OperationDetailEditModal operationId={operationId} operationDetail={operationDetail} open={open} setOpen={setOpen} />
            <Grid item xs={12}>
                <Card
                    variant="outlined"
                    sx={{
                        px: 2,
                        py: 1,
                        textAlign: "center",
                        width: "100%",
                        height: "100%",
                    }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                        <strong>{step.name}</strong>
                        {hoverMode && (
                            <IconButton size="small" sx={{ p: 0, m: 0 }} onClick={() => setOpen(true)}>
                                <EditIcon color="primary" fontSize="inherit" />
                            </IconButton>
                        )}
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                        <Typography variant="subtitle2">{type}</Typography>
                        {operationDetail.phone && <Typography variant="subtitle2">{operationDetail.phone}</Typography>}
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "end" }}>
                        {operationDetail.currentProvider && <Typography variant="subtitle2">{operationDetail.currentProvider}</Typography>}
                    </Box>
                    {changeOwner && (
                        <>
                            <Divider sx={{ my: 1 }} />
                            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                <Typography variant="subtitle2">Cambio de titular</Typography>
                                <Typography variant="subtitle2">
                                    {operationDetail.currentOwnerfirstName} {operationDetail.currentOwnerlastName}, {operationDetail.currentOwnerNID}
                                </Typography>
                            </Box>
                        </>
                    )}
                </Card>
            </Grid>
        </>
    );
}
