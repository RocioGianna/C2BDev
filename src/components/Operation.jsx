import React from "react";
import { Grid, Typography, Box, Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Button, Paper, Divider, Stack, Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { data } from "../mock/OperationsMock";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import { useParams } from "react-router-dom";
import moment from "moment";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import DownloadIcon from "@mui/icons-material/Download";

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

function OperationData({ row }) {
    console.log(row);

    return (
        <Paper
            sx={{
                width: "100%",
                display: "flex",
            }}
        >
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Fecha</TableCell>
                            <TableCell align="right">Codigo Operacion</TableCell>
                            <TableCell align="right">Estado</TableCell>
                            <TableCell align="right">Tamitadora</TableCell>
                            <TableCell align="right">Canal</TableCell>
                            <TableCell align="right">Altabaja</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow key={row.name}>
                            <TableCell>
                                <div>{moment(row.creationDate).format("DD/MM/YYYY")}</div>
                            </TableCell>
                            <TableCell align="right">
                                <div>{row.operationCode}</div>
                            </TableCell>
                            <TableCell align="right">
                                <div>{row.status}</div>
                            </TableCell>
                            <TableCell align="right">
                                <div>{row.processorId}</div>
                            </TableCell>
                            <TableCell align="right">
                                <div>{row.channel}</div>
                            </TableCell>
                            <TableCell align="right">
                                <div> ------</div>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
}

function Chat({ chatData }) {
    function ChatContent({ chatData }) {
        return chatData ? (
            <Typography variant="h8" sx={{ flexGrow: 1, p: 2 }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus iaculis libero odio, eu bibendum neque congue a. Sed eu tortor vel eros consequat sodales et quis libero. Fusce at justo hendrerit, facilisis leo vel, ornare nulla. Etiam sed risus eros. Etiam a sagittis lacus. Nam posuere ex nec mauris convallis, tempor venenatis ante blandit. Praesent egestas eleifend arcu, sit amet vestibulum nisl condimentum et. Donec ullamcorper sem sed diam egestas tempor. Nullam ut urna vel diam interdum malesuada. Vestibulum porttitor suscipit porttitor. Integer at arcu vitae orci condimentum euismod. Morbi posuere, sapien sit amet maximus porttitor, mi turpis feugiat quam, vel pulvinar lacus dolor id turpis. Vivamus purus felis, consequat sed risus et, malesuada rhoncus velit. Pellentesque accumsan in augue et suscipit. Duis condimentum erat sed ex imperdiet euismod. Integer scelerisque massa sed felis ultricies, sed iaculis risus ultrices. In hac habitasse platea dictumst. Maecenas vitae sapien est. Sed mi ligula, laoreet at odio maximus, pulvinar scelerisque risus. Nulla consectetur blandit lectus, ac sollicitudin enim consectetur ac. Donec luctus quis dui et tempor. Aenean volutpat nisl a nisi condimentum, quis dignissim turpis facilisis. Nunc id est non ligula fringilla venenatis. Maecenas eros diam, porta eu mi nec, dignissim tempus metus. Vivamus volutpat ipsum urna, a molestie massa pharetra a. Aliquam erat volutpat.
            </Typography>
        ) : (
            <Typography variant="h6" sx={{ flexGrow: 1, p: 2, display: "flex", alignItems: "center", justifyContent: "center" }} align="center">
                No hay chats
            </Typography>
        );
    }

    return (
        <Paper sx={{ width: "100%", display: "flex", flexDirection: "column", height: "100%" }}>
            <Box>
                <Typography variant="h5" sx={{ flexGrow: 1, p: 2 }}>
                    Chat
                </Typography>
                <Divider style={{ width: "100%" }} />
            </Box>
            <ChatContent />
        </Paper>
    );
}

function Collaborator({ row }) {
    return (
        <Paper
            sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                heigth: 400,
            }}
        >
            <Typography
                variant="h6"
                sx={{
                    flexGrow: 1,
                    px: 2,
                    pt: 1,
                }}
            >
                Colaborador
            </Typography>
            <TableContainer component={Paper}>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow key={1}>
                            <TableCell sx={{ display: "flex", justifyContent: "space-between" }}>
                                <div>Codigo colaborador</div>
                                <div>{row.colaboratorCode}</div>
                            </TableCell>
                        </TableRow>
                        <TableRow key={2}>
                            <TableCell sx={{ display: "flex", justifyContent: "space-between" }}>
                                <div>Codigo referente</div>
                                <div>?</div>
                            </TableCell>
                        </TableRow>
                        <TableRow key={3}>
                            <TableCell sx={{ display: "flex", justifyContent: "space-between" }}>
                                <div>Telefono colaborador</div>
                                <div>{row.colaboratorPhone}</div>
                            </TableCell>
                        </TableRow>
                        <TableRow key={4}>
                            <TableCell sx={{ display: "flex", justifyContent: "space-between" }}>
                                <div>Email colaborador</div>
                                <div>{row.colaboratorEmail}</div>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
}

function Documentation() {
    const items = [{ name: "Name.png" }, { name: "Name.png" }, { name: "Name.png" }];

    function Item({ item }) {
        return (
            <Stack sx={{ border: 1, ml: 1, borderColor: "grey.400", borderRadius: "4px" }}>
                <Box sx={{ display: "flex", justifyContent: "center", py: 2, alignItems: "center" }}>
                    <FileCopyIcon color="primary" sx={{ fontSize: 50 }} />
                </Box>
                <Box sx={{ background: "#c786d3", display: "flex", alignItems: "center", justifyContent: "center", p: 1 }}>
                    <Typography sx={{ color: "lightgray" }}>{item.name}</Typography>
                    <DownloadIcon sx={{ color: "lightgray" }} />
                </Box>
            </Stack>
        );
    }

    return (
        <Paper
            sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                heigth: "100%",
            }}
        >
            <Typography
                variant="h6"
                sx={{
                    flexGrow: 1,
                    px: 2,
                    pt: 1,
                }}
            >
                Documentacion
            </Typography>
            <Box sx={{ height: "100%", display: "flex", justifyContent: "center", p: 2 }}>
                {items.map((item, index) => (
                    <Item key={index} item={item} />
                ))}
            </Box>
        </Paper>
    );
}

function CustomerData({ row }) {
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
                    px: 2,
                    pt: 1,
                }}
            >
                Cliente
            </Typography>
            <Box sx={{ display: "flex" }}>
                <TableContainer component={Paper}>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow key={1}>
                                <TableCell sx={{ display: "flex", justifyContent: "space-between" }}>
                                    <div>Apellido</div>
                                    <div>{row.customer.lastname}</div>
                                </TableCell>
                            </TableRow>
                            <TableRow key={2}>
                                <TableCell sx={{ display: "flex", justifyContent: "space-between" }}>
                                    <div>Nombe</div>
                                    <div>{row.customer.firstname}</div>
                                </TableCell>
                            </TableRow>
                            <TableRow key={3}>
                                <TableCell sx={{ display: "flex", justifyContent: "space-between" }}>
                                    <div>DNI</div>
                                    <div>{row.customer.NID}</div>
                                </TableCell>
                            </TableRow>
                            <TableRow key={4}>
                                <TableCell sx={{ display: "flex", justifyContent: "space-between" }}>
                                    <div>Telefono</div>
                                    <div>{row.customer.phone}</div>
                                </TableCell>
                            </TableRow>
                            <TableRow key={5}>
                                <TableCell sx={{ display: "flex", justifyContent: "space-between" }}>
                                    <div>Mail</div>
                                    <div>{row.customer.email}</div>
                                </TableCell>
                            </TableRow>
                            <TableRow key={6}>
                                <TableCell sx={{ display: "flex", justifyContent: "space-between" }}>
                                    <div>Direccion facturacion</div>
                                    <div>{row.customer.billingAddress.address}</div>
                                </TableCell>
                            </TableRow>
                            <TableRow key={7}>
                                <TableCell sx={{ display: "flex", justifyContent: "space-between" }}>
                                    <div>Municipio facturacion</div>
                                    <div>{row.customer.billingAddress.municipality}</div>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                <TableContainer component={Paper}>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow key={1}>
                                <TableCell sx={{ display: "flex", justifyContent: "space-between" }}>
                                    <div>Provincia facturacion</div>
                                    <div>{row.customer.billingAddress.province}</div>
                                </TableCell>
                            </TableRow>
                            <TableRow key={2}>
                                <TableCell sx={{ display: "flex", justifyContent: "space-between" }}>
                                    <div>Codigo postal facturacion</div>
                                    <div>{row.customer.billingAddress.zipCode}</div>
                                </TableCell>
                            </TableRow>
                            <TableRow key={3}>
                                <TableCell sx={{ display: "flex", justifyContent: "space-between" }}>
                                    <div>Cuenta bancaria</div>
                                    <div>{row.customer.bankAccount}</div>
                                </TableCell>
                            </TableRow>
                            <TableRow key={4}>
                                <TableCell sx={{ display: "flex", justifyContent: "space-between" }}>
                                    <div>Direccion instalacion</div>
                                    <div>{row.installationAddress.address}</div>
                                </TableCell>
                            </TableRow>
                            <TableRow key={4}>
                                <TableCell sx={{ display: "flex", justifyContent: "space-between" }}>
                                    <div>Municipio instalacion</div>
                                    <div>{row.installationAddress.municipality}</div>
                                </TableCell>
                            </TableRow>
                            <TableRow key={4}>
                                <TableCell sx={{ display: "flex", justifyContent: "space-between" }}>
                                    <div>Provincia instalacion</div>
                                    <div>{row.installationAddress.province}</div>
                                </TableCell>
                            </TableRow>
                            <TableRow key={4}>
                                <TableCell sx={{ display: "flex", justifyContent: "space-between" }}>
                                    <div>Codigo postal instalacion</div>
                                    <div>{row.installationAddress.zipCode}</div>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Paper>
    );
}

function ProductData({ row }) {
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
                    px: 2,
                    pt: 1,
                }}
            >
                Producto
            </Typography>
            <TableContainer component={Paper}>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow key={1}>
                            <TableCell sx={{ display: "flex", justifyContent: "space-between" }}>
                                <div>Producto</div>
                                <div>?</div>
                            </TableCell>
                        </TableRow>
                        <TableRow key={2}>
                            <TableCell sx={{ display: "flex", justifyContent: "space-between" }}>
                                <div>Opcion</div>
                                <div>{row.productOptionId}</div>
                            </TableCell>
                        </TableRow>
                        <TableRow key={3}>
                            <TableCell sx={{ display: "flex", justifyContent: "space-between" }}>
                                <div>Adicionales</div>
                                <Typography noWrap>{row.additionalIds.length > 0 ? row.additionalIds.map((a) => <div>{a}</div>) : <div>No hay</div>}</Typography>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
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
        <Grid container alignItems="center" justifyContent="center" spacing={2} sx={{ py: 20 }}>
            <Grid item xs={8} sx={{ display: "flex" }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <OperationDetail />
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
                    <Grid item xs={6}>
                        <ProductData row={row} />
                    </Grid>
                    <Grid item xs={6}>
                        <PhoneData />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={4} sx={{ height: "100%" }}>
                <Chat />
            </Grid>
        </Grid>
    );
}
