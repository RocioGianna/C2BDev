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
    return store.getState().session.user.roles.some((r) => r === "ADMIN");
}

export function getRoles() {
    return store.getState().session.user.roles;
}

function hasAnyRole(roles) {
    const currentUserRoles = getRoles();
    return currentUserRoles.some((r) => roles.includes(r));
}

function hasRole(role) {
    const currentUserRoles = getRoles();
    return currentUserRoles.some((r) => r === role);
}

export function getOperationTableColumnsByRole() {
    let roles = ["ADMIN", "PROCESSOR"];
    if (hasAnyRole(roles)) {
        return adminColumns;
    }

    if (hasRole("USER")) {
        return colaboratorColumns;
    }

    return [];
}
