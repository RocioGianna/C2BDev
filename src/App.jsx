import React from "react";
import { Routes, Route, Navigate } from "react-router-dom"; 
import Login from "./pages/Login";
import Layout from "./components/Layout";
import Home from "./pages/Home";

function App() {
	return (
        <Routes>
            <Route exact path="/" element={<Navigate to="login" />} />
            <Route path="login" element={<Login />} />
            <Route 
                path="*" 
                element={ 
                    <Layout>
                        <Route path="home" element={<Home/>}/>
                        <Route path="ops" element={<Ops/>}/>
                    </Layout>
                } />
        </Routes>
	);
}

export default App;
