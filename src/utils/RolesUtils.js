export function isAdmin(roles) {
    return roles.some((r) => r === "ADMIN");
}
