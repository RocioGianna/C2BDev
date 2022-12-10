import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

function Home() {
    return (
        <Grid container alignItems="center" justifyContent="center">
            <Grid item>
                <Stack alignItems="center" spacing={2}>
                    <Typography variant="h1">Home</Typography>
                </Stack>
            </Grid>
        </Grid>
    );
}

export default Home;
