import { doSecurePost } from "../utils/RequestUtils";

export async function postOperation(body) {
    try {
        const res = await doSecurePost(`${ENV2B_BACKEND_URL}/api/v1/operations/admin`, body);
        if (res.data.ok) {
            return res.data;
        } else throw { message: "Unexpected server error", res };
    } catch (error) {
        console.log(error.message);
        return null;
    }
}

export async function fetchOperations() {
    try {
        const res = await doSecureGet(`${ENV2B_BACKEND_URL}/api/v1/operations`, body);
        if (res.data.ok) {
            return res.data;
        } else throw { message: "Unexpected server error", res };
    } catch (error) {
        console.log(error.message);
        return null;
    }
}

export async function fetchOperation() {
    try {
        const res = await doSecureGet(`${ENV2B_BACKEND_URL}/api/v1/operations`, body);
        if (res.data.ok) {
            return res.data;
        } else throw { message: "Unexpected server error", res };
    } catch (error) {
        console.log(error.message);
        return null;
    }
}
