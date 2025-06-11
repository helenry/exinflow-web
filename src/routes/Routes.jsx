// routes/Routes.jsx
import React, { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import { paths, routes } from "./allRoutes";
import useAuthStore from "../stores/authStore";

const RouteRenderer = ({ route }) => {
  const { component: Component, layout: Layout, title } = route;

  React.useEffect(() => {
    if (title) {
      document.title = `${title} | exinflow`;
    }
  }, [title]);

  if (!Component) {
    return Layout ? <Layout /> : <div />;
  }

  const content = <Component />;
  return Layout ? <Layout>{content}</Layout> : content;
};

const DefaultRedirect = () => {
  const { currentUser, isLoading } = useAuthStore();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <Navigate to={currentUser ? paths.dashboard : paths.sign_in} replace />
  );
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<DefaultRedirect />} />

      {routes.map((route, index) => {
        const { path, isProtected, isRestricted } = route;

        const routeElement = (
          <Suspense fallback={<LoadingSpinner />}>
            <RouteRenderer route={route} />
          </Suspense>
        );

        const routeKey = `${path}-${index}`;

        if (isProtected) {
          return (
            <Route
              key={routeKey}
              path={path}
              element={<PrivateRoute>{routeElement}</PrivateRoute>}
            />
          );
        }

        if (!isProtected && isRestricted) {
          return (
            <Route
              key={routeKey}
              path={path}
              element={
                <PublicRoute restricted={true}>{routeElement}</PublicRoute>
              }
            />
          );
        }

        return (
          <Route
            key={routeKey}
            path={path}
            element={
              <PublicRoute restricted={false}>{routeElement}</PublicRoute>
            }
          />
        );
      })}
    </Routes>
  );
};

export default AppRoutes;
