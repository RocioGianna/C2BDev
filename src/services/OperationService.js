import { doSecurePost } from "../utils/RequestUtils";

export async function postProducts(body) {
    console.log(body);

    try {
        const res = await doSecurePost(`${ENV2B_BACKEND_URL}/api/v1/operations/admin`, body);
        console.log(res);
        if (res.data.ok) {
            return res.data;
        } else throw { message: "Unexpected server error", res };
    } catch (error) {
        console.log(error.message);
        return null;
    }
}
