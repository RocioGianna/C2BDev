import React from "react";
import Avatar from "@mui/material/Avatar";
import { useSelector } from "react-redux";

function ProfileMenu() {
	const userName = useSelector((state) => state.user.user.name);
	const userLastname = useSelector((state) => state.user.user.lastname);

	const initials = userName.slice(0, 1).toUppercase() + userLastname.slice(0, 1).toUppercase();

	return (
		<div>
			<Avatar>{initials}</Avatar>
		</div>
	);
}

export default ProfileMenu;
