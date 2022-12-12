import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    accessToken: null,
    loaded: false,
};

export const sessionSlice = createSlice({
    name: "session",
    initialState,
    reducers: {
        loggedIn: (prev, action) => {
            prev.user = action.payload.user;
            prev.accessToken = action.payload.accessToken;
            prev.loaded = true;
            return prev;
        },
        loggedOut: (prev) => {
            prev.user = null;
            prev.accessToken = null;
            prev.loaded = false;
            return prev;
        },
    },
});

export const { loggedIn, loggedOut } = sessionSlice.actions;

export default sessionSlice.reducer;
