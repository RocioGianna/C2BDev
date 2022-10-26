import { store } from "../state/store";
import {IconButton} from "@mui/material";
import moment from "moment";
import ReadMoreIcon from "@mui/icons-material/ReadMore";

const colaboratorColumns = [
    { flex: 1, field: "creationDate", headerName: "Fecha", valueGetter: (params) => moment(params?.row?.creationDate).format("DD/MM/YYYY") },
    { flex: 1, field: "operationCode", headerName: "Codigo Operacion" },
    { flex: 1, field: "status", headerName: "Estado" },
    { flex: 1, field: "processorId", headerName: "Tramitadora" },
    { flex: 1, field: "processorId", headerName: "Tramitadora" },
    { flex: 1, field: "customer[lastname]", headerName: "Apellidos", valueGetter: (params) => params?.row?.customer?.lastname },
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

function handleClick(event, cellValues) {
    console.log("CLICK")
}

const adminColumns = [
    { flex: 1, field: "creationDate", headerName: "Fecha", valueGetter: (params) => moment(params?.row?.creationDate).format("DD/MM/YYYY") },
    { flex: 1, field: "operationCode", headerName: "Codigo Operacion" },
    { flex: 1, field: "status", headerName: "Estado" },
    { flex: 1, field: "channel", headerName: "Canal Tramitacion" },
    { flex: 1, field: "colaboratorCode", headerName: "Codigo colaborador" },
    { flex: 1, field: "customer[lastname]", headerName: "Apellidos", valueGetter: (params) => params?.row?.customer?.lastname },
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

export function isAdmin() {
    return store.getState().session.user.roles.some((r) => r === "ADMIN");
}

export function getRoles() {
    return store.getState().session.user.roles;
}

export function getOperationTableColumnsByRole() {
    const roles = getRoles();
    if (roles.length === 1) {
        let role = roles[0];
        switch (role) {
            case "ADMIN":
                return adminColumns;
            case "USER":
                return colaboratorColumns;
            default:
                throw "Not valid role";
        }
    }
}
