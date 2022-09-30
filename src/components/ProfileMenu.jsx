import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { deepOrange } from "@mui/material/colors";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import LogoutIcon from "@mui/icons-material/Logout";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import useLogout from "../hooks/useLogout";

function ProfileMenu() {
    const firstname = useSelector((state) => state.session.user?.firstname);
    const lastname = useSelector((state) => state.session.user?.lastname);
    const [initial, setInitial] = useState("");
    const logout = useLogout();

    const [anchorEl, setAnchorEl] = React.useState(null);

    useEffect(() => {
        if (firstname) {
            setInitial(firstname.slice(0, 1)?.toUpperCase());
        }
    }, [firstname]);

    return (
        <>
            <Button
                variant="text"
                sx={{ color: (theme) => theme.palette.common.white, pr: 0 }}
                onClick={(e) => setAnchorEl(e.currentTarget)}
            >
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
                    <Stack
                        alignItems="center"
                        direction="row"
                        sx={{ display: { xs: "none", md: "flex" } }}
                    >
                        <Typography variant="button">
                            {firstname + " " + lastname}
                        </Typography>
                        <ArrowDropDownIcon />
                    </Stack>
                </Stack>
            </Button>
            <Menu
                anchorEl={anchorEl}
                open={!!anchorEl}
                onClose={() => {
                    setAnchorEl(null);
                }}
                onClick={() => {
                    setAnchorEl(null);
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
                <MenuItem
                    onClick={() => {
                        logout();
                    }}
                >
                    <ListItemIcon>
                        <LogoutIcon fontSize="small" />
                    </ListItemIcon>
                    Cerrar sesión
                </MenuItem>
            </Menu>
        </>
    );
}

export default ProfileMenu;
