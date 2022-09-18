import { doSecureGet } from "../utils/RequestUtils";

export async function getProducts() {
    try {
        const res = await doSecureGet("http://localhost:8080/api/v1/products", {});
        if (res.data.ok) {
            return res.data.data;
        } else throw { message: "Unexpected server error", res };
    } catch (error) {
        console.log(error.message);
        return null;
    }
}
