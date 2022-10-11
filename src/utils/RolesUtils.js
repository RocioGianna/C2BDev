import { store } from "../state/store";

export function isAdmin() {
    return store.getState().session.user.roles.some((r) => r === "ADMIN");
}
