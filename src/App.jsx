import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import InternalLayout from "./layout/InternalLayout";
import { refreshAccessToken } from "./services/AuthService";
import Home from "./pages/Home";
import Operations from "./pages/Operations";
import OperationNew from "./pages/Operations/OperationNew";
import OperationDetails from "./pages/OperationDetails";

function App() {
    useEffect(() => {
        refreshAccessToken();
    }, []);

    return (
        <Routes>
            <Route index element={<Navigate to="public/login" />} />
            <Route path="public">
                <Route path="login" element={<Login />} />
            </Route>
            <Route path="*" element={<InternalLayout />}>
                <Route path="home" element={<Home />} />
                <Route path="ops" element={<Operations />}>
                    <Route path="new" element={<OperationNew />} />
                </Route>
                <Route path="ops/:opId" element={<OperationDetails />} />
                <Route path="*" element={<Navigate to="public/login" />} />
            </Route>
        </Routes>
    );
}

export default App;
