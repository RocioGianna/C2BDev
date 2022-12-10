import React from "react";
import { Paper, Stack, ThemeProvider, useTheme, IconButton } from "@mui/material";
import MaterialReactTable from "material-react-table";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import { putOperation } from "../services/OperationService.js";
import { updateOperation } from "../state/operationsSlice.js";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MRT_Localization_ES } from "material-react-table/locales/es";
import TitleBar from "./containers/TitleBar/TitleBar.jsx";


function TableWithTitle({ title, actions, tableProps }) {
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
        <Stack spacing={2}>
            <TitleBar title={title} actions={actions} />
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
                            positionActionsColumn="last"
                            enableRowActions
                            renderRowActions={(row) => (
                                <IconButton onClick={() => navigate(`/ops/${row.cell.row.original.id}`)}>
                                    <ReadMoreIcon color="primary" />
                                </IconButton>
                            )}
                            muiTablePaperProps={{ elevation: 0 }}
                            localization={MRT_Localization_ES} />

                    </ThemeProvider>
                )}
            </Paper>
        </Stack>
    );
}

export default TableWithTitle;
