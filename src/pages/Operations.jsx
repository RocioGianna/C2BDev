import * as React from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { getOperationTableColumnsByRole } from "../utils/RolesUtils.js";
import { IconButton, Typography, Paper, Button, Tooltip, CircularProgress, Alert, Stack } from "@mui/material";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import AddIcon from "@mui/icons-material/Add";
import PrintIcon from "@mui/icons-material/Print";
import { isRequiringAttention } from "../utils/OperationUtils.js";
import Grid from "@mui/material/Grid";
import { fetchOperations } from "../services/OperationService.js";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { operationsFetched } from "../state/operationsSlice.js";
import { store } from "../state/store.js";
import { useSelector } from "react-redux";
import TableWithTitle from "../components/TableWithTitle.jsx";

export default function Operations() {
    const columns = getOperationTableColumnsByRole();
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    const data = useSelector((state) => state.operations.operations);

    useEffect(() => {
        fetchOperations()
            .then((res) => {
                store.dispatch(operationsFetched(res.data));
            })
            .catch((err) => setError(err));
    }, []);

    function handleClick(event, cellValues) {
        navigate("/ops/" + cellValues.id);
    }

    /*
    columns.find((col) => col.header === "Acciones").renderCell = (cellValues) => {
        return (
            <>
                <Tooltip title="Detalle">
                    <IconButton
                        variant="contained"
                        color="primary"
                        onClick={(event) => {
                            handleClick(event, cellValues);
                        }}>
                        <ReadMoreIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Imprimir">
                    <IconButton variant="contained" color="primary" onClick={() => {}}>
                        <PrintIcon />
                    </IconButton>
                </Tooltip>
            </>
        );
    };*/

    if (error) {
        return (
            <Box sx={{ width: "100%", height: "80vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Alert severity="error">{error}</Alert>
            </Box>
        );
    }

    if (!data || !columns) {
        return (
            <Box sx={{ width: "100%", height: "80vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <CircularProgress />
            </Box>
        );
    }

    console.log(data);
    return (
        <Grid container alignItems="center" justifyContent="center">
            <Stack sx={{ width: "100%" }} gap={2} >
                <TableWithTitle title="Operaciones" action={{ onClick: () => navigate("/ops/new"), label: "Añadir Operación", icon: <AddIcon /> }} tableProps={{ columns, data }} />
                <TableWithTitle title="Tramitadas" />
            </Stack>
            <Outlet />
        </Grid>
    );
}
