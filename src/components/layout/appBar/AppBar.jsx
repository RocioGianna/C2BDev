import React from "react";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import ProfileMenu from "./ProfileMenu";
import Logo from "./Logo";
import Tabs from "./Tabs";

function AppBar() {
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
