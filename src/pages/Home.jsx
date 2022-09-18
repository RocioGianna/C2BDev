import React from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { getProducts } from "../services/ProductService";

function Home() {
    return (
        <Grid container alignItems="center" justifyContent="center">
            <Grid item>
                <Stack alignItems="center" spacing={2}>
                    <Typography variant="h1">Home</Typography>
                    <Button
                        onClick={async () => {
                            console.log(await getProducts());
                        }}
                    >
                        Request
                    </Button>
                </Stack>
            </Grid>
        </Grid>
    );
}

export default Home;
