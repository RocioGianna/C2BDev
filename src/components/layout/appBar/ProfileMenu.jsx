import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { deepOrange } from "@mui/material/colors";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import LogoutIcon from "@mui/icons-material/Logout";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import useLogout from "../../../hooks/useLogout";

function ProfileMenu() {
    const firstName = useSelector((state) => state.session.user?.firstName);
    const lastName = useSelector((state) => state.session.user?.lastName);
    const [initial, setInitial] = useState("");
    const logout = useLogout();

    const [anchorEl, setAnchorEl] = React.useState(null);

    useEffect(() => {
        if (firstName) {
            setInitial(firstName.slice(0, 1)?.toUpperCase());
        }
    }, [firstName]);

    return (
        <Box order={{ xs: -1, md: 2 }}>
            <Button variant="text" sx={{ color: (theme) => theme.palette.common.white, pr: 0 }} onClick={(e) => setAnchorEl(e.currentTarget)}>
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
                    <Stack alignItems="center" direction="row" sx={{ display: { xs: "none", md: "flex" } }}>
                        <Typography variant="button">{firstName + " " + lastName}</Typography>
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
        </Box>
    );
}

export default ProfileMenu;
