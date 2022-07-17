import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	user: null,
	accessToken: null,
};

export const counterSlice = createSlice({
	name: "counter",
	initialState,
	reducers: {
		loggedIn: (prev, action) => {
			prev.user = action.payload.user;
			prev.accessToken = action.payload.accessToken;
		},
		loggedOut: (prev) => {
			prev.user = null;
			prev.accessToken = null;
		},
	},
});

export const { loggedIn, loggedOut } = counterSlice.actions;

export default counterSlice.reducer;
