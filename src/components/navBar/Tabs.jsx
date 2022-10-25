import React, { useState } from "react";
import Nav from "../Nav";
import { IconButton, Box, Menu, MenuItem, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";

export default function Tabs() {
    const [anchorElNav, setAnchorElNav] = useState(null);
    const navigate = useNavigate();

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const tabs = [
        <MenuItem
            key={0}
            onClick={() => {
                navigate("/2b/home");
                handleCloseNavMenu();
            }}
        >
            <Typography textAlign="center">Home</Typography>
        </MenuItem>,
        <MenuItem
            key={1}
            onClick={() => {
                navigate("/2b/ops");
                handleCloseNavMenu();
            }}
        >
            <Typography textAlign="center">Operaciones</Typography>
        </MenuItem>,
        <MenuItem
            key={2}
            onClick={() => {
                navigate("/2b/ops/new");
                handleCloseNavMenu();
            }}
        >
            <Typography textAlign="center">Nueva Operacion</Typography>
        </MenuItem>,
    ];

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                flexGrow: { xs: 0, md: 1 },
            }}
        >
            <Box
                sx={{
                    display: { xs: "none", md: "flex" },
                }}
            >
                <Nav />
            </Box>
            <Box
                sx={{
                    flexGrow: 0,
                }}
            >
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={(e) => handleOpenNavMenu(e)}
                    color="inherit"
                    sx={{
                        display: { md: "none" },
                        p: 0,
                    }}
                >
                    <MenuIcon />
                </IconButton>
                <Menu
                    id="menu-appbar"
                    anchorEl={anchorElNav}
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left",
                    }}
                    transformOrigin={{
                        vertical: "top",
                        horizontal: "left",
                    }}
                    open={Boolean(anchorElNav)}
                    onClose={() => handleCloseNavMenu()}
                    sx={{
                        display: { xs: "block", md: "none" },
                    }}
                >
                    {tabs.map((e) => e)}
                </Menu>
            </Box>
        </Box>
    );
}
