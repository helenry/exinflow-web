// routes/PrivateRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import useAuthStore from "../stores/authStore";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { paths } from "./allRoutes";

const PrivateRoute = ({ children }) => {
  const { currentUser, isLoading } = useAuthStore();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return currentUser ? children : <Navigate to={paths.sign_in} replace />;
};

export default PrivateRoute;
