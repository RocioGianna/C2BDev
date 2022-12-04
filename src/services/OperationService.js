import { permissionsFetched, statusMapFetched, operationFetched, operationsFetched } from "../state/operationsSlice";
import { store } from "../state/store";
import { doSecurePost } from "../utils/RequestUtils";
import { doSecureGet } from "../utils/RequestUtils";
import { doSecurePut } from "../utils/RequestUtils";

export async function postOperation(body) {
    try {
        const res = await doSecurePost(`${ENV2B_BACKEND_URL}/api/v1/operations`, body);
        if (res.data.ok) {
            return res.data;
        } else throw { message: "Unexpected server error", res };
    } catch (error) {
        console.log(error.message);
        return null;
    }
}

export async function postOperationAdmin(body) {
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
        const res = await doSecureGet(`${ENV2B_BACKEND_URL}/api/v1/operations`);
        if (res.data.ok) {
            return res.data;
        } else throw { message: "Unexpected server error", res };
    } catch (error) {
        console.log(error.message);
        return null;
    }
}

export async function fetchOperation(opId) {
    try {
        const res = await doSecureGet(`${ENV2B_BACKEND_URL}/api/v1/operations/${opId}`);
        if (res.data.ok) {
            store.dispatch(operationFetched(res.data.data));
            return res.data;
        } else throw { message: "Unexpected server error", res };
    } catch (error) {
        console.log(error.message);
        return null;
    }
}

export async function fetchOperationEditPermissions() {
    try {
        const res = await doSecureGet(`${ENV2B_BACKEND_URL}/api/v1/operations/edit-permissions`);
        if (res.data.ok) {
            store.dispatch(permissionsFetched(res.data.data));
            return res.data;
        } else throw { message: "Unexpected server error", res };
    } catch (error) {
        console.log(error.message);
        return null;
    }
}

export async function fetchStatusMap() {
    try {
        const res = await doSecureGet(`${ENV2B_BACKEND_URL}/api/v1/operations/status-map`);
        if (res.data.ok) {
            store.dispatch(statusMapFetched(res.data.data));
            return res.data;
        } else throw { message: "Unexpected server error", res };
    } catch (error) {
        console.log(error.message);
        return null;
    }
}

export async function putOperation(opId, column, attribute, value) {
    try {
        console.log({ opId, column, attribute, value });
        const res = await doSecurePut(`${ENV2B_BACKEND_URL}/api/v1/operations/${opId}`, { column: column, attribute: attribute, value: value });
        if (res.data.ok) {
            return res.data;
        } else throw { message: "Unexpected server error", res };
    } catch (error) {
        console.log(error.message);
        return null;
    }
}
