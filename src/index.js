import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { MemoryRouter } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import createTheme from "@mui/material/styles/createTheme";
import { Provider } from "react-redux";
import { store } from "./state/store";

const theme = createTheme({
	palette: {
		background: { default: "#e7ddec" },
		primary: { dark: "#551482", main: "#6b378d", light: "#9d79b4" },
	},
	typography: {
		fontFamily: ["Poppins", "sans-serif"].join(","),
	},
});

ReactDOM.render(
	<MemoryRouter>
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Provider store={store}>
				<App />
			</Provider>
		</ThemeProvider>
	</MemoryRouter>,
	document.getElementById("root")
);
