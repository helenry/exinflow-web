// routes/PublicRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import useAuthStore from "../stores/authStore";
import LoadingSpinner from "../components/common/LoadingSpinner";
import { paths } from "./allRoutes";

const PublicRoute = ({ restricted = false, children }) => {
  const { currentUser, isLoading } = useAuthStore();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  // If restricted is true and user is logged in, redirect to dashboard
  return restricted && currentUser ? (
    <Navigate to={paths.dashboard} replace />
  ) : (
    children
  );
};

export default PublicRoute;
