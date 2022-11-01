import React, { useEffect, useState } from "react";
import { Box, Select, TextField, FormControl, MenuItem, InputLabel, Stack, IconButton, Popover } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material/styles";
import { CustomNoRowsOverlay } from "./CustomNoRowsOverlay";

//Lupita para todos attributes
//Filtrar por atributos que aparecen en las columnas
// Utils
const operators = [
    {
        name: "contiene",
        fn: () => {
            return true;
        },
    },
    {
        name: "igual",
        fn: () => {
            return true;
        },
    },
    {
        name: "comienza con",
        fn: () => {
            return true;
        },
    },
    {
        name: "termina con",
        fn: () => {
            return true;
        },
    },
    {
        name: "es vacio",
        fn: () => {
            return true;
        },
    },
    {
        name: "no es vacio",
        fn: () => {
            return true;
        },
    },
    {
        name: "es alguno de",
        fn: () => {
            return true;
        },
    },
];

export const StyledGridOverlay = styled("div")(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    "& .ant-empty-img-1": {
        fill: theme.palette.mode === "light" ? "#aeb8c2" : "#262626",
    },
    "& .ant-empty-img-2": {
        fill: theme.palette.mode === "light" ? "#f5f5f7" : "#595959",
    },
    "& .ant-empty-img-3": {
        fill: theme.palette.mode === "light" ? "#dce0e6" : "#434343",
    },
    "& .ant-empty-img-4": {
        fill: theme.palette.mode === "light" ? "#fff" : "#1c1c1c",
    },
    "& .ant-empty-img-5": {
        fillOpacity: theme.palette.mode === "light" ? "0.8" : "0.08",
        fill: theme.palette.mode === "light" ? "#f5f5f5" : "#fff",
    },
}));

function Filter({ columns, setResult, rows }) {
    const properties = columns.map((a) => {
        const { headerName } = a;
        return headerName;
    });
    const [property, setProperty] = useState(properties[0]);
    const [operator, setOperator] = useState(operators[0]);
    const [value, setValue] = useState("");

    function updateResult() {
        let currentProperty = property;
        let currentOperator = operator;
        let currrentValue = value;
        const result = rows;

        console.log("currentPropery:" + currentProperty);
        console.log("currentOperator:" + currentOperator.name);
        console.log("currrentValue:" + currrentValue);

        /* result.filter((op) => currentOperator.fn(op[currentProperty], currentValue)); */

        setResult(result);
    }

    useEffect(() => {
        updateResult();
    }, [property, operator, value]);

    return (
        <Box sx={{ py: 2 }}>
            <Box>
                <FormControl fullWidth>
                    <InputLabel id="attr-label">Atributo</InputLabel>
                    <Select labelId="attr-label" id="attr-select" autoWidth value={property} label="Atributo" onChange={(e) => setProperty(e.target.value)}>
                        {properties.map((p) => {
                            return <MenuItem value={p}>{p}</MenuItem>;
                        })}
                    </Select>
                </FormControl>
            </Box>
            <Box>
                <FormControl fullWidth>
                    <InputLabel id="type-label">Operador</InputLabel>
                    <Select labelId="type-label" id="type-select" autoWidth value={property} label="Operador" onChange={(e) => setOperator(e.target.value)}>
                        {operators.map((op) => {
                            return <MenuItem value={op}>{op.name}</MenuItem>;
                        })}
                    </Select>
                </FormControl>
            </Box>
            <Box>
                <TextField id="outlined-basic" label="Valor" variant="outlined" value={value} onChange={(e) => setValue(e.target.value)} />
            </Box>
        </Box>
    );
}

function SearchBar({ setResult, rows }) {
    const [search, setSearch] = useState("");

    function handleSearch() {
        if (search.trim() === "") {
            setResult(rows);
        } else {
            const flatten = (obj, roots = [], sep = ".") => Object.keys(obj).reduce((memo, prop) => Object.assign({}, memo, Object.prototype.toString.call(obj[prop]) === "[object Object]" ? flatten(obj[prop], roots.concat([prop]), sep) : { [roots.concat([prop]).join(sep)]: obj[prop] }), {});
            const filteredRows = rows.filter((obj) => Object.values(flatten(obj)).some((val) => val.toString().indexOf(search) >= 0));
            setResult(filteredRows);
        }
    }

    useEffect(() => {
        handleSearch();
    }, [search]);

    return (
        <Stack direction="row" spacing={2} sx={{ width: "100%" }}>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <SearchIcon color="primary" />
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <TextField
                    size="small"
                    variant="standard"
                    id="outlined-basic"
                    label="Valor"
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                    }}
                />
            </Box>

            <IconButton onClick={() => setSearch("")}>
                <CloseIcon color="primary" />
            </IconButton>
        </Stack>
    );
}

function Tools({ setResult, rows }) {
    const [mode, setMode] = useState("");

    return (
        <Box sx={{ display: "flex", flexDirection: "row-reverse", justifyContent: "space-between", pb: 2 }}>
            <Stack direction="row" spacing={1}>
                <IconButton onClick={() => setMode("search")}>
                    <SearchIcon color="primary" />
                </IconButton>
                <IconButton onClick={() => setMode("filter")} disabled>
                    <FilterAltIcon color="primary" />
                </IconButton>
            </Stack>
            <Box sx={{ flexGrow: 1, width: "100%" }}>{mode === "search" ? <SearchBar setResult={setResult} rows={rows} /> : null}</Box>
            <Box sx={{ flexGrow: 1 }}>{mode === "filter" ? <div>Filter</div> : null}</Box>
        </Box>
    );
}

export default function CustomDataGrid({ columns, rows }) {
    const [result, setResult] = useState(rows);

    return (
        <Box sx={{ height: 400, p: 3, pb: 10, background: "white" }}>
            <Tools setResult={setResult} rows={rows} />
            <DataGrid
                components={{
                    NoRowsOverlay: CustomNoRowsOverlay,
                }}
                rows={result}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                disableSelectionOnClick
                experimentalFeatures={{ newEditingApi: true }}
            />
        </Box>
    );
}
