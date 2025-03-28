import React from "react";
import { Navigate } from "react-router-dom";
import userAuth from "./UserAuth";

const ProtectedRoute = ({ children }) => {
    return userAuth() ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
