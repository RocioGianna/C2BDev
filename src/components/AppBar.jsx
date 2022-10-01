import React from "react";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import { Box } from "@mui/material";
import Logo from "./navBar/Logo";
import ProfileMenu from "./ProfileMenu";
import { useNavigate } from "react-router-dom";
import Tabs from "./navBar/Tabs";

function AppBar() {
    const navigate = useNavigate();

    return (
        <MuiAppBar>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Logo />
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            flexGrow: { xs: 0, md: 1 },
                        }}
                    >
                        <Tabs />
                        <ProfileMenu />
                    </Box>
                </Toolbar>
            </Container>
        </MuiAppBar>
    );
}

export default AppBar;
