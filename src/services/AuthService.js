import axios from "axios";
import { store } from "../state/store";
import { loggedIn, loggedOut } from "../state/userSlice";

export async function login(email, password) {
	try {
		const res = await axios.post(
			`http://localhost:8080/login?username=${email}&password=${password}`
		);
		if (res.data.ok) {
			localStorage.setItem("refreshToken", res.data.tokens.refreshToken);
			store.dispatch(
				loggedIn({ user: res.data.user, accessToken: res.data.tokens.accessToken })
			);
			return true;
		}
	} catch (error) {
		console.log(error.message);
	}
	return false;
}

export async function refreshAccessToken(token) {
	try {
		const res = await axios.post(`http://localhost:8080/refreshToken?token=${token}`);
		if (res.data.ok) {
			store.dispatch(loggedIn({ user: res.data.user, accessToken: res.data.accessToken }));
		}
	} catch (error) {
		localStorage.removeItem("refreshToken");
		console.log(error.message);
	}
	return false;
}

export async function logout(email) {
	try {
		const res = await axios.post(`http://localhost:8080/auth/logout?email=${email}`);
		if (res.data.ok) {
			store.dispatch(loggedOut());
			localStorage.removeItem("refreshToken");
			return true;
		}
	} catch (error) {
		console.log(error.message);
	}
	return false;
}
