import { doSecureGet } from "../utils/RequestUtils";

export async function fetchCollaborators() {
    try {
        const res = await doSecureGet(`${ENV2B_BACKEND_URL}/api/v1/users`);
        if (res.data.ok) {
            return res.data;
        } else throw { message: "Unexpected server error", res };
    } catch (error) {
        console.log(error.message);
        return null;
    }
}

export async function fetchCollaboratorsById(collabId) {
    try {
        const res = await doSecureGet(`${ENV2B_BACKEND_URL}/api/v1/users`, collabId);
        if (res.data.ok) {
            return res.data;
        } else throw { message: "Unexpected server error", res };
    } catch (error) {
        console.log(error.message);
        return null;
    }
}
