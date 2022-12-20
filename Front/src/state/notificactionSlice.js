import { createSlice } from "@reduxjs/toolkit";

const initialState = { notification: undefined };

const notificationsSlice = createSlice({
    name: "notifications",
    initialState,
    reducers: {
        notificationDispatched: (prev, action) => {
            prev.notification = action.payload.notification;
            return prev;
        },
    },
});

export const { notificationDispatched } = notificationsSlice.actions;

export default notificationsSlice.reducer;
