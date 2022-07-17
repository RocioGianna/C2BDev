import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { logout } from "../services/AuthService";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Stack from "@mui/material/Stack";

function Home() {
	const userEmail = useSelector((state) => state.user.user?.email);
	const navigate = useNavigate();

	return (
		<Grid container alignItems="center" justifyContent="center">
			<Grid item>
				<Stack alignItems="center" spacing={2}>
					<Typography variant="h1">Home</Typography>

					<Button
						variant="contained"
						onClick={async () => {
							if (await logout(userEmail)) {
								navigate("/login");
							}
						}}
					>
						Logout
					</Button>
				</Stack>
			</Grid>
		</Grid>
	);
}

export default Home;
