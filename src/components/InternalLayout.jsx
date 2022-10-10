import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import AppBar from "./AppBar";
import { useSelector } from "react-redux";
import { fetchAdditionals, fetchProducts } from "../services/ProductService";

function InternalLayout() {
    const user = useSelector((state) => state.session.user);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) navigate("/public/login");
    }, [user]);

    useEffect(() => {
        if (user) {
            fetchProducts();
            fetchAdditionals();
        }
    }, []);

    return (
        <Container maxWidth="xl" sx={{ minHeight: "100vh", display: "flex" }}>
            <AppBar />
            <Outlet />
        </Container>
    );
}

export default InternalLayout;
