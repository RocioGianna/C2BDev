import * as React from "react";
import { Box } from "@mui/material";
import { data } from "../mock/OperationsMock";
import { useNavigate } from "react-router-dom";
import { getOperationTableColumnsByRole } from "../utils/RolesUtils";
import { IconButton, Typography, Paper, Button, Tooltip } from "@mui/material";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import AddIcon from "@mui/icons-material/Add";
import PrintIcon from "@mui/icons-material/Print";
import { isRequiringAttention } from "../utils/OperationUtils";
import CustomDataGrid from "./CustomDataGrid";

export default function Operations() {
    const columns = getOperationTableColumnsByRole();
    const navigate = useNavigate();
    const rows = data;

    if (!columns) return <></>;

    function handleClick(event, cellValues) {
        navigate("/2b/ops/" + cellValues.id);
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
                    <IconButton variant="contained" color="primary" onClick={(event) => {}}>
                        <PrintIcon />
                    </IconButton>
                </Tooltip>
            </>
        );
    };

    return (
        <Box sx={{ width: "100%" }}>
            <Paper sx={{ p: 2 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography variant="h5">Operaciones pendientes : requieren atención</Typography>
                    <Button variant="contained" onClick={() => navigate("/2b/ops/new")}>
                        <AddIcon />
                        AÑadir Operación
                    </Button>
                </Box>
            </Paper>
            <Paper sx={{ mt: 2 }}>
                <CustomDataGrid rows={rows.filter((op) => isRequiringAttention(op))} columns={columns} />
            </Paper>
            <Paper sx={{ p: 2, mt: 4 }}>
                <Typography variant="h5">Todas las operaciones</Typography>
            </Paper>
            <Paper sx={{ mt: 2 }}>
                <CustomDataGrid rows={rows} columns={columns} />
            </Paper>
        </Box>
    );
}
