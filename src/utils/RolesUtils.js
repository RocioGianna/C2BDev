import { store } from "../state/store";
import moment from "moment";

const colaboratorColumns = [
    { headerAlign: "center", align: "center", flex: 1, field: "creationDate", headerName: "Fecha", valueGetter: (params) => moment(params?.row?.creationDate).format("DD/MM/YYYY") },
    { headerAlign: "center", align: "center", flex: 1, field: "operationCode", headerName: "Codigo Operacion", valueGetter: ({ value }) => value || "---" },
    { headerAlign: "center", align: "center", flex: 1, field: "status", headerName: "Estado", valueGetter: ({ value }) => value || "---" },
    { headerAlign: "center", align: "center", flex: 1, field: "processorId", headerName: "Tramitadora", valueGetter: ({ value }) => value || "---" },
    { headerAlign: "center", align: "center", flex: 1, field: "customerLastName", headerName: "Apellidos", valueGetter: ({ value }) => value || "---" },
    { headerAlign: "center", align: "center", field: "details", headerName: "Acciones", width: 110, valueGetter: ({ value }) => value || "---" },
];

const adminColumns = [
    { headerAlign: "center", align: "center", flex: 1, field: "creationDate", headerName: "Fecha", valueGetter: (params) => moment(params?.row?.creationDate).format("DD/MM/YYYY") },
    { headerAlign: "center", align: "center", flex: 1, field: "operationCode", headerName: "Codigo Operacion", valueGetter: ({ value }) => value || "---" },
    { headerAlign: "center", align: "center", flex: 1, field: "channel", headerName: "Canal Tramitacion", valueGetter: ({ value }) => value || "---" },
    { headerAlign: "center", align: "center", flex: 1, field: "status", headerName: "Estado", valueGetter: ({ value }) => value || "---" },
    { headerAlign: "center", align: "center", flex: 1, field: "processorId", headerName: "Tramitadora", valueGetter: ({ value }) => value || "---" },
    { headerAlign: "center", align: "center", flex: 1, field: "collaboratorCode", headerName: "Codigo colaborador", valueGetter: ({ value }) => value || "---" },
    { headerAlign: "center", align: "center", flex: 1, field: "customerLastName", headerName: "Apellidos", valueGetter: ({ value }) => value || "---" },
    { headerAlign: "center", align: "center", field: "details", headerName: "Acciones", width: 110, valueGetter: ({ value }) => value || "---" },
];

export function isAdmin() {
    return hasRole("ADMIN");
}

export function getRole() {
    return store.getState().session.user.role;
}

function hasRole(role) {
    return getRole() === role;
}

function hasAnyRole(roles) {
    return roles.some((r) => hasRole(r));
}

export function getOperationTableColumnsByRole() {
    let roles = ["ADMIN", "PROCESSOR"];
    if (hasAnyRole(roles)) {
        return adminColumns;
    }

    if (hasRole("COLABORATOR")) {
        return colaboratorColumns;
    }

    return [];
}
