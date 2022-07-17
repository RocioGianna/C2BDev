import React from "react";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Logo from "../assets/logo/LogoHWhite.png";
import Nav from "./Nav";

function AppBar() {
	return (
		<MuiAppBar>
			<Toolbar disableGutters variant="dense">
				<Container
					maxWidth="xl"
					sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
				>
					<div
						style={{
							display: "flex",
							alignItems: "center",
							justifyContent: "flex-start",
							gap: 8,
						}}
					>
						<img style={{ height: 32 }} src={Logo} alt="2B Conexión" />
						<Nav />
					</div>
					<div className="right"></div>
				</Container>
			</Toolbar>
		</MuiAppBar>
	);
}

export default AppBar;
