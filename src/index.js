import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { HashRouter } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles/GlobalStyles";

ReactDOM.render(
	<HashRouter>
		<CssBaseline />
		<GlobalStyles
			styles={{
				body: { backgroundColor: "#bbaaff" },
			}}
		/>
		<App />
	</HashRouter>,
	document.getElementById("root")
);
