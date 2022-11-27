import { store } from "../state/store";
import moment from "moment";

const collaboratorColumns = [
    { header: "Fecha", accessorFn: (row) => moment(row.creationDate).format("DD/MM/YYYY") },
    { header: "Codigo Operacion", accessorFn: (row) => row.operationCode || "---" },
    { header: "Estado", accessorFn: (row) => row.status || "---" },
    { header: "Tramitadora", accessorFn: (row) => row.processor || "---" },
    { header: "Apellidos", accessorFn: (row) => row.customerLastName || "---" },
];

const adminColumns = [
    { header: "Fecha", accessorFn: (row) => moment(row.creationDate).format("DD/MM/YYYY") },
    { header: "Codigo Operacion", accessorFn: (row) => row.operationCode || "---" },
    { header: "Canal Tramitacion", accessorFn: (row) => row.channelName || "---" },
    { header: "Estado", accessorFn: (row) => row.status || "---" },
    { header: "Tramitadora", accessorFn: (row) => row.processor || "---" },
    { header: "Codigo colaborador", accessorFn: (row) => row.collaboratorCode || "---" },
    { header: "Apellidos", accessorFn: (row) => row.customerLastName || "---" },
];

function hasRole(role) {
    return getRole() === role;
}

function hasAnyRole(roles) {
    return roles.includes(getRole());
}

export function isAdmin() {
    return hasAnyRole(["ADMIN", "SUPER_ADMIN"]);
}

export function isProcessorOrUpperRole() {
    return hasAnyRole(["PROCESSOR", "PROCESSOR_ADVANCED", "MANAGER", "ADMIN", "SUPER_ADMIN"]);
}

export function isCollaborator() {
    return hasAnyRole(["COLLABORATOR_MOVISTAR", "COLLABORATOR_ALL"]);
}

export function getRole() {
    return store.getState().session.user.role;
}

export function getOperationTableColumnsByRole() {
    if (isProcessorOrUpperRole()) {
        return adminColumns;
    } else {
        return collaboratorColumns;
    }
}
