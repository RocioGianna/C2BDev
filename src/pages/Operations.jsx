import * as React from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { getOperationTableColumnsByRole } from "../utils/RolesUtils.js";
import { IconButton, Typography, Paper, Button, Tooltip, CircularProgress, Alert } from "@mui/material";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import AddIcon from "@mui/icons-material/Add";
import PrintIcon from "@mui/icons-material/Print";
import { isRequiringAttention } from "../utils/OperationUtils.js";
import CustomDataGrid from "../components/CustomDataGrid.jsx";
import Grid from "@mui/material/Grid";
import { fetchOperations } from "../services/OperationService.js";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { operationsFetched } from "../state/operationsSlice.js";
import { store } from "../state/store.js";
import { useSelector } from "react-redux";

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

    columns.find((col) => col.headerName === "Acciones").renderCell = (cellValues) => {
        return (
            <>
                <Tooltip title="Detalle">
                    <IconButton
                        variant="contained"
                        color="primary"
                        onClick={(event) => {
                            handleClick(event, cellValues);
                        }}
                    >
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
    };

    if (error)
        return (
            <Box sx={{ width: "100%", height: "80vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Alert severity="error">{error}</Alert>
            </Box>
        );

    if (!data)
        return (
            <Box sx={{ width: "100%", height: "80vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <CircularProgress />
            </Box>
        );

    return (
        <Grid container alignItems="center" justifyContent="center">
            <Box sx={{ width: "100%" }}>
                <Paper sx={{ p: 2 }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                        <Typography variant="h5">Operaciones pendientes: requieren atención</Typography>
                        <Button variant="contained" onClick={() => navigate("/ops/new")}>
                            <AddIcon />
                            Añadir Operación
                        </Button>
                    </Box>
                </Paper>
                <Paper sx={{ mt: 2 }}>
                    <CustomDataGrid rows={data.filter((op) => isRequiringAttention(op))} columns={columns} />
                </Paper>
                <Paper sx={{ p: 2, mt: 4 }}>
                    <Typography variant="h5">Todas las operaciones</Typography>
                </Paper>
                <Paper sx={{ mt: 2 }}>
                    <CustomDataGrid rows={data} columns={columns} />
                </Paper>
            </Box>
            <Outlet />
        </Grid>
    );
}
