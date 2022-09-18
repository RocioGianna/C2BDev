import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import InternalLayout from "./components/InternalLayout";
import Home from "./pages/Home";
import Ops from "./pages/Ops";
import { refreshAccessToken } from "./services/AuthService";
import NewOperationModal from "./components/NewOperationModal";

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
                <Route path="ops" element={<Ops />}>
                    <Route path="new" element={<NewOperationModal />} />
                </Route>
            </Route>
            <Route path="*" element={<Navigate to="public/login" />} />
        </Routes>
    );
}

export default App;
