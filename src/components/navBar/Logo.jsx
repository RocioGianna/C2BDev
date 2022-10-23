import React from "react";
import LogoH from "../../assets/logo/LogoHWhite.png";
import SmallLogo from "../../assets/logo/Logo.png";
import { Box } from "@mui/material";

export default function Logo() {
    return (
        <Box sx={{ flexGrow: { xs: 1, md: 0 } }}>
            <Box
                sx={{
                    display: { sm: "flex", xs: "none" },
                    alignItems: "center",
                }}
            >
                <img style={{ height: 32 }} src={LogoH} alt="2B Conexión" />
            </Box>
            <Box
                sx={{
                    display: { sm: "none", xs: "flex" },
                    alignItems: "center",
                }}
            >
                <img src={SmallLogo} style={{ height: 32 }} />
            </Box>
        </Box>
    );
}
