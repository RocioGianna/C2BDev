import React from "react";
import Grid from "@mui/material/Grid";
import { Outlet } from "react-router-dom";
import Operations from "../components/Operations";

function Ops() {
    return (
        <Grid container alignItems="center" justifyContent="center">
            <Operations />
            <Outlet />
        </Grid>
    );
}

export default Ops;
