import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Ops from "./pages/Ops";
import { refreshAccessToken } from "./services/AuthService";
import RestrictedRoute from "./components/RestrictedRoute";
import NewOperationModal from "./components/NewOperationModal";

function App() {
    useEffect(() => {
        const refreshToken = localStorage.getItem("refreshToken");
        if (refreshToken) {
            refreshAccessToken(refreshToken);
        }
    }, []);

    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Navigate to="login" />} />
                <Route path="login" element={<Login />} />
                <Route
                    path="home"
                    element={
                        <RestrictedRoute>
                            <Home />
                        </RestrictedRoute>
                    }
                />
                <Route
                    path="ops"
                    element={
                        <RestrictedRoute>
                            <Ops />
                        </RestrictedRoute>
                    }
                >
                    <Route path="new" element={<NewOperationModal />} />
                </Route>
            </Route>
        </Routes>
    );
}

export default App;
