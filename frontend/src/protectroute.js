import React from "react";
import { Navigate } from "react-router-dom";


const ProtectedRoute = ({ children }) => {
    const isAuthenticated = localStorage.getItem("user") !== null || sessionStorage.getItem("user") !== null;

    return isAuthenticated ? children : <Navigate to="/dangnhap" />;
};

export default ProtectedRoute;
