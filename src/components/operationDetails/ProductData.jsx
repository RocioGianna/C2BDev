import React from "react";
import { Typography, Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper, Box } from "@mui/material";

export function ProductData({ row }) {
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
                                <div>{row.productOption.product.name}</div>
                            </TableCell>
                        </TableRow>
                        <TableRow key={2}>
                            <TableCell sx={{ display: "flex", justifyContent: "space-between" }}>
                                <div>Opcion</div>
                                <div>{row.productOption.name}</div>
                            </TableCell>
                        </TableRow>
                        <TableRow key={3}>
                            <TableCell sx={{ display: "flex", justifyContent: "space-between" }}>
                                <div>Adicionales</div>
                                <Box sx={{ width: "50%" }}>
                                    <Typography variant="subtitle2" noWrap>
                                        <Box sx={{ display: "flex" }}>
                                            {row.additionalProducts && row.additionalProducts.length > 0 ? (
                                                row.additionalProducts.map((a, index) => {
                                                    return index > 0 ? <div>, {a.name}</div> : <div>{a.name}</div>;
                                                })
                                            ) : (
                                                <div>-</div>
                                            )}
                                        </Box>
                                    </Typography>
                                </Box>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
}
