import React, { useEffect, useState } from "react";
import { Box, Select, TextField, FormControl, MenuItem, InputLabel, Stack, IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { CustomNoRowsOverlay } from "./CustomNoRowsOverlay";
import { useLocation } from "react-router-dom";

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

function Filter({ columns, setResult, rows }) {
    const properties = columns.map((a) => {
        const { headerName } = a;
        return headerName;
    });
    const [property, setProperty] = useState(properties[0]);
    const [operator, setOperator] = useState(operators[0]);
    const [value, setValue] = useState("");

    function updateResult() {
        const result = rows;
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

function SearchBar({ setResult, rows, setMode }) {
    const [search, setSearch] = useState("");

    function handleSearch() {
        if (search.trim() === "") {
            setResult(rows);
        } else {
            const flatten = (obj, roots = [], sep = ".") => Object.keys(obj).reduce((memo, prop) => Object.assign({}, memo, Object.prototype.toString.call(obj[prop]) === "[object Object]" ? flatten(obj[prop], roots.concat([prop]), sep) : { [roots.concat([prop]).join(sep)]: obj[prop] }), {});
            const filteredRows = rows.filter((obj) => Object.values(flatten(obj)).some((val) => val?.toString().indexOf(search) >= 0));
            setResult(filteredRows);
        }
    }

    useEffect(() => {
        handleSearch();
    }, [search,rows]);

    const handleCleanSearchBar = () => {
        if (search.trim() === "") {
            setMode("");
        } else {
            setSearch("");
        }
    };

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

            <IconButton onClick={() => handleCleanSearchBar()}>
                <CloseIcon color="primary" />
            </IconButton>
        </Stack>
    );
}

function Tools({ setResult, rows }) {
    const [mode, setMode] = useState("");
    const location = useLocation()

    const handleClickSearch = () => {
        if (mode === "search") {
            setMode("");
        } else {
            setMode("search");
        }
    };

    useEffect(() => {
        setMode("")
    },[location])

    return (
        <Box sx={{ display: "flex", flexDirection: "row-reverse", justifyContent: "space-between", pb: 2 }}>
            <Stack direction="row" spacing={1}>
                <IconButton onClick={() => handleClickSearch()}>
                    <SearchIcon color="primary" />
                </IconButton>
                <IconButton onClick={() => setMode("filter")} disabled>
                    <FilterAltIcon color="primary" />
                </IconButton>
            </Stack>
            <Box sx={{ flexGrow: 1, width: "100%" }}>{mode === "search" ? <SearchBar setResult={setResult} rows={rows} setMode={setMode} /> : null}</Box>
            <Box sx={{ flexGrow: 1 }}>{mode === "filter" ? <div>Filter</div> : null}</Box>
        </Box>
    );
}

export default function CustomDataGrid({ columns, rows }) {
    const [result, setResult] = useState(rows);

    useEffect(()=>{
        setResult(rows)
    },[rows])

    return (
        <Box sx={{ height: 400, p: 3, pb: 10, background: "white" }}>
            <Tools setResult={setResult} rows={rows} />
            <DataGrid
                getRowId={(row) => row.id}
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
