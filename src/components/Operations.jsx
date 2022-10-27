import * as React from "react";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { data } from "../mock/OperationsMock";
import { useNavigate } from "react-router-dom";
import { getOperationTableColumnsByRole } from "../utils/RolesUtils";
import { IconButton } from "@mui/material";
import ReadMoreIcon from "@mui/icons-material/ReadMore";

export default function Operations() {
    const columns = getOperationTableColumnsByRole();
    const navigate = useNavigate();
    const rows = [data];

    if (!columns) return <></>;

    function handleClick(event, cellValues) {
        navigate("/2b/ops/" + cellValues.id);
    }

    columns.find((col) => col.headerName === "Detalles").renderCell = (cellValues) => {
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
    };

    return (
        <Box sx={{ height: 400, width: "100%", background: "white", p: 2 }}>
            <DataGrid rows={rows} columns={columns} pageSize={5} rowsPerPageOptions={[5]} disableSelectionOnClick experimentalFeatures={{ newEditingApi: true }} />
        </Box>
    );
}
