import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { deepOrange } from "@mui/material/colors";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

function ProfileMenu() {
	const firstname = useSelector((state) => state.user.user?.firstname);
	const lastname = useSelector((state) => state.user.user?.lastname);
	const [initial, setInitial] = useState("");

	useEffect(() => {
		if (firstname) {
			setInitial(firstname.slice(0, 1)?.toUpperCase());
		}
	}, [firstname]);

	return (
		<Button variant="text" sx={{ color: (theme) => theme.palette.common.white }}>
			<Stack alignItems="center" spacing={1} direction="row">
				<Avatar
					sx={{
						width: 32,
						height: 32,
						bgcolor: deepOrange[400],
						color: (theme) => theme.palette.common.white,
					}}
				>
					{initial}
				</Avatar>
				<Stack alignItems="center" direction="row">
					<Typography variant="button">{firstname + " " + lastname}</Typography>
					<ArrowDropDownIcon />
				</Stack>
			</Stack>
		</Button>
	);
}

export default ProfileMenu;
