import React, { useState } from "react";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Logo from "../assets/logo/LogoHWhite.png";
import Nav from "./Nav";
import ProfileMenu from "./ProfileMenu";
import AdbIcon from "@mui/icons-material/Adb";
import {
    IconButton,
    MenuItem,
    Box,
    Button,
    Menu,
    Typography,
    Tooltip,
    Avatar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";

const pages = ["Home", "Operaciones", "Nueva Operacion"];

const settings = ["Profile", "Account", "Dashboard", "Logout"];

function AppBar() {
    const navigate = useNavigate();

    const [anchorElNav, setAnchorElNav] = useState(null);

    const [anchorElUser, setAnchorElUser] = useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
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
        <MuiAppBar>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Box sx={{ flexGrow: { xs: 1, md: 0 } }}>
                        <img
                            style={{ height: 32 }}
                            src={Logo}
                            alt="2B Conexión"
                        />
                    </Box>
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: "none", md: "flex" },
                        }}
                    >
                        <Nav />
                    </Box>
                    <Box
                        sx={{
                            flexGrow: 0,
                            order: { xs: 1 },
                        }}
                    >
                        <ProfileMenu />
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={(e) => handleOpenNavMenu(e)}
                            color="inherit"
                            sx={{
                                display: { md: "none" },
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
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "left",
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={() => handleCloseNavMenu}
                            sx={{
                                display: { xs: "block", md: "none" },
                            }}
                        >
                            {tabs.map((e) => e)}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </MuiAppBar>
    );
}

export default AppBar;
