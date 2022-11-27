import React from "react";
import { Typography, Paper, Button, Box, Stack, ThemeProvider, useTheme } from "@mui/material";
import MaterialReactTable from "material-react-table";


function TableWithTitle({ title, action, tableProps }) {
    const theme = useTheme();
    return (
        <Stack gap={1}>
            <Paper sx={{ px: 2, py: 1 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography variant="h5" sx={{ mt: 0.25 }}>{title}</Typography>
                    {
                        action
                        && <Button variant="contained" onClick={action.onClick}>
                            {action.icon}
                            {action.label}
                        </Button>
                    }
                </Box>
            </Paper>
            {tableProps
            && <ThemeProvider theme={{ ...theme, palette: { ...theme.palette, background: { ...theme.palette.background, default: "#fff" } } }}>
                <MaterialReactTable
                    columns={tableProps.columns}
                    data={tableProps.data}
                    enableDensityToggle={false}
                    enableFullScreenToggle={false} />
            </ThemeProvider>}
        </Stack>
    );
}

export default TableWithTitle;
