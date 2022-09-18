import { productsFetched, additionalsFetched } from "../state/productSlice";
import { store } from "../state/store";
import { doSecureGet } from "../utils/RequestUtils";

export async function fetchProducts() {
    try {
        const res = await doSecureGet("http://localhost:8080/api/v1/products", {});
        if (res.data.ok) {
            store.dispatch(productsFetched(res.data.data));
            return res.data.data;
        } else throw { message: "Unexpected server error", res };
    } catch (error) {
        console.log(error.message);
        return null;
    }
}

export async function fetchAdditionals() {
    try {
        const res = await doSecureGet("http://localhost:8080/api/v1/additionals", {});
        if (res.data.ok) {
            store.dispatch(additionalsFetched(res.data.data));
            return res.data.data;
        } else throw { message: "Unexpected server error", res };
    } catch (error) {
        console.log(error.message);
        return null;
    }
}
