/* eslint-disable react/display-name */
import * as React from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { getOperationTableColumnsByRole } from "../../utils/OperationUtils.jsx";
import { CircularProgress, Alert, Stack } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Grid from "@mui/material/Grid";
import { fetchOperations } from "../../services/OperationService.js";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { operationsFetched } from "../../state/operationsSlice.js";
import { store } from "../../state/store.js";
import { useSelector } from "react-redux";
import IconButton from "@mui/material/IconButton";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import Table from "../../components/new/Table";
import TitleBar from "../../components/new/TitleBar/TitleBar.jsx";
import { putOperation } from "../../services/OperationService.js";
import { updateOperation } from "../../state/operationsSlice.js";
import { useDispatch } from "react-redux";

export default function Operations() {
    const [error, setError] = useState(null);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const columns = getOperationTableColumnsByRole();

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
                <TitleBar title="Operaciones" actions={[{ onClick: () => navigate("/ops/new"), label: "Añadir Operación", icon: <AddIcon /> }]} />
                <Table
                    columns={columns}
                    data={data}
                    handleSaveCell={(cell, value) => {
                        const columnDef = cell.column.columnDef;
                        const attributeName = columnDef.attributeName;
                        const columnName = columnDef.columnName;
                        const operationId = cell.row.original.id;
                        const operation = data.find((op) => op.id === operationId);
                        putOperation(operationId, columnName, attributeName, value).then(
                            (res) => {
                                console.log(operation, attributeName, value);
                                dispatch(updateOperation({ ...operation, [attributeName]: value }));
                            },
                        );
                    }}
                    renderRowActions={(row) => (
                        <IconButton onClick={() => navigate(`/ops/${row.cell.row.original.id}`)}>
                            <ReadMoreIcon color="primary" />
                        </IconButton>
                    )} />
            </Stack>
            <Outlet />
        </Grid>
    );
}
