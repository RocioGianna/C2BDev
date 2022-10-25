import * as React from "react";
import { Box, Button, IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { data } from "../mock/OperationsMock";
import moment from "moment";
import ReadMoreIcon from "@mui/icons-material/ReadMore";

const columns = [
    { flex: 1, field: "creationDate", headerName: "Fecha", width: 220, valueGetter: (params) => moment(params?.row?.creationDate).format("DD/MM/YYYY") },
    { flex: 1, field: "operationCode", headerName: "Codigo Operacion", width: 150 },
    { flex: 1, field: "status", headerName: "Estado", width: 150 },
    { flex: 1, field: "processorId", headerName: "Tramitadora", width: 110 },
    { flex: 1, field: "customer[lastname]", headerName: "Apellidos", width: 110, valueGetter: (params) => params?.row?.customer?.lastname },
    {
        field: "details",
        headerName: "Detalles",
        width: 110,
        renderCell: (cellValues) => {
            return (
                <IconButton
                    variant="contained"
                    color="primary"
                    onClick={(event) => {
                        handleClick(event, cellValues);
                    }}
                >
                    <ReadMoreIcon />
                </IconButton>
            );
        },
    },
];

const rows = [data];

export default function Operations() {
    return (
        <Box sx={{ height: 400, width: "100%", background: "white" }}>
            <DataGrid rows={rows} columns={columns} pageSize={5} rowsPerPageOptions={[5]} disableSelectionOnClick experimentalFeatures={{ newEditingApi: true }} />
        </Box>
    );
}
