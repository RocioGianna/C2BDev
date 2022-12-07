import React from "react";
import { Typography, Paper, Button, Box, Stack, ThemeProvider, useTheme, IconButton } from "@mui/material";
import MaterialReactTable from "material-react-table";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import { putOperation } from "../services/OperationService.js";
import { updateOperation } from "../state/operationsSlice.js";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function TableWithTitle({ title, action, tableProps }) {
    const navigate = useNavigate();
    const theme = useTheme();
    const dispatch = useDispatch();

    const handleSaveCell = (cell, value) => {
        const columnDef = cell.column.columnDef;
        const attributeName = columnDef.attributeName;
        const columnName = columnDef.columnName;
        const operationId = cell.row.original.id;
        const operation = tableProps.data.find((op) => op.id === operationId);
        putOperation(operationId, columnName, attributeName, value).then(
            (res) => {
                console.log(operation, attributeName, value);
                dispatch(updateOperation({ ...operation, [attributeName]: value }));
            },
        );
    };

    return (
        <Stack gap={1}>
            <Paper sx={{ px: 2, py: 1 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography variant="h5" sx={{ mt: 0.25 }}>
                        {title}
                    </Typography>
                    {action && (
                        <Button variant="contained" onClick={action.onClick}>
                            {action.icon}
                            {action.label}
                        </Button>
                    )}
                </Box>
            </Paper>
            <Paper sx={{ px: 2, py: 1 }}>
                {tableProps && (
                    <ThemeProvider theme={{ ...theme, palette: { ...theme.palette, background: { ...theme.palette.background, default: "#fff" } } }}>
                        <MaterialReactTable
                            columns={tableProps.columns}
                            editingMode="cell"
                            data={tableProps.data}
                            enableDensityToggle={false}
                            enableFullScreenToggle={false}
                            enableEditing
                            muiTableBodyCellEditTextFieldProps={({ cell }) => ({
                                onBlur: (event) => {
                                    handleSaveCell(cell, event.target.value);
                                },
                            })}
                            enableColumnActions={false}
                            enableRowActions
                            renderRowActions={(row, index) => (
                                <Box sx={{ display: "flex" }}>
                                    <IconButton onClick={() => navigate(`/ops/${row.cell.row.original.id}`)}>
                                        <ReadMoreIcon />
                                    </IconButton>
                                    <IconButton onClick={() => console.info("Delete")}>
                                        <LocalPrintshopIcon />
                                    </IconButton>
                                </Box>
                            )}
                            muiTablePaperProps={{ elevation: 0 }} />

                    </ThemeProvider>
                )}
            </Paper>
        </Stack>
    );
}

export default TableWithTitle;
