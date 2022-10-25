import React, { useEffect } from "react";
import { useSnackbar } from "notistack";
import { useSelector } from "react-redux";

function NotificationDispatcher() {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const currNotification = useSelector((state) => state.notifications.notification);

    useEffect(() => {
        if (currNotification) {
            enqueueSnackbar(currNotification.message, {
                variant: currNotification.state,
                anchorOrigin: { horizontal: "center", vertical: "bottom" },
            });
        }
    }, [currNotification]);

    return <></>;
}

export default NotificationDispatcher;
