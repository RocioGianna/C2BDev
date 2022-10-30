import React from "react";
import { Grid, Typography, Box, Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Button, Paper, Divider, Stack, Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { data } from "../mock/OperationsMock";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import { useParams } from "react-router-dom";

function Chat() {
    return (
        <Paper sx={{ width: "100%", display: "flex", flexDirection: "column" }}>
            <Typography variant="h5" sx={{ flexGrow: 1, p: 2 }}>
                Chat
            </Typography>
            <Divider style={{ width: "100%" }} />
            <Typography variant="h8" sx={{ flexGrow: 1, p: 2 }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus iaculis libero odio, eu bibendum neque congue a. Sed eu tortor vel eros consequat sodales et quis libero. Fusce at justo hendrerit, facilisis leo vel, ornare nulla. Etiam sed risus eros. Etiam a sagittis lacus. Nam posuere ex nec mauris convallis, tempor venenatis ante blandit. Praesent egestas eleifend arcu, sit amet vestibulum nisl condimentum et. Donec ullamcorper sem sed diam egestas tempor. Nullam ut urna vel diam interdum malesuada. Vestibulum porttitor suscipit porttitor. Integer at arcu vitae orci condimentum euismod. Morbi posuere, sapien sit amet maximus porttitor, mi turpis feugiat quam, vel pulvinar lacus dolor id turpis. Vivamus purus felis, consequat sed risus et, malesuada rhoncus velit. Pellentesque accumsan in augue et suscipit. Duis condimentum erat sed ex imperdiet euismod. Integer scelerisque massa sed felis ultricies, sed iaculis risus ultrices. In hac habitasse platea dictumst. Maecenas vitae sapien est. Sed mi ligula, laoreet at odio maximus, pulvinar scelerisque risus. Nulla consectetur blandit lectus, ac sollicitudin enim consectetur ac. Donec luctus quis dui et tempor. Aenean volutpat nisl a nisi condimentum, quis dignissim turpis facilisis. Nunc id est non ligula fringilla venenatis. Maecenas eros diam, porta eu mi nec, dignissim tempus metus. Vivamus volutpat ipsum urna, a molestie massa pharetra a. Aliquam erat volutpat.
            </Typography>
        </Paper>
    );
}

function OperationDetail() {
    return (
        <Paper
            sx={{
                width: "100%",
                display: "flex",
                p: 2,
            }}
        >
            <Typography
                variant="h5"
                sx={{
                    flexGrow: 1,
                }}
            >
                Detalle de Operacion
            </Typography>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <LocalPrintshopIcon color="primary" />
            </Box>
        </Paper>
    );
}

function OperationData() {
    return (
        <Paper
            sx={{
                width: "100%",
                display: "flex",
                p: 2,
            }}
        >
            FECHA CODIGO ETC
        </Paper>
    );
}

function Collaborator() {
    return (
        <Paper
            sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
            }}
        >
            <Typography
                variant="h6"
                sx={{
                    flexGrow: 1,
                    p: 2,
                }}
            >
                Colaborador
            </Typography>
        </Paper>
    );
}

function CustomerData({ row }) {
    console.log(row);

    return (
        <Paper
            sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
            }}
        >
            <Typography
                variant="h6"
                sx={{
                    flexGrow: 1,
                    p: 2,
                }}
            >
                Cliente
            </Typography>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow key={row.name} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                            <TableCell sx={{ display: "flex", justifyContent: "space-between" }}>
                                <div>Apellido</div>
                                <div>{row.customer.lastname}</div>
                            </TableCell>
                            <TableCell sx={{ display: "flex", justifyContent: "space-between" }}>
                                <div>Apellido</div>
                                <div>{row.customer.lastname}</div>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
}

function ProductData() {
    return (
        <Paper
            sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
            }}
        >
            <Typography
                variant="h6"
                sx={{
                    flexGrow: 1,
                    p: 2,
                }}
            >
                Producto
            </Typography>
        </Paper>
    );
}

function PhoneData() {
    const [expanded, setExpanded] = React.useState("panel1");

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    return (
        <Paper
            sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
            }}
        >
            <Accordion expanded={expanded === "panel1"} onChange={handleChange("panel1")}>
                <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                    <Typography>Telefono fijo</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>12345678898</Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === "panel2"} onChange={handleChange("panel2")}>
                <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
                    <Typography>Telefono movil 1</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>236472662</Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === "panel3"} onChange={handleChange("panel3")}>
                <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
                    <Typography>Telefono movil 2</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>3278947234823</Typography>
                </AccordionDetails>
            </Accordion>
        </Paper>
    );
}

export default function Operation() {
    let params = useParams();

    const row = data[params.opId];

    return (
        <Grid container alignItems="center" justifyContent="center" spacing={2}>
            <Grid item xs={8} sx={{ display: "flex" }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <OperationDetail />
                    </Grid>
                    <Grid item xs={12}>
                        <OperationData />
                    </Grid>
                    <Grid item xs={6}>
                        <Collaborator />
                    </Grid>
                    <Grid item xs={6}>
                        <Collaborator />
                    </Grid>
                    <Grid item xs={12}>
                        <CustomerData row={row} />
                    </Grid>
                    <Grid item xs={6}>
                        <ProductData />
                    </Grid>
                    <Grid item xs={6}>
                        <PhoneData />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={4}>
                <Chat />
            </Grid>
        </Grid>
    );
}
