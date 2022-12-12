import axios from "axios";
import { refreshAccessToken } from "../services/AuthService";
import { store } from "../state/store";
import { loggedOut } from "../state/sessionSlice";

export const doSecureGet = async (url, config) => {
    return doSecureRequest({ method: "get", url, ...config });
};

export const doSecurePost = async (url, data, config) => {
    return doSecureRequest({ method: "post", url, data, ...config });
};

export const doSecureDelete = async (url, data, config) => {
    return doSecureRequest({ method: "delete", url, ...config });
};

export const doSecurePut = async (url, data, config) => {
    return doSecureRequest({ method: "put", url, data, ...config });
};

const doSecureRequest = async (config) => {
    try {
        return await axios({
            ...config,
            headers: { ...config.headers, Authorization: "Bearer " + store.getState().session.accessToken },
        });
    } catch (error) {
        try {
            if (error.response.status === 403) {
                console.log("Access token expired, refreshing...");
                await refreshAccessToken();
                return await axios({
                    ...config,
                    headers: { ...config.headers, Authorization: "Bearer " + store.getState().session.accessToken },
                });
            } else throw error;
        } catch (error) {
            if (error.response.status === 403) {
                console.log("Refresh token expired");
                store.dispatch(loggedOut());
                localStorage.removeItem("refreshToken");
            } else {
                throw error;
            }
        }
    }
};
