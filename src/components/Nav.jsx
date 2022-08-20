import React, { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useNavigate, useLocation } from "react-router-dom";

function Nav() {
    const navigate = useNavigate();
    const location = useLocation();
    const [value, setValue] = useState(location.pathname);

    return (
        <Tabs
            value={value}
            onChange={(_, newValue) => {
                setValue(newValue);
            }}
            sx={{
                py: 0.5,
                "& 	.MuiTabs-indicator": {
                    backgroundColor: (theme) => theme.palette.common.white,
                },
            }}
        >
            <Tab
                label="Home"
                value="/home"
                onClick={() => navigate("/home")}
                sx={{
                    color: (theme) => theme.palette.grey[300],
                    transition: "color 0.4s ease",
                    "&.Mui-selected": {
                        color: (theme) => theme.palette.common.white,
                    },
                    "&.MuiButtonBase-root": {
                        minHeight: 40,
                        height: 40,
                    },
                }}
            />
            <Tab
                label="Operaciones"
                value="/ops"
                onClick={() => navigate("/ops")}
                sx={{
                    color: (theme) => theme.palette.grey[300],
                    transition: "color 0.4s ease",
                    "&.Mui-selected": {
                        color: (theme) => theme.palette.common.white,
                    },
                    "&.MuiButtonBase-root": {
                        minHeight: 40,
                        height: 40,
                    },
                }}
            />
            <Tab
                label="Nueva Operacion"
                value="/ops/new"
                onClick={() => navigate("/ops/new")}
                sx={{
                    color: (theme) => theme.palette.grey[300],
                    transition: "color 0.4s ease",
                    "&.Mui-selected": {
                        color: (theme) => theme.palette.common.white,
                    },
                    "&.MuiButtonBase-root": {
                        minHeight: 40,
                        height: 40,
                    },
                }}
            />
        </Tabs>
    );
}

export default Nav;
