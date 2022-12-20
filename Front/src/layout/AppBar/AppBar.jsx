import React from "react";
import MuiAppBar from "@mui/material/AppBar";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import ProfileMenu from "./ProfileMenu";
import Logo from "./Logo";
import Tabs from "./Tabs";

function AppBar() {
    return (
        <MuiAppBar variant="dense" >
            <Container maxWidth="xl">
                <Toolbar variant="dense" disableGutters>
                    <Stack direction="row" spacing={2} alignItems="center" width="100%">
                        <Logo />
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "row",
                                flexGrow: { xs: 0, md: 1 },
                            }}>
                            <Tabs />
                            <ProfileMenu />
                        </Box>
                    </Stack>
                </Toolbar>
            </Container>
        </MuiAppBar>
    );
}

export default AppBar;
