import { doSecureGet } from "../utils/RequestUtils";

export async function fetchOperations() {
    try {
        const res = await doSecureGet(`${ENV2B_BACKEND_URL}/api/v1/operations`);
        if (res.data.ok) {
            return res.data;
        } else throw { message: "Unexpected server error", res };
    } catch (error) {
        console.log(error.message);
        return null;
    }
}

