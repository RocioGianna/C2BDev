import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import InternalLayout from "./components/InternalLayout";
import Home from "./pages/Home";
import { refreshAccessToken } from "./services/AuthService";
import Operation from "./components/Operation";
import NewOperationModal from "./components/NewOperationModal";
import Operations from "./pages/Operations.jsx";

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
            <Route path="2b" element={<InternalLayout />}>
                <Route path="home" element={<Home />} />
                <Route path="ops" element={<Operations />}>
                    <Route path="new" element={<NewOperationModal />} />
                </Route>
                <Route path="ops/:opId" element={<Operation />} />
            </Route>
            <Route path="*" element={<Navigate to="public/login" />} />
        </Routes>
    );
}

export default App;
