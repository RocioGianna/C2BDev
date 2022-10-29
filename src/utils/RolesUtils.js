import { store } from "../state/store";
import moment from "moment";

const colaboratorColumns = [
    { headerAlign: "center", align: "center", flex: 1, field: "creationDate", headerName: "Fecha", valueGetter: (params) => moment(params?.row?.creationDate).format("DD/MM/YYYY") },
    { headerAlign: "center", align: "center", flex: 1, field: "operationCode", headerName: "Codigo Operacion" },
    { headerAlign: "center", align: "center", flex: 1, field: "status", headerName: "Estado" },
    { headerAlign: "center", align: "center", flex: 1, field: "processorId", headerName: "Tramitadora" },
    { headerAlign: "center", align: "center", flex: 1, field: "customer[lastname]", headerName: "Apellidos", valueGetter: (params) => params?.row?.customer?.lastname },
    { headerAlign: "center", align: "center", field: "details", headerName: "Acciones", width: 110 },
];

const adminColumns = [
    { headerAlign: "center", align: "center", flex: 1, field: "creationDate", headerName: "Fecha", valueGetter: (params) => moment(params?.row?.creationDate).format("DD/MM/YYYY") },
    { headerAlign: "center", align: "center", flex: 1, field: "operationCode", headerName: "Codigo Operacion" },
    { headerAlign: "center", align: "center", flex: 1, field: "status", headerName: "Estado" },
    { headerAlign: "center", align: "center", flex: 1, field: "channel", headerName: "Canal Tramitacion" },
    { headerAlign: "center", align: "center", flex: 1, field: "colaboratorCode", headerName: "Codigo colaborador" },
    { headerAlign: "center", align: "center", flex: 1, field: "customer[lastname]", headerName: "Apellidos", valueGetter: (params) => params?.row?.customer?.lastname },
    { headerAlign: "center", align: "center", field: "details", headerName: "Acciones", width: 110 },
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
