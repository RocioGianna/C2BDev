import React from "react";
import ReactDOM from "react-dom";
import Routes from "./components/Routes";
import { HashRouter } from "react-router-dom";

ReactDOM.render(
	<HashRouter>
		<Routes />
	</HashRouter>,
	document.getElementById("root")
);
