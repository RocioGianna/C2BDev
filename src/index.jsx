import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { HashRouter } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import createTheme from "@mui/material/styles/createTheme";
import { Provider } from "react-redux";
import { store } from "./state/store";
import { SnackbarProvider } from "notistack";
import NotificationDispatcher from "./components/NotificationDispatcher";
import Fade from "@mui/material/Fade";
import "../src/styles/globalStyles.css";

const theme = createTheme({
    palette: {
        background: { default: "#e7ddec" },
        primary: { dark: "#551482", main: "#6b378d", light: "#9d79b4", extraLight: "#e7ddec" },
    },
    typography: {
        fontFamily: ["Poppins", "sans-serif"].join(","),
    },
});

ReactDOM.render(
    <HashRouter>
        <ThemeProvider theme={theme}>
            <SnackbarProvider maxSnack={1} autoHideDuration={2000} TransitionComponent={Fade}>
                <CssBaseline />
                <Provider store={store}>
                    <App />
                    <NotificationDispatcher />
                </Provider>
            </SnackbarProvider>
        </ThemeProvider>
    </HashRouter>,
    document.getElementById("root")
);
