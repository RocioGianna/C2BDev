import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Grid, Typography, Box, Button, Paper } from "@mui/material";
import { data } from "../mock/OperationsMock";

export default function Operation() {
    let params = useParams();
    const navigate = useNavigate();

    return (
        <Grid container alignItems="center" justifyContent="center">
            <Paper sx={{ height: "100%", p: 12 }}>
                <Button variant="contained" onClick={() => navigate("/2b/ops")}>
                    Volver
                </Button>
                <div>Operacion : {params.opId}</div>
                <Typography variant="h6" component="pre">
                    {JSON.stringify(data, null, 2)}
                </Typography>
            </Paper>
        </Grid>
    );
}
