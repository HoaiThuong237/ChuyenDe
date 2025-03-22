// import { Navigate } from "react-router-dom";

// const ProtectedRoute = ({ children }) => {
//     const isLoggedIn = localStorage.getItem("token");
//     return isLoggedIn ? children : <Navigate to="/login" />;
// };

// export default ProtectedRoute;
    
import React from "react";
import { Navigate } from "react-router-dom";

// const ProtectedRoute = ({ children }) => {
//     const isLoggedIn = localStorage.getItem("rememberLogin") === "true";

//     return isLoggedIn ? children : <Navigate to="/login" />;
// };


const ProtectedRoute = ({ children }) => {
    const isAuthenticated = localStorage.getItem("user") !== null || localStorage.getItem("rememberLogin") === "true";

    return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
