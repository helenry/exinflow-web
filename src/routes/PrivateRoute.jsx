// routes/PrivateRoute.jsx
import { Navigate } from "react-router-dom";
import useAuthStore from "../stores/auth/authStore";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { paths } from "./allRoutes";

const PrivateRoute = ({ children }) => {
  const { currentUser, isLoading } = useAuthStore();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return currentUser ? children : <Navigate to={paths.sign_in} replace />;
};

export default PrivateRoute;
