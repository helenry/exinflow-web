// App.jsx
import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/Routes";
import { Toaster } from "react-hot-toast";
import useAuthStore from "./stores/authStore";

function App() {
  const initializeAuth = useAuthStore((state) => state.initializeAuth);

  useEffect(() => {
    // Initialize the auth listener when app starts
    const unsubscribe = initializeAuth();

    // Cleanup on unmount
    return () => unsubscribe?.();
  }, [initializeAuth]);

  return (
    <>
      <Router>
        <AppRoutes />
      </Router>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}

export default App;
