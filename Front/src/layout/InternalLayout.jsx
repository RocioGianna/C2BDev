import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import AppBar from "./AppBar";
import { useSelector } from "react-redux";
import { fetchAdditionals, fetchProducts } from "../services/ProductService";
import { Toolbar, Box } from "@mui/material";
import { fetchOperationEditPermissions, fetchStatusMap } from "../services/OperationService";

function InternalLayout() {
    const loaded = useSelector((state) => state.session.loaded);
    const navigate = useNavigate();

    useEffect(() => {
        if (!loaded) navigate("/public/login");
    }, [loaded]);

    useEffect(() => {
        if (loaded) {
            fetchProducts();
            fetchAdditionals();
            fetchOperationEditPermissions();
            fetchStatusMap();
        }
    }, []);

    return (
        <Container maxWidth="xl" sx={{ minHeight: "100vh" }}>
            {loaded && (
                <Box sx={{ minHeight: "100vh" }}>
                    <AppBar />
                    <Toolbar variant="dense" />
                    <Box sx={{ py: 2 }}>
                        <Outlet />
                    </Box>
                </Box>
            )}
        </Container>
    );
}

export default InternalLayout;
