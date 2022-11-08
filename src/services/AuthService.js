import axios from "axios";
import { store } from "../state/store";
import { loggedIn, loggedOut } from "../state/sessionSlice";
import { doSecurePost } from "../utils/RequestUtils";

export async function login(email, password) {
    try {
        const res = await axios.post(`${ENV2B_BACKEND_URL}/login?username=${email}&password=${password}`);
        if (res.data.ok) {
            localStorage.setItem("refreshToken", res.data.data.tokens.refreshToken);
            console.log(res.data.data);
            store.dispatch(
                loggedIn({
                    user: res.data.data.user,
                    accessToken: res.data.data.tokens.accessToken,
                })
            );
            return true;
        }
    } catch (error) {
        console.log(error.message);
    }
    return false;
}

export async function refreshAccessToken() {
    const token = localStorage.getItem("refreshToken");
    try {
        if (token) {
            const res = await axios.post(`${ENV2B_BACKEND_URL}/refreshToken?token=${token}`);
            if (res.data.ok) {
                store.dispatch(
                    loggedIn({
                        user: res.data.data.user,
                        accessToken: res.data.data.tokens.accessToken,
                    })
                );
            }
        } else throw new Error("No refresh token in localStorage");
    } catch (error) {
        localStorage.removeItem("refreshToken");
        console.log(error.message);
    }
    return false;
}

export async function logout() {
    try {
        const res = await doSecurePost(`${ENV2B_BACKEND_URL}/auth/logout`);
        if (res.data.ok) {
            store.dispatch(loggedOut());
            localStorage.removeItem("refreshToken");
            return true;
        }
    } catch (error) {
        console.log(error.message);
    }
    return false;
}
