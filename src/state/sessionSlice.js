import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    accessToken: null,
};

export const sessionSlice = createSlice({
    name: "session",
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

export const { loggedIn, loggedOut } = sessionSlice.actions;

export default sessionSlice.reducer;
