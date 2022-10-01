import React from "react";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Logo from "../assets/logo/LogoHWhite.png";
import Nav from "./Nav";
import ProfileMenu from "./ProfileMenu";

function AppBar() {
    return (
        <MuiAppBar>
            <Toolbar disableGutters variant="dense">
                <Container
                    maxWidth="xl"
                    sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
                >
                    <Stack alignItems="center" spacing={2} direction="row">
                        <img style={{ height: 32 }} src={Logo} alt="2B Conexión" />
                        <Nav />
                    </Stack>
                    <Stack alignItems="center" spacing={2} direction="row">
                        <ProfileMenu />
                    </Stack>
                </Container>
            </Toolbar>
        </MuiAppBar>
    );
}

export default AppBar;
