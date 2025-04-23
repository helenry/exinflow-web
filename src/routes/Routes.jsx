import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

import SignIn from "../pages/SignIn";
import Dashboard from "../pages/Dashboard";
import LoadingSpinner from "../components/LoadingSpinner";

export default function AppRoutes() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <Routes>
      <Route
        path="/"
        element={user ? <Navigate to="/dashboard" /> : <SignIn />}
      />
      <Route
        path="/dashboard"
        element={user ? <Dashboard /> : <Navigate to="/" />}
      />
      {/* <Route
        path="/transaction"
        element={user ? <Transaction /> : <Navigate to="/" />}
      />
      <Route
        path="/wallet"
        element={user ? <Wallet /> : <Navigate to="/" />}
      />
      <Route
        path="/saving"
        element={user ? <Saving /> : <Navigate to="/" />}
      />
      <Route
        path="/budget"
        element={user ? <Budget /> : <Navigate to="/" />}
      />
      <Route
        path="/analytic"
        element={user ? <Analytic /> : <Navigate to="/" />}
      /> */}
    </Routes>
  );
}