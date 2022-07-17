import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import AppBar from "./AppBar";

function Layout(props, children) {
	const location = useLocation();

	return (
		<Container maxWidth="xl" sx={{ minHeight: "100vh", display: "flex" }}>
			{location.pathname === "/login" ? (
				<Grid container alignItems="center" justifyContent="center">
					<Grid item>
						<Outlet />
					</Grid>
				</Grid>
			) : (
				<>
					<AppBar />
					<Outlet />
				</>
			)}
		</Container>
	);
}

export default Layout;
