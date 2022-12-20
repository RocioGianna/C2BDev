import React from "react";
import MaterialReactTable from "material-react-table";
import { MRT_Localization_ES } from "material-react-table/locales/es";
import { ThemeProvider, useTheme } from "@mui/material";


function Table({ columns, data, handleSaveCell, renderRowActions }) {
    const theme = useTheme();
    return (
        <ThemeProvider theme={{ ...theme, palette: { ...theme.palette, background: { ...theme.palette.background, default: "#fff" } } }}>
            <MaterialReactTable
                columns={columns}
                editingMode="cell"
                data={data}
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
                renderRowActions={renderRowActions}
                muiTablePaperProps={{ elevation: 0 }}
                localization={MRT_Localization_ES} />

        </ThemeProvider>
    );
}

export default Table;
