import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Ops from "./pages/Ops";
import { refreshAccessToken } from "./services/AuthService";

function App() {
	useEffect(() => {
		const refreshToken = localStorage.getItem("refreshToken");
		if (refreshToken) {
			refreshAccessToken(refreshToken);
		}
	}, []);

	return (
		<Routes>
			<Route path="/" element={<Layout />}>
				<Route index element={<Navigate to="login" />} />
				<Route path="login" element={<Login />} />
				<Route path="home" element={<Home />} />
				<Route path="ops" element={<Ops />}>
					<Route path="new" element={<h1>New</h1>} />
				</Route>
			</Route>
		</Routes>
	);
}

export default App;
