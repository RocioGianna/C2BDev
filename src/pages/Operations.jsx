/* eslint-disable react/display-name */
import * as React from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { getOperationTableColumnsByRole } from "../utils/OperationUtils.jsx";
import { CircularProgress, Alert, Stack } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
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

    return (
        <Grid container alignItems="center" justifyContent="center">
            <Stack sx={{ width: "100%" }} gap={2}>
                <TableWithTitle title="Operaciones" action={{ onClick: () => navigate("/ops/new"), label: "Añadir Operación", icon: <AddIcon /> }} tableProps={{ columns, data }} />
            </Stack>
            <Outlet />
        </Grid>
    );
}
