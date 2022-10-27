import React, { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useNavigate, useLocation } from "react-router-dom";

function Nav() {
    const navigate = useNavigate();
    const location = useLocation();
    const [value, setValue] = useState(location.pathname);

    useEffect(() => {
        const whiteList = ["/2b/home", "/2b/home", "/2b/ops", "/2b/ops/new"];
        if (whiteList.includes(location.pathname)) {
            setValue(location.pathname);
        }
    }, [location]);

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
                value="/2b/home"
                onClick={() => navigate("/2b/home")}
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
                value="/2b/ops"
                onClick={() => navigate("/2b/ops")}
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
                value="/2b/ops/new"
                onClick={() => navigate("/2b/ops/new")}
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
