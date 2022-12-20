import { doSecureGet } from "../utils/RequestUtils";

export async function fetchCollaborators(userCode) {
    try {
        const res = await doSecureGet(`${ENV2B_BACKEND_URL}/api/v1/users/${userCode ? `?userCode=${userCode}` : ""}`);
        if (res.data.ok) {
            return res.data;
        } else throw { message: "Unexpected server error", res };
    } catch (error) {
        console.log(error.message);
        return null;
    }
}

export async function fetchProcessors(userCode) {
    try {
        const res = await doSecureGet(`${ENV2B_BACKEND_URL}/api/v1/users/processors/${userCode ? `?userCode=${userCode}` : ""}`);
        if (res.data.ok) {
            return res.data;
        } else throw { message: "Unexpected server error", res };
    } catch (error) {
        console.log(error.message);
        return null;
    }
}
