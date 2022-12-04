import { doSecurePost } from "../utils/RequestUtils";
import { doSecureGet } from "../utils/RequestUtils";
import { doSecureDelete } from "../utils/RequestUtils";

export async function postDocumentation(file, userId) {
    const formData = new FormData();
    formData.append("file", file);

    try {
        const res = await doSecurePost(`${ENV2B_BACKEND_URL}/api/v1/documentation?userId=${userId}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        if (res.data.ok) {
            return res.data;
        } else throw { message: "Unexpected server error", res };
    } catch (error) {
        console.log(error.message);
        return null;
    }
}

export async function deleteDocumentation(docId) {
    try {
        const res = await doSecureDelete(`${ENV2B_BACKEND_URL}/api/v1/documentation/${docId}`);
        if (res.data.ok) {
            console.log(res.data);
            return res.data;
        } else throw { message: "Unexpected server error", res };
    } catch (error) {
        console.log(error.message);
        return null;
    }
}
