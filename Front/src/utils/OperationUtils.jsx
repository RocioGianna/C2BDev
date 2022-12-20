import React, { useEffect } from "react";
import moment from "moment";
import { MenuItem, Select } from "@mui/material";
import { isProcessorOrUpperRole } from "./RolesUtils";
import { ProcessingChannel } from "../model/Operation/ProcessingChannels.js";
import { putOperation } from "../services/OperationService.js";
import { store } from "../state/store.js";
import { updateOperation } from "../state/operationsSlice.js";
import { fetchProcessors } from "../services/CollaboratorService.js";
import { Autocomplete, TextField } from "@mui/material";

const alignCenter = {
    muiTableHeadCellProps: { align: "center" },
    muiTableBodyCellProps: { align: "center" },
};

export const getPossibleStatus = (operationStatus) => {
    const statusMap = store.getState().operations.statusMap;
    return statusMap[operationStatus];
};

function ProcessorAutocomplete({ onChange, cell, table }) {
    const [processors, setProcessors] = React.useState([]);
    useEffect(() => {
        fetchProcessors().then((res) => {
            setProcessors(res.data.map((processor) => (processor.userCode)));
        });
    }, []);

    if (processors.length === 0) return null;

    return (
        <Autocomplete
            value={cell.getValue()}
            id="processor"
            options={processors}
            disableClearable
            renderInput={(params) => (<TextField
                {...params}
                variant={"standard"}
                margin="none"
                sx={{
                    "& input": {
                        textAlign: "center",
                        fontSize: "0.875rem",
                    },
                }} />)}
            onInputChange={(event, value) => {
                fetchProcessors(value).then((res) => {
                    setProcessors(res.data.map((processor) => (processor.userCode)));
                });
            }}
            onChange={(event, value) => {
                handleSaveCell(cell, value);
                table.setEditingCell();
            }} />
    );
}


const handleSaveCell = (cell, value) => {
    const columnDef = cell.column.columnDef;
    const attributeName = columnDef.attributeName;
    const columnName = columnDef.columnName;
    const operationId = cell.row.original.id;
    const operation = cell.row.original;
    putOperation(operationId, columnName, attributeName, value).then(
        (res) => {
            store.dispatch(updateOperation({ ...operation, [attributeName]: value }));
        },
    );
};


export function isRequiringAttention(operation) {
    return true;
}

const collaboratorColumns = [
    { header: "Fecha", accessorFn: (row) => moment(row.creationDate).format("DD/MM/YYYY"), ...alignCenter },
    { header: "Codigo Operacion", accessorFn: (row) => row.operationCode || "---" },
    { header: "Estado", accessorFn: (row) => row.status || "---", ...alignCenter, filterVariant: "select" },
    { header: "Tramitadora", accessorFn: (row) => row.processorId || "---", ...alignCenter, filterVariant: "select" },
    { header: "Apellidos", accessorFn: (row) => row.customerLastName || "---", ...alignCenter },
];

const adminColumns = [
    { header: "Fecha", accessorFn: (row) => moment(row.creationDate).format("DD/MM/YYYY"), ...alignCenter, enableEditing: false },
    {
        header: "Codigo Operacion",
        accessorFn: (row) => row.operationCode || "---", ...alignCenter, enableEditing: false,
    },
    {
        header: "Canal Tramitacion", accessorFn: (row) => row.channel || "---", ...alignCenter, filterVariant: "select",
        Edit: (props) => (
            <Select
                value={props.cell.getValue()}
                onChange={(event) => {
                    handleSaveCell(props.cell, event.target.value);
                    props.table.setEditingCell();
                }}
                variant="standard">
                {Object.entries(ProcessingChannel).map((channel) => (
                    <MenuItem key={channel[0]} value={channel[0]} >
                        {channel[0]}
                    </MenuItem>
                ))}
            </Select>
        ),
        columnName: "CHANNEL",
        attributeName: "channel",

    },
    {
        header: "Estado", accessorFn: (row) => row.status || "---", ...alignCenter, filterVariant: "select", columnName: "STATUS", attributeName: "status",
        Edit: (props) => (
            <Select
                value={props.cell.getValue()}
                onChange={(event) => {
                    handleSaveCell(props.cell, event.target.value);
                    props.table.setEditingCell();
                }}
                variant="standard">
                <MenuItem value={props.cell.getValue()}>{props.cell.getValue()}</MenuItem>
                {getPossibleStatus(props.cell.getValue()).map((status) => (
                    <MenuItem key={status} value={status} >
                        {status}
                    </MenuItem>
                ))}
            </Select>
        ),
    },
    {
        header: "Tramitadora", accessorFn: (row) => row.processorId || "---", ...alignCenter, filterVariant: "select", columnName: "PROCESSOR", attributeName: "processorId",
        Edit: (props) => (
            <ProcessorAutocomplete cell={props.cell} table={props.table} />
        ),
    },
    { header: "Codigo colaborador", accessorFn: (row) => row.collaboratorCode || "---", ...alignCenter, enableEditing: false },
    { header: "Apellidos", accessorFn: (row) => row.lastName || "---", ...alignCenter, enableEditing: false },
];


export function getOperationTableColumnsByRole() {
    if (isProcessorOrUpperRole()) {
        return adminColumns;
    } else {
        return collaboratorColumns;
    }
}

