import React from "react";
import { Typography, Paper, Button, Box, Stack, ThemeProvider, useTheme, IconButton } from "@mui/material";
import MaterialReactTable from "material-react-table";
import InfoIcon from "@mui/icons-material/Info";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";

function TableWithTitle({ title, action, tableProps }) {
    const theme = useTheme();

    const handleSaveCell = (cell, value) => {
        /* putOperation(cell.row.id, { [cell.column.id]: value }).then((res) => {
            console.log(res);
        }); */
        console.log(cell);
    };

    // TODO:

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
                            // onBlur is more efficient, but could use onChange instead
                                onBlur: (event) => {
                                    handleSaveCell(cell, event.target.value);
                                },
                            })}
                            enableColumnActions={false}
                            enableRowActions
                            renderRowActions={(row, index) => (
                                <Box sx={{ display: "flex" }}>
                                    <IconButton onClick={() => console.info("Edit")}>
                                        <InfoIcon />
                                    </IconButton>
                                    <IconButton onClick={() => console.info("Delete")}>
                                        <LocalPrintshopIcon />
                                    </IconButton>
                                </Box>
                            )}
                            muiTablePaperProps={{ elevation: 0, // change the mui box shadow

                            }} />

                    </ThemeProvider>
                )}
            </Paper>
        </Stack>
    );
}

export default TableWithTitle;
