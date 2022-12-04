import { store } from "../state/store";
import moment from "moment";

const alignCenter = {
    muiTableHeadCellProps: { align: "center" },
    muiTableBodyCellProps: { align: "center" },
};

const collaboratorColumns = [
    { header: "Fecha", accessorFn: (row) => moment(row.creationDate).format("DD/MM/YYYY"), ...alignCenter },
    { header: "Codigo Operacion", accessorFn: (row) => row.operationCode || "---" },
    { header: "Estado", accessorFn: (row) => row.status || "---", ...alignCenter, filterVariant: "select" },
    { header: "Tramitadora", accessorFn: (row) => row.processor || "---", ...alignCenter, filterVariant: "select" },
    { header: "Apellidos", accessorFn: (row) => row.customerLastName || "---", ...alignCenter },
];

const adminColumns = [
    { header: "Fecha", accessorFn: (row) => moment(row.creationDate).format("DD/MM/YYYY"), ...alignCenter },
    {
        header: "Codigo Operacion",
        accessorFn: (row) => row.operationCode || "---", ...alignCenter,
    },
    { header: "Canal Tramitacion", accessorFn: (row) => row.channelName || "---", ...alignCenter, filterVariant: "select" },
    { header: "Estado", accessorFn: (row) => row.status || "---", ...alignCenter, filterVariant: "select" },
    { header: "Tramitadora", accessorFn: (row) => row.processor || "---", ...alignCenter },
    { header: "Codigo colaborador", accessorFn: (row) => row.collaboratorCode || "---", ...alignCenter },
    { header: "Apellidos", accessorFn: (row) => row.customerLastName || "---", ...alignCenter },
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
