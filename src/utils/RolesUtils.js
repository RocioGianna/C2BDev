import { store } from "../state/store";


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
    return hasRole("COLLABORATOR");
}

export function getRole() {
    return store.getState().session.user.role;
}
