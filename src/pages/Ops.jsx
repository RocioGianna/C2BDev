import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { Outlet } from "react-router-dom";
import Operations from "../components/Operations";

function Ops() {
    return (
        <Grid container alignItems="center" justifyContent="center">
            <Operations />
        </Grid>
    );
}

export default Ops;
