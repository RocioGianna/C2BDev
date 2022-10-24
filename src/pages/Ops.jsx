import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { Outlet } from "react-router-dom";

function Ops() {
    return (
        <Grid container alignItems="center" justifyContent="center">
            <Grid item>
                <Stack alignItems="center" spacing={2}>
                    <Typography variant="h1">Ops</Typography>
                    <Outlet />
                </Stack>
            </Grid>
        </Grid>
    );
}

export default Ops;
