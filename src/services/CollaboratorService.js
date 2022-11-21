import { doSecureGet } from "../utils/RequestUtils";

export async function fetchCollaborators(userCode) {
    try {
        const res = await doSecureGet(`${ENV2B_BACKEND_URL}/api/v1/users${userCode ? `?user-code="${userCode}"` : ""}`);
        if (res.data.ok) {
            console.log(res.data);
            return res.data;
        } else throw { message: "Unexpected server error", res };
    } catch (error) {
        console.log(error.message);
        return null;
    }
}
